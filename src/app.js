const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shops')

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection erro"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})

// Models
var User = require('../models/user.js')
var Shop = require('../models/shop.js')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

console.log('Hello World')
console.log(process.env)

// USERS API ENDPOINTS

// "/api/users"
//     GET: finds all users
//     POST: creates a new user

app.get('/api/users', (req,res) => {
    User.find((error, users) => {
        if (error) return next(error);
        res.json(users)
    })
})

app.post('/api/users', (req,res) => {
    var db = req.db;
    console.log(req)
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var email = req.body.email

    var user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email
    })

    console.log(user)

    user.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'User saved successfully',
            user: user
        })
    })
})

// "/api/users/:id"
//     GET: find user by id
//     PUT: update user by id
//     DELETE: delete user by id

app.get("/api/users/:id", (req, res) => {
})

app.put("/api/users/:id", (req, res) => {
})

app.delete("/api/users/:id", (req, res) => {
})

// QUIZZES API ENDPOINTS

// "/api/quizzes"
//     GET: finds all quizzes
//     POST: creates a new quiz

app.get('/api/quizzes', (req,res) => {
})

app.post('/api/quizzes', (req,res) => {
})

// "/api/quizzes/:id"
//     GET: find quiz by id
//     PUT: update quiz by id
//     DELETE: delete quiz by id

app.get("/api/quizzes/:id", (req, res) => {
})

app.put("/api/quizzes/:id", (req, res) => {
})

app.delete("/api/quizzes/:id", (req, res) => {
})

// SHOPS API ENDPOINTS

// "/api/shops"
//     GET: finds all shops
//     POST: creates a new shop

app.get('/api/shops', (req,res) => {
})

app.post('/api/shops', (req,res) => {
})

// "/api/shops/:id"
//     GET: find shop by id
//     PUT: update shop by id
//     DELETE: delete shop by id

app.get("/api/shops/:id", (req, res) => {
})

app.put("/api/shops/:id", (req, res) => {
})

app.delete("/api/shops/:id", (req, res) => {
})

// Get all Shops
app.get('/shops', (req, res) => {
    console.log("app.get/shops")
    Shop.find((error, shops) => {
        if (error) { console.error(error) }
        res.send({
            shops: shops
        })
    })
})

// Fetch a single Shop
app.get('/shop/:id', (req, res) => {
    var db = req.db;
    Shop.findById(req.params.id, (error, shop) => {
        if (error) { console.log(error) }
        res.send(shop)
    })
})

// Add a new shop to the database
app.post('/shops', (req, res) => {
    var db = req.db;
    console.log(req)
    var name = req.body.name
    var location = req.body.location
    var shop = new Shop({
        name: name,
        location: location
    })

    console.log(shop)

    shop.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Shop saved successfully',
            shop: shop
        })
    })
})

// Update a Shop
app.put('/shops/:id', (req, res) => {
    var db = req.db;
    Shop.findById(req.params.id, (error, shop) => {
        if (error) { console.log(error) }

        shop.name = req.body.name
        shop.location = req.body.location
        shop.save( error => {
            if (error) { console.log(error) }
            res.send({
                success: true
            })
        })
    })
})

// app.get('/posts', (req,res) => {
//     res.send(
//         [{
//             title: "Welcome",
//             description: "Blue Star is getting a fresh new look!"
//         }]
//     )
// })

app.listen(process.env.PORT || 8081)
