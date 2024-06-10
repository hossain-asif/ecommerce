

const mongoose = require('mongoose');


const DataSchema = mongoose.Schema(
{
    name:{
        type: String,
        unique: true,
        required: true
    },
    des:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const FeaturesModel = mongoose.model('features',DataSchema);

module.exports = FeaturesModel;