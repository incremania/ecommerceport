const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { authenticateUser } = require('../utils/token')
const  { authorizePermission } = require('../middleware/authorizePermission')
router
.post('/register', authController.register)
.post('/login', authController.login)
.patch('/update', authenticateUser, authController.update)
.delete('/delete', authenticateUser, authController.delete)
.post('/logout', authController.logout)
module.exports = router