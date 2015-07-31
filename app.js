var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var setting = require('./setting');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var multipart = require('connect-multiparty');


var app = express();

// view engine setup

app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(multipart());

app.use(session(
    {
    secret: setting.cookieSecret,
    key: setting.db,
    cookie: {maxAge: 1000 * 60 },
    store: new MongoStore({
        db: setting.db,
        host: setting.host,
        port: setting.port
    })
}
));


routes(app);

app.listen(app.get('port'), function () {
    console.log('upload-image project server start on :' + app.get('port'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
