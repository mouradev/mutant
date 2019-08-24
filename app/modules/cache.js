'use strict';

const elasticsearch = require('elasticsearch');

// ES client
const client = new elasticsearch.Client({
    hosts: [ `http://elastic:changeme@elasticsearch:9200`]
});

// Indexes

if(client.indices.exists({index: 'users'})) {
    console.log('existe index users');
}else {
    console.log('não existe index users');
}

const getAll = (params) => {
    return client.search({
        index: 'users',
        body: {
            query: {
                match_all: {}
            },
        }
    })
}

/**
 * 
 * @param {*} body 
 */
const insert = function(id, body) {
    client.index({
        index: 'users',
        id: id,
        type: 'test',
        body: body
    }, function(err, resp, status) {
        console.log(resp);
    });
}

const search = function(match) {
    const response = client.search({
        index: 'users',
        body: {
            query: {
                match: match
            },
        }
    });

    return response;
}

const test_connection = function() {
    client.ping({
        requestTimeout: 30000,
        }, function(error) {
            if (error) {
                console.error('elasticsearch cluster is down!');
            } else {
                console.log('Everything is ok');
            }
        });
}

module.exports = { test_connection, insert, search, getAll }