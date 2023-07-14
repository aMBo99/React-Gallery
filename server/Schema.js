const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    id: {
        type: String,
    }
})

module.exports = mongoose.model('Photo', photoSchema);