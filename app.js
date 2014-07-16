/*
 * Module dependencies
 */
var express = require( 'express' ),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    logger = require('morgan'),
    stylus = require( 'stylus' ),
    nib = require( 'nib' ),
    path = require('path'),
    flash = require('express-flash'),
    nodemailer = require("nodemailer"),
    app = express( );




/*
Express settings
*/
app.set( 'port', process.env.PORT || 8080);        // set port
app.set( 'views', path.join(__dirname, 'views'));  // set views location
app.set( 'view engine', 'jade');                   // set jade as view engine
app.use(bodyParser( ));                            // use body parser to break down requests
app.use(errorHandler());                           // use express' pretty error handling
if (process.env.NODE_ENV === 'development'){       // log requests to console in development
  app.use(logger('dev'));
}


// stylus settings
function compile(str, path) {

  var lineNos,
      compressCss;

  if(process.env.NODE_ENV === 'development') {
      lineNos = true;
      compressCss = false;
  } else {
      lineNos = false;
      compressCss = true;
  }

  return stylus(str)
    .set('filename', path)
    .set('linenos', lineNos)
    .set('compress', compressCss)
    .use(nib());

}
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));


// tidy markup
app.locals.pretty = false;


// express-flash message settings
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'add a phrase here',
  maxAge: 60000,
  cookie: { secure: true }
}));
app.use(flash());

app.use(express.static( __dirname + '/public') );  // location for static files


/*
 * Set up index route
 */
app.get('/', function (req, res){
  res.render('home', {
    title: 'node-starter'
  });
});

// temporary routes hack
app.get('/:page', function (req, res){
  var page = req.params.page;
  res.render(page, {
    title: page
  });
});

/**
 * 404 error handling
 */
app.use(function(req, res) {
  res.status(404);
  res.render('404', {
    title: "oh oh 404 - that's not here"
  });
});



/*
 * Start server
 */
app.listen(app.get('port'), function() {
  console.log("✔ app is listening on port:%d in %s mode", app.get('port'), app.settings.env);
});
