const express = require('express');

const router = require('./router');

const app = express();

app.use(express.json());

app.use('/static', express.static(__dirname + '/../assets'));

app.use(router);

const start = () => {
    if (!process.env.PORT) {
        throw new Error("The port is missing, please define it to 5555");
    }
    
    app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
}

module.exports = { start };