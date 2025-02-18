const { Author, Book } = require('../models/model');


const authorController = {
    //add author
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(200).json(savedAuthor);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get all authors
    getAllAuthor: async (req, res) => {
        try {
            const authors = await Author.find();
            res.status(200).json(authors);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get an author
    getAuthor: async (req, res) => {
        try {
            const anAuthor = await Author.findById(req.params.id).populate("books"); //params la dau :
            res.status(200).json(anAuthor);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //update a author
    updateAuthor : async (req, res) => {
        try {
            const updatedAuthor = await Author.findById(req.params.id);
            await updatedAuthor.updateOne({ $set: req.body });
            res.status(200).json("Update successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //delete an author
    deleteAuthor : async (req, res) => {
        try {
            await Book.updateMany({author: req.params.id}, {author: null});
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        } catch (error) {
            res.status(500).json(error);    
        }
    }
}

module.exports = authorController;