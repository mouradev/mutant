const test = require('tape')
const supertest = require('supertest')
const app = require('../app')

test('GET /users', (t) => {
    supertest(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) =>{
        t.error(err, 'No errors')
        t.end()
    })
})