
    var express = require('express');
    var multer = require('multer')
    var path = require('path');
    var port = Number(process.env.PORT || 3000);
    var app = express();
    var upload = multer({ dest: path.join(__dirname + '/uploads/') })
    var maxSize = 1024 * 1024 * 20;
    var fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });


    app.post('/uploads/', upload.single('file'), function(req, res, next) {

        if (!req.file)
            res.json({error: "File has not been uploaded."});
        else {
        if (req.file.size > maxSize) {
            res.json({error: "File size is too big. Max. 20MB"});
        } else {
            res.json({name: req.file.originalname, size: req.file.size + " bytes"})
        }
            fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename));        //// Deleting file after we output info about it 
        }                                                                             //// as it is not necessary to store it
     })                                                                                
 

    app.listen(port, function(err) {
        if (err) throw err;
        console.log('Listening on port ' + port);
    });