const request = require('supertest');
const { User } = require('../../models/user');

let server;

describe('/api/auth', () => {
  beforeEach(() => {
    server = require('../../app');
  });

  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });

  describe('POST /login', () => {
    it('should return a 400 error if given invalid login data', async () => {
      const response = await request(server)
        .post('/auth/login')
        .send({
          email: 'a',
          password: 'a',
        });
      expect(response.status).toBe(400);
    });

    it('should return a 400 error if no user is found with given login info', async () => {
      const response = await request(server)
        .post('/auth/login')
        .send({
          email: 'test@test.com',
          password: '12345',
        });

      expect(response.status).toBe(400);
    });

    it('should return a 400 error if no password does not match given email', async () => {
      const user = {
        name: 'a',
        email: 'a@a.com',
        password: 'password',
      };
      await new User(user).save();
      const response = await request(server)
        .post('/auth/login')
        .send({
          email: 'a@a.com',
          password: '12345',
        });

      expect(response.status).toBe(400);
    });

    it('should return a user and token if a new user is created successfully', async () => {
      const user = {
        name: 'a',
        email: 'a@a.com',
        password: 'password',
      };
      await request(server)
        .post('/api/user/')
        .send(user);
      const response = await request(server)
        .post('/auth/login')
        .send({ email: user.email, password: user.password });
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user.name');
      expect(response.body).toHaveProperty('user.email');
      expect(response.body).toHaveProperty('user._id');
      expect(response.body).toHaveProperty('user.isAdmin');
      expect(response.body).toHaveProperty('user.operators');
      expect(response.body).toHaveProperty('user.lessonScores');
    });
  });
});
