const express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


//use res.render to load up an ejs view file

app.get('/mail', function(req, res){
    console.log('you be at mail page');
    var mailType = req.query.mailType;
    var weight = req.query.weight;
    var result = 0;

    var price = calculatePrice(mailType, weight);
    res.render('pages/mail', {price:price});
});

function calculatePrice(type, weight)
{
    var base = (weight - 1) * 0.21;
    var price = 0;
    if (type == "stamped") {
        price = base + 0.50;
    }
    else if (type == "metered") {
        price = base + .47;
    }
    else if (type == "flats") {
        price = base + 1.0;
    }
    else if (type == "retail") {
        if (weight < 4) {
            base = 3.50;
            price = base;
        }
        else if (weight < 8) {
            price = base + 0.25;
        }
        else if (weight == 9) {
            price = 4.10;
        }
        else if  (weight == 10) {
            price = 4.45;
        }
        else if (weight == 11) {
            price = 4.80;
        }
        else if (weight == 12) {
            price = 5.15;
        }
        else {
            price = 5.50;
        }
    }
    return parseFloat(Math.round(price * 100) / 100).toFixed(2);
}

