/* GET home page. */

var gm = require('gm').subClass({imageMagick: true});
var resumable = require('./resumable-node.js')('/tmp/image/');
var fs = require("fs");
//var redis = require("redis"),
//    client = redis.createClient();

var filePath = '/tmp/image/';

var compressionFilePath = null;

function router(app) {
    app.get('/', function (req, res) {
        res.render('index', {
            status: "init"
        });
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
            console.log(req.session);
            console.log(filename);


            var saveImagePath = "public/image/";
            var imagePath = filePath + identifier;
            var compressionFileName = "compression-" + filename;


            gm(imagePath)
                .resize(100, 100)
                .noProfile()
                .write(saveImagePath + compressionFileName, function (err) {
                    if (!err) {
                        console.log('done');
                        console.log('- - - - - - ');

                        console.log(compressionFileName);

                        compressionFilePath = 'image/' + compressionFileName;

                        //client.hmset('filePath',{filePath:'image/' + compressionFileName},function (err){
                        //
                        //    console.log('save');
                        //    console.log(err);
                        //});

                        //client.hgetall('filePath',function (err,obj){
                        //    console.log('show file path');
                        //    console.log(obj)
                        //});


                        console.log('success');
                    }
                });
            
            console.log('session');
            console.log(req.session.filePath);

            setTimeout(function (){
                console.log('time out');
                console.log(req.session.filePath);
               req.session.filePath =  'image/' + compressionFileName;

                console.log("set");
                console.log(req.session.filePath);
                
                
            },100);

            res.send(status, {
                //NOTE: Uncomment this funciton to enable cross-domain request.
                //'Access-Control-Allow-Origin': '*'
            });


        });
    });

    app.post('/getCompressFilePath', function (req, res) {
        console.log('file path');
        console.log(compressionFilePath);
        if (compressionFilePath) {
            res.json({
                status: "success",
                filePath: compressionFilePath
            });
        } else {
            res.json({
                status: "error",
                msg: "缩略图获取失败"

            })
        }
    });


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
