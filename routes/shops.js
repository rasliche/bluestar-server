const express = require('express')
const router = express.Router()

const { Shop, validate } = require('../models/shop')

// SHOPS API ENDPOINTS
// "/api/shops"
//     GET: finds all shops
//     POST: creates a new shop

router.get('/', (req,res) => {
})

router.post('/', (req,res) => {
})

// "/api/shops/:id"
//     GET: find shop by id
//     PUT: update shop by id
//     DELETE: delete shop by id

router.get("/:id", (req, res) => {
})

router.put("/:id", (req, res) => {
})

router.delete("/:id", (req, res) => {
})

module.exports = router
