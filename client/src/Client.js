/* eslint-disable no-undef */
const request = require('superagent-bluebird-promise');

const url = 'http://localhost:3000';

function search(query, cb) {
    return request
        .get(`${url}/api/foo`)
        .query(`q=${query}`)
        .then(checkStatus)
        .then(function (res) {
            console.log(res);
            return cb(res.body)
        }, function (error) {
            console.log(error);
        });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
}

const Client = {search};
export default Client;
