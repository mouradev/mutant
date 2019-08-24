'use strict';

const express = require('express');
const cache = require('./modules/cache');
const loader = require('./modules/loader');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

// Insert all users on cache
let all_users = [];
loader.getAllUsers()
    .then((body) => {
        body.forEach(user => {
            cache.insert(user.id, user);
        });
    })


app.get('/users', (req, res) => {
    const users = [];
    cache.getAll().then((response) => {
        // res.send(response);
        response.hits.hits.forEach((user) => {
            users.join({
                "name": user._source.name,
                "email": user._source.email,
                "company": user._source.company.name
            })
        });
        res.send(users);
    })
});

app.get('/users/suite', (req, res) => {
    cache.search({
        "address.suite": "suite"
    }).then((response) => {
        res.send(response.hits);
    })
});





// cache.test_connection();

// const match = {
//     "PostName": 'Node.js'
// }
// cache.search(match);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);