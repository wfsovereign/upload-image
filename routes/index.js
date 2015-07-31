/* GET home page. */

var gm = require('gm').subClass({imageMagick: true});
var resumable = require('./resumable-node.js')('/tmp/image/');
var fs = require("fs");

var saveImagePath = "src/image/";
var filePath = '/tmp/image/';

var compressionFilePath = null;

function router(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });


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

        var filePathNotSlash = saveImagePath.substring(0, saveImagePath.length - 1);
        var folder_exists = fs.existsSync(filePathNotSlash);

        if (folder_exists == true) {
            var dirList = fs.readdirSync(filePathNotSlash);
            dirList.forEach(function (fileName) {
                fs.unlinkSync(saveImagePath + fileName);
            });
        }
        res.json({
            status:"success",
            msg:"服务器缓存清除成功"
        });

    })


}


module.exports = router;
