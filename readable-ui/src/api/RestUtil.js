/* eslint indent: 0 */

// normally this would be configured!
const baseRestUrl = 'http://localhost:3001';

/**
 * Gets the authorization token.
 */
function getToken() {
    let token = localStorage.getItem('readable.token');
    if (!token) {
        token = Math.random().toString(36).substr(-10);
        localStorage.setItem('readable.token', token);
    }
    return token;
}

/**
 * Reports an error to the user and logs to the console.
 */
function reportError(detail) {
    const text = 'Error contacting the Readable service.';
    console.error(`${text}\n${detail}`);
    alert(`${text}`);
};

function handleResponseJson(response) {
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);  // '404: Not Found'
    }
    return response.json();
};

/**
 * Sends an HTTP GET request.
 *
 * @return {Promise} Provides the response JSON as an object.
 */
export function doGet(path) {
    const url = baseRestUrl + path;
    console.info('GET: ' + url);
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': getToken()
        }
    })
    .then(handleResponseJson)
    .catch(error => {
        reportError(`GET ${url}: ${error.message}`);
    });
}

/**
 * Sends an HTTP POST request.
 *
 * @return {Promise} Provides the response JSON as an object.
 */
export function doPost(path, body) {
    const url = baseRestUrl + path;
    console.info('POST: ' + url);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(handleResponseJson)
    .catch(error => {
        reportError(`POST ${url}: ${error.message}`);
    });
}

/**
 * Sends an HTTP PUT request.
 *
 * @return {Promise} Provides the response JSON as an object.
 */
export function doPut(path, body) {
    const url = baseRestUrl + path;
    console.info('PUT: ' + url);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(handleResponseJson)
    .catch(error => {
        reportError(`PUT ${url}: ${error.message}`);
    });
}

/**
 * Sends an HTTP DELETE request.
 *
 * @return {Promise} Provides the response JSON as an object.
 */
export function doDelete(path) {
    const url = baseRestUrl + path;
    console.info('DELETE: ' + url);
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': getToken()
        }
    })
    .then(handleResponseJson)
    .catch(error => {
        reportError(`DELETE ${url}: ${error.message}`);
    });
}

