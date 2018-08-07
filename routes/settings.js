var express = require('express');
var router = express.Router();
const fs = require('fs');
const configs = require('../configs');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(404).send('What do you want!?');
});

router.get('/version', function(req, res, next) {

    let settings = JSON.parse(fs.readFileSync('settings.json'));
    let version = settings.version;

    res.status(200).send({
        version: version
    });

});

router.post('/version', function(req, res, next) {

    let password = req.body.password;
    let version = req.body.version;

    if(password === undefined){
        res.status(400).send({
            result: "Bad request.",
            message: "There is no version."
        });
        return
    }
    if(password !== configs.api_secret){
        res.status(403).send({
            result: "Not Allowed.",
            message: "Check secrets, please."
        });
        return
    }
    if(version === undefined){
        res.status(400).send({
            result: "Bad request.",
            message: "There is no ref number."
        });
        return;
    }

    let settings = JSON.parse(fs.readFileSync('settings.json'));
    settings.version = version;
    let data = JSON.stringify(settings);
    fs.writeFileSync('settings.json', data);

    res.status(200).send({
        version: version
    });

});


module.exports = router;
