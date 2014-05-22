/*
 * Module dependencies
 */
var express = require( 'express' ),
    stylus = require( 'stylus' ),
    nib = require( 'nib' ), 
    path = require('path'),
    app = express( );




/*
Express settings
*/
app.set( 'port', process.env.PORT || 3000);        // set port
app.set( 'views', path.join(__dirname, 'views'));  // set views location
app.set( 'view engine', 'jade');                   // set jade as view engine
app.use(express.bodyParser());                     // use body parser to break down requests
app.use(express.errorHandler());                   // use express' pretty error handling

if (process.env.NODE_ENV === 'development'){       // log requests to console in development
  app.use(express.logger('dev'));   
}
// stylus compile  settings
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('linenos', true)
    .set('compress', false) 
    .use(nib());
}
// use stylus
app.use(stylus.middleware(
  { 
    src: __dirname + '/public',
    compile: compile
  }
));
// tidy markup
app.locals.pretty = true;
app.use(express.static( __dirname + '/public') );  // location for static files


/*
 * Set up index route
 */
app.get('/', function (req, res){
  res.render('home', {
    title: 'node-starter'
  });
});

// routes hack
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