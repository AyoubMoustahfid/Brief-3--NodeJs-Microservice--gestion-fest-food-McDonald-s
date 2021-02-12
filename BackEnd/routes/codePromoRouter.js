const express = require('express');

const router = express.Router();
const {getAllCodePromo, createCodePromo, deleteCodePromo, updateCodePromo,codePromoId } = require('./../controllers/codePromoController')

router.get('/', getAllCodePromo)
router.post('/create', createCodePromo)
router.delete('/:codePromoId', deleteCodePromo)
router.put('/:codePromoId', updateCodePromo)

router.param('codePromoId',codePromoId )

module.exports = router
