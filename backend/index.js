const express = require('express');

const app = express();


// req = request
// res = response
app.get('/', (req, res) => {
    return res.json({ msg: 'Hello OmniStack'});
});

app.listen(3333);