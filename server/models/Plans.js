const mongoose = require("mongoose");

const PlansSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    leadssearch:{
        type:Number,
    },    
    emailsearch:{
        type:Number,
    },
    mlps:{
        type:Number,
    },
    importcsv:{
        type:Boolean,
    },
})

const PlansModel = mongoose.model("plans",PlansSchema)
module.exports = PlansModel