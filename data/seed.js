const config = require('config')
const mongoose = require('mongoose')
const faker = require('faker')

const { Operator } = require('../models/operator')
const { User } = require('../models/user')

const createFakeUser = () => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
})

const createFakeAdmin = () => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
    isAdmin: true,
})

const createFakeOperator = () => ({
    name: faker.company.companyName(),
    password: faker.random.word(),
})

async function runSeed() {
    const db = config.get('db')
    console.log(db)
    await mongoose.connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    
    await Operator.deleteMany({})
    await User.deleteMany({})

    const fakeUsers = []
    for (let i = 0; i < 300; i++) {
        fakeUsers.push(createFakeUser())
    }
    await User.insertMany(fakeUsers)

    const fakeOperators = []
    for (let i = 0; i < 32; i++) {
        fakeOperators.push(createFakeOperator())
    }
    await Operator.insertMany(fakeOperators)

    await mongoose.disconnect()
}

runSeed()


// module.exports.createFakeAdmin = createFakeAdmin
module.exports.createFakeUser = createFakeUser
module.exports.createFakeOperator = createFakeOperator