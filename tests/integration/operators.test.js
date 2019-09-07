const request = require('supertest')
const mongoose = require('mongoose')
const slug = require('slug')
const { Operator } = require('../../models/operator')
const { User } = require('../../models/user')
let server

describe('/api/operators', () => {
    let token 
    beforeEach(() => {
        token = new User({ 
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }).generateAuthToken()
        server = require('../../app')
    })
    afterEach(async () => {
        server.close()
        await Operator.deleteMany({})
        await User.deleteMany({})
    })

    describe('GET /', () => {
        it('should return all operators', async () => {
            await Operator.collection.insertMany([
                { name: 'operator1' },
                { name: 'operator2' },
            ])
            const response = await request(server).get('/api/operators')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(2)
            expect(response.body.some(u => u.name === 'operator1')).toBeTruthy()
        })
    })

    describe('GET /:slug', () => {
        it('should return an operator if a valid slug is passed', async () => {
            const operator = new Operator({ name: 'shop1' })
            await operator.save()

            const response = await request(server).get('/api/operators/' + operator.slug)
            expect(response.status).toBe(200)
            // expect(response.)
        })

        it('should return a 404 if invalid slug is passed', async () => {
            const response = await request(server).get('/api/operators/12')
            expect(response.status).toBe(404)
            // expect(response.)
        })
    })

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            const response = await request(server)
                .post('/api/operators')
                .send({ name: 'operator1' })

            expect(response.status).toBe(401)
        })

        it('should return 400 if operator name is not present', async () => {
            // const token = new User().generateAuthToken()
            const response = await request(server)
                .post('/api/operators')
                .set('Authorization', `Bearer: ${token}`)
                .send({ })

            expect(response.status).toBe(400)
        })

        it('should return 400 if operator name is more than 50 characters', async () => {
            // const token = new User().generateAuthToken()
            // 52 characters means 51 gaps which are replaced by 'a'
            const name = new Array(52).join('a')
            const response = await request(server)
                .post('/api/operators')
                .set('Authorization', `Bearer: ${token}`)
                .send({ name })

            expect(response.status).toBe(400)
        })

        it('should save the operator if it has a valid name', async () => {
            // const token = new User().generateAuthToken()
            const name = 'multi name operator'
            const response = await request(server)
                .post('/api/operators')
                .set('Authorization', `Bearer: ${token}`)
                .send({ name })

            const operator = await Operator.find({ name })

            expect(response.status).toBe(201)
            expect(operator).not.toBeNull()
        })
        
        it('should return the operator if it is valid', async () => {
            // const token = new User().generateAuthToken()
            const name = 'multi name operator'
            const response = await request(server)
                .post('/api/operators')
                .set('Authorization', `Bearer: ${token}`)
                .send({ name })

            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('name', name)
            expect(response.body).toHaveProperty('slug', slug(name))
        })
    })

    describe('DELETE /:id', () => {
        it.todo('should delete the shop with the given ID from the database', 
        // async () => {
        //     const operator = new Operator({ name: 'shop1' }).save()

        //     const response = request(server)
        //         .delete(`/api/operators/${operator._id}`)
        //     expect(response.status).toBe(200)
        // }
        )
    })
})