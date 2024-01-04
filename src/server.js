require('express-async-errors');
require('dotenv/config')

const AppError = require('./utils/AppError');

const express = require('express');
const routes = require('./routes');
const database = require('./database');
const app = express();
const cors = require('cors');

const uploadConfig = require('./configs/uploads');
database();

app.use(cors());
app.use(express.json());
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));


app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});


const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) )