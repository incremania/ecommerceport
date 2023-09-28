const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const { authenticateUser } = require('../utils/token')
const  { authorizePermission } = require('../middleware/authorizePermission')


router
.post('/create', authenticateUser, authorizePermission('admin'), productController.create)
.get('/all', productController.getAllProducts)
.get('/:productId',  productController.getSingleProduct)
.patch('/:productId', authenticateUser, authorizePermission('admin'), productController.update)
.delete('/:productId', authenticateUser, authorizePermission('admin'), productController.delete)

module.exports = router