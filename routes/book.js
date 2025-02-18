const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

//add a book
router.post('/', bookController.addBook);

//get all books
router.get('/',bookController.getAllBook);

//get a book
router.get('/:id', bookController.getBook);

//update a book
router.put('/:id', bookController.updateBook);  

//delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router;