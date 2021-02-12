const express = require('express');

const router = express.Router();
const {getAllTable, createTable, deleteTable, updateTable,tableId } = require('./../controllers/tableController')

router.get('/', getAllTable)
router.post('/create', createTable)
router.delete('/:tableId', deleteTable)
router.put('/:tableId', updateTable)

router.param('tableId', tableId)

module.exports = router
