/* GET home page. */

var gm = require('gm').subClass({imageMagick: true});
var resumable = require('./resumable-node.js')('/tmp/image/');
var fs = require("fs");


function router(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });


    //app.get('/upload', function (req, res) {
    //
    //    console.log("get upload");
    //    resumable.get(req, function (status, filename, original_filename, identifier) {
    //        console.log('22222222222');
    //        console.log('GET', status);
    //        res.send((status == 'found' ? 200 : 404), status);
    //    });
    //});

    app.post('/upload', function (req, res) {

        // console.log(req);

        console.log("post upload 111111111111");
        resumable.post(req, function (status, filename, original_filename, identifier) {
            console.log('POST', status, original_filename, identifier);
            console.log('111111111111111111111111111');
            console.log(filename);

               //var stream = fs.createWriteStream(filename);
               //resumable.write(identifier, stream);
               //stream.on('data', function(data){
               //    console.log("data =====");
               //    console.log(data)
               //});
               //stream.on('end', function(){
               //    console.log("end")
               //
               //});


            //gm(filename)
            //    .resize(100, 100)
            //    .noProfile()
            //    .write('public/image/resize.png', function (err) {
            //        if (!err) console.log('done');
            //        console.log('error');
            //    });
            res.send(status, {
                // NOTE: Uncomment this funciton to enable cross-domain request.
                //'Access-Control-Allow-Origin': '*'
            });
        });
    });

//
//// Handle uploads through Resumable.js
//    app.post('/upload', function (req, res) {
//
//        // console.log(req);
//
//        resumable.post(req, function (status, filename, original_filename, identifier) {
//            console.log('POST', status, original_filename, identifier);
//
//            res.send(status, {
//                // NOTE: Uncomment this funciton to enable cross-domain request.
//                //'Access-Control-Allow-Origin': '*'
//            });
//        });
//    });


    app.get('/test', function (req, res) {
        //res.render('index');
        console.log('test');
        gm('src/image/image.jpg')
            .resize(100, 100)
            .noProfile()
            .write('public/image/resize.png', function (err) {
                if (!err) console.log('done');

            });

        res.end();
    });


}


module.exports = router;
