const express = require('express')
const router = express.Router()
const {getAllUsers,signupUser,loginUser} = require('../controllers/userController')

router.get('/',getAllUsers)
router.post('/signup',signupUser)
router.post('/login',loginUser)

module.exports = router

