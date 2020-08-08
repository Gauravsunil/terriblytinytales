const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const NumberSchema=new Schema({
    num:{
        type:Number,
        required:true
    }
})

module.exports=Data=mongoose.model('number',NumberSchema)