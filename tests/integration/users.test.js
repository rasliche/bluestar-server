const request = require('supertest')
const { User } = require('../../models/user')
let server

describe('/api/users', () => {
    beforeEach(() => {
        server = require('../../app')
    })
    afterEach(async () => {
        server.close()
        await User.deleteMany({})
    })

    describe('GET /', () => {
        it('should return all users', async () => {
            await User.collection.insertMany([
                { name: 'user1', email: 'email1@domain.com', password: 'unhashedpassword1'},
                { name: 'user2', email: 'email2@domain.com', password: 'unhashedpassword2'},
                { name: 'user3', email: 'email3@domain.com', password: 'unhashedpassword3'},
            ])
            const response = await request(server).get('/api/users')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(3)
            expect(response.body.some(u => u.name === 'user1')).toBeTruthy()
        })
    })

    describe('GET /me', () => {
        it('should return the logged in user', async () => {
            const newUser = await new User({
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            }).save()
            const token = newUser.generateAuthToken()
            const response = await request(server)
                .get('/api/users/me')
                .set('Authorization', `Bearer: ${token}`)
            expect(response.body).toHaveProperty('token')
            expect(response.body).toHaveProperty('user.name')
            expect(response.body).toHaveProperty('user.email')
            expect(response.body).toHaveProperty('user._id')
            expect(response.body).toHaveProperty('user.isAdmin')
            expect(response.body).toHaveProperty('user.operators')
            expect(response.body).toHaveProperty('user.lessonScores')
        })
    })
})