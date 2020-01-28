const request = require('supertest')
const mongoose = require('mongoose')
const { Lesson } = require('../../models/lesson')
const { User } = require('../../models/user')

let token

describe('/api/lessons', () => {
    let server
    beforeEach(async () => {
        server = require('../../app')
        token = new User({ 
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }).generateAuthToken()
        
        await Lesson.insertMany([
            {
                title: 'a',
                description: 'a',
                programs: [],
                published: false,
                content: 'a'
            },
            {
                title: 'b',
                description: 'b',
                programs: [],
                published: false,
                content: 'b'
            },
            {
                title: 'c',
                description: 'c',
                programs: [],
                published: false,
                content: 'c'
            },
        ])
    })

    afterEach(async () => {
        await User.deleteMany({})
        await Lesson.deleteMany({})
        server.close()
    })
    
    describe('GET /', () => {
        it('should return all lessons', async () => {
            const response = await request(server).get('/api/lessons')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(3)
            expect(response.body.some(u => u.title === 'a')).toBeTruthy()
        })
    })

    describe('GET /:lessonId', () => {
        it('should return a lesson if a valid lessonId is passed', async () => {

            const response = await request(server).get(`/api/lessons/${lessonId}`)
            expect(response.status).toBe(200)
        })

        it('should return a 422 if invalid lessonId is passed', async () => {
            const response = await request(server).get('/api/lessons/12')
            expect(response.status).toBe(422)
        })

        it('should return a 404 if a lesson is not found for the given lessonId', async () => {
            const lessonId = mongoose.Types.ObjectId().toHexString()
            const response = await request(server).get(`/api/lessons/${lessonId}`)
            expect(response.status).toBe(404)
        })
    })

    describe('POST /', () => {
        // it('should return 401 if client is not logged in', async () => {
        //     const response = await request(server)
        //         .post('/api/operators')
        //         .send({ name: 'operator1' })

        //     expect(response.status).toBe(401)
        // })

    //     it('should return 400 if operator name is not present', async () => {
    //         // const token = new User().generateAuthToken()
    //         const response = await request(server)
    //             .post('/api/operators')
    //             .set('Authorization', `Bearer: ${token}`)
    //             .send({ })

    //         expect(response.status).toBe(400)
    //     })

    //     it('should return 400 if operator name is more than 50 characters', async () => {
    //         // const token = new User().generateAuthToken()
    //         // 52 characters means 51 gaps which are replaced by 'a'
    //         const name = new Array(52).join('a')
    //         const response = await request(server)
    //             .post('/api/operators')
    //             .set('Authorization', `Bearer: ${token}`)
    //             .send({ name })

    //         expect(response.status).toBe(400)
    //     })

    //     it('should save the operator if it has a valid name', async () => {
    //         // const token = new User().generateAuthToken()
    //         const name = 'multi name operator'
    //         const response = await request(server)
    //             .post('/api/operators')
    //             .set('Authorization', `Bearer: ${token}`)
    //             .send({ name })

    //         const operator = await Operator.find({ name })

    //         expect(response.status).toBe(201)
    //         expect(operator).not.toBeNull()
    //     })
        
        it('should return the lesson if it is saved to the database', async () => {
            const token = new User().generateAuthToken()
            const title = 'a'
            const response = await request(server)
                .post('/api/lessons')
                .set('Authorization', `Bearer: ${token}`)
                .send({ title })

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('title', title)
        })
    })

    // describe('DELETE /:id', () => {
    //     it('should delete the shop with the given ID from the database if JWT is an Admin', async () => {
    //         const operator = await new Operator({ name: 'shop1' }).save()

    //         const response = await request(server)
    //             .delete(`/api/operators/${operator._id}`)
    //             .set('Authorization', `Bearer: ${token}`)

    //         expect(response.status).toBe(200)
    //         expect(response.body).toHaveProperty('_id')
    //         expect(response.body).toHaveProperty('name', operator.name)
    //     })
    // })
})