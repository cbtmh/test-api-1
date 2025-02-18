const { Book, Author } = require('../models/model');


const bookController = {
    //add a book
    addBook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if (req.body.author) {
                const author = await Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }
            res.status(200).json(savedBook);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get all books
    getAllBook: async (req, res) => {
        try {
            const newBook = await Book.find();
            res.status(200).json(newBook);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get a  book
    getBook: async (req, res) => {
        try {
            const aBook = await Book.findById(req.params.id).populate("author");
            res.status(200).json(aBook);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //update a book
    updateBook : async (req, res) => {
        try {
            const updatedBook = await Book.findById(req.params.id);
            await updatedBook.updateOne({ $set: req.body });
            res.status(200).json("Update successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //delete a book
    deleteBook : async (req, res) => {
        try {
            await Author.updateMany({books: req.params.id}, {$pull: {books: req.params.id}});
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        }
        catch (error) {
            res.status(500).json(error);
        }
}
}
module.exports = bookController;
