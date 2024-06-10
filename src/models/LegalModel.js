

const mongoose = require('mongoose');


const DataSchema = mongoose.Schema(
{
    des:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
},
{
    timestamps: true,
    versionKey: false
}
)

const LegalModel = mongoose.model('Legals',DataSchema);

module.exports = LegalModel;