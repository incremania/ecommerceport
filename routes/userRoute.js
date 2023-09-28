const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { authenticateUser } = require('../utils/token')
const  { authorizePermission } = require('../middleware/authorizePermission')


router
.patch('/update', authenticateUser, authController.update)
.delete('/delete', authenticateUser, authController.delete)
.post('/logout', authController.logout)
module.exports = router