const request = require('supertest');
const { Operator } = require('../../../models/operator');

describe('auth middleware', () => {
  let server;

  beforeEach(() => {
    server = require('../../../app');
  });

  afterEach(async () => {
    await Operator.deleteMany({});
    server.close();
  });

  it('should return 401 if no authorization header is provided', async () => {
    const response = await request(server)
      .post('/api/operator')
      .send({ name: 'operatorName' });

    expect(response.status).toBe(401);
  });

  it('should return 401 if no token is provided', async () => {
    const token = '';
    const response = await request(server)
      .post('/api/operator')
      .set('Authorization', `Bearer: ${token}`)
      .send({ name: 'operatorName' });

    expect(response.status).toBe(401);
  });
});
