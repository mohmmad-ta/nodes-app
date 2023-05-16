const express = require('express');
const {getAllNodes, getOneNodes, updateNodes, deleteNodes, createNodes, createUpload} = require('../controllers/NodesController');
const router = express.Router();

router.route('/')
    .get(getAllNodes)

router.route('/:id')
    .post(createUpload, createNodes)

router.route('/:id')
    .get(getOneNodes)
    .patch(updateNodes)
    .delete(deleteNodes)

module.exports = router;
