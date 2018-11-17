var express = require('express');
var app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');

//use res.render to load up an ejs view file

//index page
app.get('/', function(req, res) {
    var drinks = [
        { name : 'Dr. Pepper',  tastiness : 4},
        { name : 'Water', tastiness : 2},
        { name : 'Milk', tastiness : 3}
    ];
    var tagline = "You'll forget how you did this after a week or two";
    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

//about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/form', function(req, res) {
    res.render('pages/form');
});
app.get('/math', function(req, res){
   console.log('you be at math page');
    var operation = req.query.operation;
    var operand1 = req.query.operand1;
    var operand2 = req.query.operand2;
    var result;
    switch (operation) {
        case "Divide":
            result = operand1 / operand2;
            break;
        case "Multiply":
            result = operand1 * operand2;
            break;
        case "Add":
            result = operand1 + operand2;
            break;
        case "Subtract":
            result = operand1 - operand2;
            break;
        default:
            result = "YOU LOSE";
            break;
    }
    console.log(result);
    res.render('pages/math', {result:result});
});

app.listen(8080);
console.log('8080 is the magic port');
