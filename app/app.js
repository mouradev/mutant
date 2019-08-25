'use strict';

const express = require('express');
const cache = require('./modules/cache');
const loader = require('./modules/loader');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

// Insert all users on cache
let all_users = [];
loader.getAllUsers()
    .then((body) => {
        body.forEach(user => {
            cache.insert(user.id, user);
        });
    })

app.get('/', (req, res) => {
    res.redirect('/users');
});

app.get('/users', (req, res) => {
    let all_users = [];
    cache.getAll().then((response) => {
        response.hits.hits.forEach((user) => {
            let formatted_user = {
                "id": user._source.id,
                "name": user._source.name,
                "email": user._source.email,
                "company": user._source.company.name
            }
            all_users.push(formatted_user);
        });
        res.json(all_users);
    })
});

app.get('/users/suite', (req, res) => {
    let all_users = [];
    cache.search({
        "address.suite": "suite"
    }).then((response) => {
        response.hits.hits.forEach((user) => {
            let formatted_user = {
                "id": user._source.id,
                "name": user._source.name,
                "email": user._source.email,
                "company": user._source.company.name,
                "address": user._source.address,
            }
            all_users.push(formatted_user);
        });
        res.json(all_users);
    })
});

app.get('/users/websites', (req, res) => {
    let all_users = [];
    cache.getAll().then((response) => {
        response.hits.hits.forEach((user) => {
            let formatted_user = {
                "id": user._source.id,
                "name": user._source.name,
                "website": user._source.website,
            }
            all_users.push(formatted_user);
        });
        res.json(all_users);
    })
});

if (require.main === module){
    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
}

module.exports = app;