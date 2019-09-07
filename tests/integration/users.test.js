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

    describe('PUT /:id/records', () => {
        let testRecord = {
            lessonName: 'Test Lesson',
            lessonSlug: 'test-lesson',
            score: 50
        }
        let user

        beforeEach(async () => {
            user = await new User({
                name: 'test',
                email: 'a@a.com',
                password: 'password'
            }).save()
        })

        afterEach(async () => {
            await User.deleteMany({})
        })

        // Return 401 if client is not logged in
        it('should return 401 if client is not logged in', async () => {
            const response = await request(server)
                .put(`/api/users/${user._id}/records`)
                .send(testRecord)
                expect(response.status).toBe(401)
            })
            
        // Return 401 if id does not match attached jwt
        it('should return 401 if given id does not match attached jwt', async () => {
            const response = await request(server)
                .put(`/api/users/${new mongoose.Types.ObjectId()}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)
                
                expect(response.status).toBe(401)
            })
            
        // Return 404 if id does not exist
        it('should return 404 if user with given id does not exist', async () => {
            user._id = new mongoose.Types.ObjectId()
            const response = await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)
            
            expect(response.status).toBe(404)
        })

        // Return 404 if lesson slug provided does not exist
        // it('should return 404 if lesson provided does not exist', () => {

        //     expect(response.status).toBe(404)
        // })

        // Return 400 if the lesson score is not updated
        it('should return 400 if the lesson score is not updated', async () => {
            await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)

            const response1 = await request(server) // Test if a lower score updates
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send({
                    lessonName: 'Test Lesson',
                    lessonSlug: 'test-lesson',
                    score: 30 // lower than testRecord.score (50)
                })

            const response2 = await request(server) // Test that score isn't updated
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)

            expect(response1.status).toBe(200)
            expect(response2.status).toBe(200)
        })
        
        // Should return 200 if the record is updated successfully
        it('should return 200 if the record is updated', async () => {
            await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)

            const response = await request(server) // Test if a higher score updates
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send({
                    lessonName: 'Test Lesson',
                    lessonSlug: 'test-lesson',
                    score: 60 // higher than testRecord.score (50)
                })

            expect(response.status).toBe(200)
        })
        
        // Should return 201 if the record is new for the user
        it('should return 201 if the record is new for the user', async () => {
            const response = await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)

            const newRecordOnUser = response.body.lessonScores.find(r => r.lessonSlug === testRecord.lessonSlug)
            expect(response.status).toBe(201)
            expect(response.body.lessonScores.length).toBe(1)
            expect(newRecordOnUser).toHaveProperty('lessonSlug', testRecord.lessonSlug)
            expect(newRecordOnUser).toHaveProperty('score', testRecord.score)
        })

        // Should return the user record
        it('should return the user record', async () => {
            const response = await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)
            expect(response.body).toHaveProperty('name', user.name)
            expect(response.body).toHaveProperty('email', user.email)
            expect(response.body).not.toHaveProperty('password')
        })

        // Should update the date of record when updating score
        it.skip('should update the date of record when updating score', async () => {
            await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send(testRecord)
        
            const response = await request(server)
                .put(`/api/users/${user._id}/records`)
                .set('Authorization', `Bearer: ${user.generateAuthToken()}`)
                .send({
                    lessonName: 'Test Lesson',
                    lessonSlug: 'test-lesson',
                    score: 60
                })
        
            const newRecordOnUser = response.body.lessonScores.find(r => r.lessonSlug === testRecord.lessonSlug)
            const lessonScores = await User.findById(user._id).select('lessonScores')
            const rawRecord = lessonScores.find(r => r.lessonSlug === testRecord.lessonSlug)

            expect(response.status).toBe(200)
            expect(response.body.lessonScores.length).toBe(1)
            expect(newRecordOnUser).toHaveProperty('lessonSlug', testRecord.lessonSlug)
            expect(newRecordOnUser).toHaveProperty('score', testRecord.score)
            expect(newRecordOnUser.date).toBe(rawRecord.date)
        })
    })
})