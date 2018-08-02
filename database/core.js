const mongoose = require('mongoose');
let User = require('./model/user');
const configs = require('../configs.js');


//Mongo Connection
mongoose.Promise = global.Promise;
async function run() {
    await mongoose.connect('mongodb://'+configs.mongo.url+'/'+configs.mongo.db_name, { useMongoClient: true });

    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    const doc = await Test.create({ name: 'Val' });
    console.log('Mongo connection Result: '+doc);
}
run().catch(error => console.error(error.stack));


let addUser = (user) => {
    return new Promise(function (resolve, reject) {

        let newUser = new User({
            mobile: user.mobile,
            serial_number: user.serial_number,
            ref_number: user.ref_number
        });

        getUser(newUser.mobile).then((exist) => {
            reject({
                result: "User is exist",
                user: exist.user,
                status: 403
            })
        }).catch(() => {
            newUser.save()
                .then(function (message) {
                    resolve({
                        user: message
                    });
                }).catch(function (err) {
                reject({
                    result: "Error while adding user.",
                    message: err,
                    status: 500
                });
            });
        })
    })
};

let getUser = (mobile) => {
    return new Promise(function (resolve, reject) {

        User.find({mobile: mobile}).then(function (user) {
            if(user.length === 0){
                reject({
                    message: "User not found!",
                    status: 404
                });
            }else{
                resolve({
                    message: "The user is exist.",
                    user: user[0],
                })
            }
        }).catch(function (err) {
            reject({
                result: "Error while finding user.",
                message: err,
                status: 500
            });
        });

    })
};



module.exports = { addUser, getUser};