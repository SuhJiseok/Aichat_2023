const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    res.send({
        message: 'Hello world'
    });
})

app.listen(port, () => {
    console.log('Example app port: ' + port);
})