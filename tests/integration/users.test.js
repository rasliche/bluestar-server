const request = require('supertest')
const mongoose = require('mongoose')
const { User, validateUser } = require('../../models/user')
let server

describe('/api/users', () => {
    beforeEach(() => {
        server = require('../../app')
    })
    afterEach(async () => {
        await User.deleteMany({})
        server.close()
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
            const user = await new User({
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            }).save()
            const token = user.generateAuthToken()
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
            expect(response.body).not.toHaveProperty('user.password')
        })

        it('should return 404 if a user is not found for the token ID', async () => {
            const user = await new User({
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            })
            const token = user.generateAuthToken()
            const response = await request(server)
                .get('/api/users/me')
                .set('Authorization', `Bearer: ${token}`)
            expect(response.status).toBe(404)
            expect(response.text).toBe("No user found with current jwt.")
        })
    })

    describe('GET /:id', () => {
        it('should return the user with given id', async () => {
            const user = await new User({
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            }).save()

            const response = await request(server)
                .get(`/api/users/${user._id}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('name', user.name)
            expect(response.body).toHaveProperty('email', user.email)
            expect(response.body).not.toHaveProperty('password')
        })

        it('should return 404 if a user is not found with the given id', async () => {
            const generatedId = new mongoose.Types.ObjectId()
            const response = await request(server)
                .get(`/api/users/${generatedId}`)
                // .set('Authorization', `Bearer: ${token}`)
            expect(response.status).toBe(404)
            expect(response.text).toBe("No user found with given ID.")
        })

    })
    
    describe('POST /', () => {
        it('should return 400 if user already exists', async () => {
            const user = {
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            }
            await new User(user).save()
            const response = await request(server)
                .post('/api/users')
                .send(user)
                expect(response.status).toBe(400)
                expect(response.text).toBe("User already exists.")
        })

        it('should return 400 if user data in body is invalid', async () => {
            const user = {
                name: 'a',
                email: 'aaaa',
                password: 'aaaa'
            }
            const response = await request(server)
                .post('/api/users')
                .send(user)

            expect(response.status).toBe(400)
            expect(response.text).toBe("Invalid user data received.")
        })

        it('should store a hashed password for user', async () => {
            const user = {
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            }
            
            const { 'user.id': userId } = await request(server)
                .post('/api/users')
                .send(user)

            const userWithPassword = User.findById(userId)

            expect(userWithPassword.password).not.toBe(user.password)
        })

        it('should return a user and token if user is created successfully', async () => {
            const user = {
                name: 'a',
                email: 'a@a.com',
                password: 'password'
            }
            const response = await request(server)
                .post('/api/users')
                .send(user)
            expect(response.body).toHaveProperty('token')
            expect(response.body).toHaveProperty('user.name')
            expect(response.body).toHaveProperty('user.email')
            expect(response.body).toHaveProperty('user._id')
            expect(response.body).toHaveProperty('user.isAdmin')
            expect(response.body).toHaveProperty('user.operators')
            expect(response.body).toHaveProperty('user.lessonScores')
            expect(response.body).not.toHaveProperty('user.password')
        })
    })
})