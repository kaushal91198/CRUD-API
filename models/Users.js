const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/nodeapi',()=>{
//     console.log('connected')
// });

const Users = new mongoose.Schema({
        userName:String,
        password:String,
        phone:Number
})

module.exports = mongoose.model('user',Users)



