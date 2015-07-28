/* GET home page. */

var  gm =  require('gm').subClass({imageMagick: true});



function router(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });


    app.get('/test', function (req, res) {
        //res.render('index');
        console.log('test');
        gm('src/image/image.jpg')
            .resize(100, 100)
            .noProfile()
            .write('public/image/resize.png', function (err) {
                if (!err) console.log('done');
                console.log('success');
            });

        res.end();
    });



}


module.exports = router;
