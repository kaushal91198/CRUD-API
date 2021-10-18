const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/nodeapi',()=>{
//     console.log('connected')
// });

const Post = new mongoose.Schema({
        title:String,
        description:String,
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
          }
})

module.exports = mongoose.model('post',Post)