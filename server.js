var express = require('express');
var port = 9601;
var app = express();

app.use(express.static(__dirname + '/dist'));

console.log('[DIR]:::' + __dirname + '/dist');

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('[LOG]:::Listening at http://localhost:' + port + '\n')
})
