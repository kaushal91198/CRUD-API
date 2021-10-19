const express = require('express')
const app = express()
const port =4000
const mongoose = require('mongoose')
const user = require("./models/Users");
const userPageRoutes= require('./routes/postRoutes')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/express',()=>{
    console.log('connected')
});





// adding the middlewares
app.use(express.json())

app.use('/user', userPageRoutes)

app.post('/',async (req, res) => {
    try {
        const userDetails= req.body
        const products = await user.find(userDetails)
        console.log(products)
        if(!products.length){ throw "please enter the correct details"}

        else{
          let token = jwt.sign( {id:products[0]._id},'secret',  { noTimestamp:true, expiresIn: '1h' });
          res.status(200)
          res.json({"Login": "Successfull","id":products[0]._id,"generatedToken":token})
        }
      } catch (error) {
        res.json({message:error})
      }
})


app.listen(port,()=>{
    console.log("Server running at http://localhost:4000")
})
