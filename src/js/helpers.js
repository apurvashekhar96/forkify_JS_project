import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} Error Code: ${res.status}`);
    return data;
  } catch (err) {
    // rethrow this error to the importing async function
    // this will give a unfulfilled promise.
    throw err;
  }
};

/*
export const getJSON = async function (url) {
 const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} Error Code: ${res.status}`);
    return data;
  } catch (err) {
    // rethrow this error to the importing async function
    // this will give a unfulfilled promise.
    throw err;
  }

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} Error Code: ${res.status}`);
    return data;
  } catch (err) {
    // rethrow this error to the importing async function
    // this will give a unfulfilled promise.
    throw err;
  }
};
*/
