var express = require('express');
var router = express.Router();
let database = require('../database/core');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/verify/:mobile', function(req, res, next) {

    let mobile = req.params.mobile;
    if(mobile === undefined){
        res.status(400).send({
            result: "Bad request.",
            message: "There is no mobile number."
        });
        return
    }
    if(mobile.length > 11){
        res.status(400).send({
            result: "Bad request.",
            message: "Mobile number must contains 11 digit"
        });
        return
    }

    database.getUser(mobile).then((result) => {
        res.status(200).send({
            user_exist: true,
            result: result
        });
    }).catch((err) => {
        res.status(err.status).send(err);
    });

});

router.post('/add', function(req, res, next) {

    let mobile = req.body.mobile;
    let serial_number = req.body.serial_number;
    let ref_number = req.body.ref_number;

    if(mobile === undefined){
        res.status(400).send({
            result: "Bad request.",
            message: "There is no mobile number."
        });
        return
    }
    if(mobile.length > 11){
        res.status(400).send({
            result: "Bad request.",
            message: "Mobile number must contains 11 digit"
        });
        return
    }
    if(serial_number === undefined){
        res.status(400).send({
            result: "Bad request.",
            message: "There is no serial number."
        });
        return
    }
    if(ref_number === undefined){
        res.status(400).send({
            result: "Bad request.",
            message: "There is no ref number."
        });
        return
    }

    let user = {
        mobile: mobile,
        serial_number: serial_number,
        ref_number: ref_number
    };

    database.addUser(user).then((result) => {
        res.status(200).send({
            user_add: true,
            message: result
        });
    }).catch((err) => {
        res.status(err.status).send(err);
    });

});


module.exports = router;
