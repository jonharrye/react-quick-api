/* eslint-disable no-undef */
const request = require('superagent-bluebird-promise');

const url = process.env.NODE_ENV === 'production' ? 'https://lookup-server-ofdaisistk.now.sh' : 'http://localhost:3000';

export function get(query) {
  console.log('process.env.NODE_ENV ', process.env.NODE_ENV);
  return request
    .get(`${url}/api/objects`)
    .query(`object_id=${query}`)
    .then(checkStatus)
    .then(function (res) {
      console.info('res get', res);
      return res.body
    })
    .catch(err => {
      console.warn('err  catch GET', err);
      return new Error(err);
    })
}

export function post(object) {
  return request
    .post(`${url}/api/objects`)
    .send({object: object})
    .then(checkStatus)
    .then(function (res) {
      console.info('res post', res);
      return res.body
    })
    .catch(err => {
      console.warn('err  catch POST', err);
      return new Error(err);
    });
}

function checkStatus(response) {
  console.log('response  responseresponseresponseresponse', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.error('checkStatus error', error); // eslint-disable-line no-console
    throw error;
  }
}
