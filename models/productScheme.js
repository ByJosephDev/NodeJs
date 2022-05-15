const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({

    codigo: {
        type: String,
        unique: true,
        required : true
    },
    nombre:{
        type: String
    },
    empresa:{
        type: String
    },
    tipo:{
        type: String
    },
    precio:{
        type: String
    },
    imagen:{
        type: String
    }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('product', ProductScheme);