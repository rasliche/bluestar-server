const express = require('express')
const router = express.Router()

// USERS API ENDPOINTS

// "/api/users"
//     GET: finds all users
//     POST: creates a new user

router.get('/', (req,res) => {
    User.find((error, users) => {
        if (error) return next(error);
        res.json(users)
    })
})

router.post('/', (req,res) => {
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

router.get("/:id", (req, res) => {
})

router.put("/:id", (req, res) => {
})

router.delete("/:id", (req, res) => {
})

module.exports = router
