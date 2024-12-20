const mongoose = require('mongoose');

const schema = mongoose.Schema

const personalInfoSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    fatherName: {
        type: String,
        required: true,
        trim: true
    },
    motherName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


const dataform = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = dataform;
