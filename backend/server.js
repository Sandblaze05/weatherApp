const express = require('express');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server up');
});

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});