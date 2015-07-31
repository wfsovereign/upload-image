/* GET home page. */

var gm = require('gm').subClass({imageMagick: true});
var resumable = require('./resumable-node.js')('/tmp/image/');
var fs = require("fs");


//var redis = require("redis"),
//    client = redis.createClient();


var saveImagePath = "src/image/";
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

        resumable.post(req, function (status, filename, original_filename, identifier) {
            console.log('POST', status, original_filename, identifier);
            console.log(filename);
            var imagePath = filePath + identifier;
            var compressionFileName = "compression-" + filename;


            gm(imagePath)
                .resize(100, 100)
                .noProfile()
                .write(saveImagePath + compressionFileName, function (err) {
                    if (!err) {
                        console.log('done');
                        compressionFilePath = 'image/' + compressionFileName;
                    }
                });


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

    app.post('/clearCache', function (req, res) {
        compressionFilePath = null;

        //fs.rmdir("../" + saveImagePath, function (err) {
        //    if (err) {
        //        console.log("删除失败");
        //        res.json({
        //            status: "error",
        //            msg: "服务器缓存清除失败"
        //        })
        //    }
        //
        //    res.json({
        //        status: "success",
        //        msg: "文件缓存清除成功"
        //    });
        //});

        //fs.rmdir("public/image",function (err){
        //    fs.exists("public/image", function(exists){
        //        console.log(exists ? "删除失败" : "删除成功");
        //    });
        //});
        //
        //fs.unlink("public/image/compression-background.png", function(err){
        //    fs.exists(fileName, function(exists){
        //        console.log(exists ? "删除失败" : "删除成功");
        //    });
        //});
        //
        //
        //var fileName = "public/image/anps.txt";
        //

        var filePahthNotSlash = saveImagePath.substring(0, saveImagePath.length - 1);
        var folder_exists = fs.existsSync(filePahthNotSlash);

        if (folder_exists == true) {
            var dirList = fs.readdirSync(filePahthNotSlash);
            dirList.forEach(function (fileName) {
                fs.unlinkSync(saveImagePath + fileName);
            });
        }
        res.json({
            status:"success",
            msg:"服务器缓存清除成功"
        });


        //fs.unlink(fileName, function(err){
        //    fs.exists(fileName, function(exists){
        //        console.log(exists ? "删除失败" : "删除成功");
        //    });
        //});

        //fs.readFile(fileName, function(err,data){
        //    if(err) console.log(err);
        //    console.log('file content');
        //    console.log(data.toString());
        //});


    })


}


module.exports = router;
