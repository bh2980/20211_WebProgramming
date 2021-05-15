var express = require('express');
var app = express();

var numtiparty = require('multiparty');
var format = require('util').format;

app.get('/', function(req, res) {
    res.send('<form method="post" enctype="multipart/form-data">' +
        '<p>Title: <inpit type="text" name="title" /></p>' +
        '<p>Image: <input type="file" name="image" /></p>' +
        '<p><input type="submit" value="Upload" /></p>' +
        '</form>');
});

app.listen(3000, function() {
    console.log("App listneing on port 3000...")
})

app.post('/', function(req, res, next) {
    var form = new multiparty.Form();
    var image;
    var title;

    form.on('error', next);
    form.on('close', function() {
        res.send(format('\nuploaded %s (%d Kb) as %s', image.filename, image.size / 1024 | 0, title));
    });

    form.on('part', function(part) {
        if (!part.filename) return;
        if (part.name !== 'image') return part.resume();
        image = {};
        image.filename = part.filename;
        image.size = 0;
        part.on('data', function(buf) {
            image.size += buf.length;
        });
    });
    form.parse(req);
})