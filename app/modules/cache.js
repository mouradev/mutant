'use strict';

const elasticsearch = require('elasticsearch');

// ES client
const client = new elasticsearch.Client({
    hosts: [ `http://elastic:changeme@elasticsearch:9200`]
});

client.indices.exists({index: 'users'})
    .then((response) => {
        if(response) {
            console.log('existe index users');
            client.indices.putMapping({
                index: "users",
                body: {
                    properties: {
                        name: {
                            type: "text",
                            fielddata: true
                        }
                    }
                }
            });
        } else {
            console.log('não existe index users');
            client.indices.create({
                index: 'users',
            }, (err, resp, status) => {
                console.log(resp);
            })

            
        }
    });

const getAll = (params) => {
    return client.search({
        index: 'users',
        body: {
            query: {
                match_all: {}
            },
            sort: [
                {
                    name: {
                        "order": "asc"
                    }
                }
            ],
        }
    })
}

/**
 * 
 * @param {*} body 
 */
const insert = (id, body) => {
    client.index({
        index: 'users',
        id: id,
        type: 'text',
        body: body
    }, (err, resp, status) => {
        console.log(resp);
        client.indices.putMapping({
            index: "users",
            body: {
                properties: {
                    name: {
                        type: "text",
                        fielddata: true
                    }
                }
            }
        });
    });
}

const search = (match) => {
    const response = client.search({
        index: 'users',
        body: {
            query: {
                match: match
            },
            sort: [
                {
                    name: {
                        "order": "asc"
                    }
                }
            ],
        }
    });

    return response;
}

const test_connection = () => {
    client.ping({
        requestTimeout: 30000,
    }, (error) => {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('Everything is ok');
        }
    });
}

module.exports = { test_connection, insert, search, getAll }