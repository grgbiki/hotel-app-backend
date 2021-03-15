import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import authenticationRoutes from './routes/authenticationRoute';

dotenv.config();

const app = express();

// mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/vetghatdb`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

authenticationRoutes(app);

app.use(express.static('public'));

app.listen(process.env.PORT, () =>
    console.log(`Your server is running on port ${process.env.PORT}`));