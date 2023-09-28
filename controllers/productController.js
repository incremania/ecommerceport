const Product = require('../models/ProductModel');
const { handleError } = require('../errors/handleErr');

module.exports.create = async( req, res ) => {
    try {
        req.body.user = req.user.userId
        const product = await Product.create(req.body);
        res.status(201).json({ product})
    }
    catch(err) {
        console.log(err)
      const error = handleError(err)
      res.status(500).json({error})  
    }
}

module.exports.getAllProducts = async( req, res ) => {
    try {
        const product = await Product.find({});
        if(!product) {
            return res.status(404).json({ error: 'no product found'})
        }
       res.status(404).json({ product })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

module.exports.getSingleProduct = async( req, res ) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({ error: 'no product found'})
        }
        res.status(200).json({ product })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

module.exports.update = async( req, res ) => {
    try {
        const { productId } = req.params
    
        const { name, description, company, category, color, price, featured, stockQuantity } = req.body
        
        const product = await Product.findByIdAndUpdate(productId, {
            name, description, company, category, color, price , featured, stockQuantity
        }, {runValidators: true, new: true})

        if(!product) {
            return res.status(404).json({ error: 'no product found'})
        }

        res.status(200).json({ product })
    } catch (err) {
        console.log(err)
        const error = handleError(err)
        res.status(500).json({ error })
    }
}

module.exports.delete = async( req, res ) => {
    try {
        const { productId } = req.params
        await Product.findByIdAndDelete(productId)
        res.status(200).json({ msg: 'product deleted' })
    } catch (error) {
        res.status(500).json({ error })
    }
}


