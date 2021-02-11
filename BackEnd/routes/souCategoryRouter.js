const express = require('express');
const { model } = require('mongoose');
const SouCategory = require('./../models/souCategoryModel');


const router = express.Router();

const {getSouCategory,createSouCategory, deleteSouCategory, updateSouCategory, allSouCategories, souCategoryId} = require('./../controllers/souCategoryController')

router.post('/create', createSouCategory)
router.delete('/:souCategoryId', deleteSouCategory)
router.put('/:souCategoryId', updateSouCategory)
router.get('/', allSouCategories)

router.get('/:id', (req, res) => {
    SouCategory.find({category: `${req.params.id}`})
    .then((SouCategory) => res.json(SouCategory))
    .catch((err) => res.status(400).json("Error:" + err))
})
router.param('souCategoryId', souCategoryId)

module.exports = router