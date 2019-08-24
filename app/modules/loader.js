const request = require('request');
const rp = require('request-promise');

// Constants
const URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Retorna o body do json
 * 
 * @return string
 */
const getAllUsers = () => {
    return rp({
        uri: URL,
        json: true
    });
}

module.exports = { getAllUsers };