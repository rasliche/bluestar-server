// const request = require('supertest')
const { User } = require('../../../models/user');
const attachUser = require('../../../middleware/attachUser');

describe('attachUser middleware', () => {
  const mockRequest = (userId) => ({
    token: { _id: userId },
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn();
    return res;
  };

  const next = jest.fn();
  let user;

  beforeEach(async () => {
    user = await new User({
      name: 'test',
      email: 'test@test.com',
      password: 'testpass',
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it.todo('should return 404 if no user is found with given ID',
    // async () => {
    //     const req = mockRequest(undefined)
    //     const res = mockResponse()
    //     const response = await attachUser(req, res, next)

    //     expect(response).toBe({})
    //     expect(response).toHaveBeenCalledWith(404)
    //     expect(next.mock.calls).toBe(1)
    // }
  );

  it.todo('should attach a user object to the request',
    // () => {
    //     const req = mockRequest(user._id)
    //     const res = mockResponse()
    //     attachUser(req, res, next)
    //     // const token = ''
    //     // const response = await request(server)
    //     //     .post('/api/operators')
    //     //     .set('Authorization', `Bearer: ${token}`)
    //     //     .send({ name: 'operatorName' })

    //     expect(response.status).toBe(401)
    // }
  );
});
