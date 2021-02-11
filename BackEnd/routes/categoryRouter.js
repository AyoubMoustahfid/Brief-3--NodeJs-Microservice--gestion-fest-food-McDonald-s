const express = require('express');
const { model } = require('mongoose');

const router = express.Router();

const {createCategory,
        allCategories, 
        categoryId, 
        deleteCategory,
        updateCategory,
    relatedCategory} = require('./../controllers/categoryController')

router.post('/create', createCategory)
router.get('/related/:categoryId',relatedCategory )
router.delete('/:categoryId', deleteCategory)
router.put('/:categoryId', updateCategory)
router.get('/', allCategories)


router.param('categoryId', categoryId)

module.exports = router