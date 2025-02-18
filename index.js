const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const port = 5000;
const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

//router
app.use("/author", authorRouter);
app.use("/book", bookRouter);

dotenv.config();

main().catch(err => console.log(err));

async function main() {
  mongoose.connect(process.env.MONGODB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
mongoose.connection.on('connected', () => console.log('connected'));

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})