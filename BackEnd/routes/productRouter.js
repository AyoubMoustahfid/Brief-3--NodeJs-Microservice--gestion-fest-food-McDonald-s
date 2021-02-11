const express = require('express');
const Product = require("./../models/productModel")

const router = express.Router();

const {createProduct, allProducts, relatedProduct, photoProduct,productById, updateProduct, deleteProduct} = require('./../controllers/productController');

router.get('/', allProducts)
router.get('/cart/:id', (req,res) =>{

    Product.find({_id: `${req.params.id}`})
    .then((Product) => res.json(Product))
    .catch((err) => res.status(400).json("Error :" + err));
  });
router.get('/:id', (req,res) =>{

    Product.find({souCategory: `${req.params.id}`})
    .then((Product) => res.json(Product))
    .catch((err) => res.status(400).json("Error :" + err));
  });
router.post('/create', createProduct)
router.get('/related/:productId', relatedProduct)
router.put('/:productId',updateProduct )
router.delete('/:productId',deleteProduct )
router.get('/photo/:productId', photoProduct)

router.param("productId", productById)

module.exports = router
