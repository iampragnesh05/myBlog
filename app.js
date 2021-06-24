const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');


const startingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

let posts = [];


app.get("/", (req, res) => {
    res.render('home.ejs',{
        startingContent: startingContent,
        posts: posts,
        storedTitle: _.kebabCase(_.lowerCase(posts.title))
    })
})
app.get("/about", (req, res) => {
    res.render('about.ejs')
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.get("/thankyou", (req,res) => {
    res.render("thankyou.ejs")
})

app.get('/compose', (req, res) => {
    res.render("compose")
   })

   app.post("/contact", (req, res) => {
    const name = req.body.name;
    res.render('thankyou', {
        name: name
    })
      res.redirect("/thankyou")
  })
  

app.post("/compose", (req, res) => {
   const post = {
       title: req.body.postTitle,
       content: req.body.postBody
   };
   
   posts.push(post);
   res.redirect("/")
})

app.get("/posts/:postName", (req,res) => {
    const reqTitle = req.params.postName

    posts.forEach(post => {
        const storedTitle = _.kebabCase(_.lowerCase(post.title));

        if(reqTitle === storedTitle){
            res.render('posts', {
                title: post.title,
                content: post.content
            })
        }else{
            console.log("Some problem")
        }
    })
})








app.listen(port, () =>{
console.log("Server started on port 3000")
})