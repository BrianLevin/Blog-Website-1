//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =  require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//empty array which will hold posts
let posts= [];

// home route
app.get("/", function(req,res){

  res.render("home", {
    // key value pair to pass over to ejs
startingContent: homeStartingContent,
// render posts arrays
posts: posts
});
console.log(posts);

});


// home route
app.get("/about", function(req,res){

  res.render("about", {
    // key value pair to pass over to ejs
aboutContent: aboutContent

  });

});



// home route
app.get("/contact", function(req,res){

  res.render("contact", {
    // key value pair to pass over to ejs
contactContent: contactContent

  });

});
// get compose page
app.get("/compose", function(req,res){

  res.render("compose", {
  
  });

});
// data which will be subbmitted and posted
app.post("/compose", function (req,res){
     // data which is  routed and posted from the form
     const post = {
      title: req.body.postTitle,
      content: req.body.postBody
    };
  // push elements into the post array
    posts.push(post);
  // redirect to homepage after posts are p
    res.redirect("/");
})


// router which will go to individual post pages
app.get ("/posts/:postName", function(req,res) {
// req.params= access to all values with a colen in front of it
// lodash to convert everything typed in search bar to view post  to lowercase
const requestedTitle= _.lowerCase(req.params.postName);
// loop through all posts in post array
posts.forEach(function(post){

  // saved  for each stored post
  const storedTitle= _.lowerCase(post.title);

  // check if they match

  if(storedTitle ===  requestedTitle) {

    console.log("match found");
  } else{
    console.log("not a match");
  }

});

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});