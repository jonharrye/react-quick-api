/* eslint-disable no-undef */
const request = require('superagent-bluebird-promise');
import url from './config';

export function get(query) {
  const generatedUrl = `${url}/jso?n=${query}`;
  return request
    .get(`${url}/jso`)
    .query(`n=${query}`)
    .then(checkStatus)
    .then(function (res) {
      return {
        body: res.body, generatedUrl: generatedUrl
      }
    })
    .catch(err => {
      return new Error(err);
    })
}

export function post(object) {
  return request
    .post(`${url}/api/objects`)
    .send({object: object})
    .then(checkStatus)
    .then(function (res) {
      console.log('res POST.then' , res);
      if (res.body.error){
        return res.body.error
      }
      return res.body
    })
    .catch(err => {
      console.log('err POST.catch ' , err);
      throw new Error(err);
    });
}

function checkStatus(response) {
  console.log('response checkstatus()' , response);
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
