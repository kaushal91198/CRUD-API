const express = require('express')
const Router = express.Router() //type of this is function
const Post = require("../models/Post");
var jwt = require('jsonwebtoken')

//Adding the middlewares
var loginMiddleware  = function(req,res,next){
try {
    let token=req.headers.authorization
    jwt.verify(token, 'secret');
    const decoded =  jwt.decode(token,"secret")
    req.user = decoded
} catch (error) {
    console.log(error)
    return res.json({"message":'you need to login to access this page'})
}
next()
}
Router.use(loginMiddleware)


//Read the all the post
Router.get('/', async (req, res) => {
    try {
        const userid = req.user.id
        const posts = await Post.find({user_id:userid});
        if(!posts.length){throw "You have not uploaded any post."}
        return res.json(posts);
      } catch (error) {
        return res.json({ message: error });
      }
}) 



//Read the particular post
Router.get('/:postId', async (req, res) => {
  try {
      const id = req.params.postId
      const userid = req.user.id
      const posts = await Post.findOne({_id:id,user_id:userid});
      return res.json(posts);
    } catch (error) {
      return res.json({ message: error });
    }
})
//Search page
Router.get('/:title',async (req,res)=>{
    try{
        const userid = req.user.id
        const title = req.params.title
        const posts = await Post.find({title:title,user_id:userid});
        if(!posts.length){ throw `There is no result related to ${title}`}
        return res.json(posts)
    } catch(error){
      return res.json({ message: error });
    }

//Create the post
Router.post('/',async (req, res) => {
    const post = new Post({
            title:req.body.title,
            description:req.body.description,
            user_id:req.user.id
      });
    
      try {
        const savedPost = await post.save();
        if(savedPost===null){throw error}
        return res.json(savedPost);
      } catch (error) {
        return res.json({ message: error });
      }
  })


  //Updating the post
Router.put("/:postId", async (req, res) => {
    try {
      const id = req.params.postId
      const userid = req.user.id
        const post = {
            title:req.body.title,
            description:req.body.description
        }

        const updatedPost = await Post.findOneAndUpdate({_id:id,user_id:userid},post);
        if(updatedPost===null){throw error}
        return res.json(updatedPost);
      } catch (error) {
        return res.json({ message: error });
      }
})


 //Delete the post
Router.delete("/:postId", async (req, res) => {
    try {
        const id = req.params.postId
        const userid = req.user.id
        const removePost = await Post.findOneAndDelete({_id:id,user_id:userid});
        if(removePost===null){throw error}
        return res.json (removePost);
      } catch (error) {
        return res.json({ message: error });
      }
}) 


module.exports = Router

// console.log(typeof app)