const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().required().min(5).max(50),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(5).max(50)
    };

    return Joi.validate(customer,schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;