/**
 * Created by sadra on 11/12/17.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id : { type: String, unique: true},
    mobile : String,
    serial_number : String,
    ref_number : String,
    created_at: Date,
    updated_at: Date,
});

userSchema.pre('save', function(next) {

    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    let self = this;
    User.find({mobile: self.mobile, serial_number: self.serial_number}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            // console.log('user exists: ', self.user_id);
        }
    });

});


const User = mongoose.model('users', userSchema);

module.exports = User;