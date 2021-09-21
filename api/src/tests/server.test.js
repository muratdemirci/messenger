const app = require('../../server')
const Message = require('../api/v1/models/Message')
const mongoose = require('mongoose')
const supertest = require('supertest')
const apiUrl = process.env.API_URL || '/api/v1'

// i didn't manage to finish tests for now, sorry about that :'(
// TODO: finish the tests
beforeEach((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done())
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

let token

beforeAll((done) => {
  request(app)
    .post(`${apiUrl}/register`)
    .send({
      username: 'deusmur',
      email: 'deusmur@email.com',
      password: 'M12345678!',
      passwordConfirmation: 'M12345678!'
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      console.log(token)
      done()
    })
})

describe('GET /', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return request(app)
      .get(`${apiUrl}/messages`)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      });
  });
  // send the token - should respond with a 200
  test('It responds with JSON', () => {
    return request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
  })
})

// test(`GET ${apiUrl}/messages`, async () => {
//   const message = await Message.create({ 
//     sendMsgTo: "ElonMusk", 
//     text: "Top secret video https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
//   })

//   await supertest(app).get(`${apiUrl}/messages`)
//     .expect(200)
//     .then((response) => {
//       // Check type and length
//       expect(Array.isArray(response.body)).toBeTruthy()
//       expect(response.body.length).toEqual(1)

//       // Check data
//       expect(response.body[0]._id).toBe(post.id)
//       expect(response.body[0].title).toBe(post.title)
//       expect(response.body[0].content).toBe(post.content)
//       done()
//     })
// })