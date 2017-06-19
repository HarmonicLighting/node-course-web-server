const LISTENPORT = process.env.PORT || 3000;

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(error)=>{
    if (error) {
      console.log('Error');
    }
  });
  next();
});

/*
app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});
*/

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About page',
  });
});

app.get('/portfolio',(req,res)=>{
  res.render('portfolio.hbs',{
    pageTitle: 'Portfolio Page',
  });
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my brand new NodeJS test webpage!',
    listenport: LISTENPORT
  });
});

// bad - send back JSON with error message
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Bad request!'
  });
});


app.listen(LISTENPORT,()=>{
  console.log('Server is up on port '+LISTENPORT);
});
