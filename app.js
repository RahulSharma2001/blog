//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
 const _ = require("lodash");

const homeStartingContent = "This is an awesome and simple website, where you can post whatever you want to share, you can read your content whenever you want and also you can read some one else content which maybe useful to you . Btw this website is for fun, so post whatever you want with this amazing & simple website , Use '+ sign' to post after you can also VISIT POST INDIVIDUALLY by typing /post/your-specific-post-title with current URL or clicking on Read more. see ya , I'm waiting for your post 😃";
const aboutContent = "Hiii, I'm a Rahul and currently I am doing my bachelor degree in computer science, I really love to  make websites, it's makes me happy. Thank you for visiting .";
const app = express();

app.set('view engine', 'ejs');

 const array = [];
 let flag = false;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home",{
    firstContent: homeStartingContent,
    posts: array
  });

});

app.get("/about", function(req,res){
res.render("about",{
  AboutContent:aboutContent

});

});


app.get("/contact", function(req,res){
res.render("contact");

});

app.get("/compose", function(req,res){
res.render("compose")


})

app.get("/posts/:id",function(req,res){
array.forEach(function(post){
  if(_.lowerCase(req.params.id)=== _.lowerCase(post.titleContent)){
    res.render("post",{
      titleContent:post.titleContent,
      composeContent:post.composeContent
    });
  }
})

})

app.post("/compose", function(req,res){

  let cont = req.body.input;
  let title = req.body.title;
let size = cont.length;
if(size>100)
    flag=true;
  let data = {
    titleContent: title,
    composeContent:cont,
    contentSize: flag
  }
  array.push(data);

  res.redirect("/");

})









app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
