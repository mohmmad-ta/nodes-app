const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    userCreated: {
        type: Object,
        require:true
    }
});

module.exports = mongoose.model('Product', productSchema);