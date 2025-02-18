const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

//add author
router.post('/', authorController.addAuthor);

//get all authors
router.get('/', authorController.getAllAuthor);

//get an author
router.get('/:id', authorController.getAuthor);

//update an author
router.put('/:id', authorController.updateAuthor);

//delete an author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;