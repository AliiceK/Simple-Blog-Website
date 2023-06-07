const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');



//express app
const app = express();

//connect to database
const dbURI ='mongodb+srv://firstauthuser:kkh6ceCBq9KpDqhR@Cluster0.u8d8atn.mongodb.net/cluster0?retryWrites=true&w=majority';

//what i chnaged from the link : name and pass of teh dataabse an teh name of the db

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log('error'));

app.set('view engine', 'ejs');


// listen for requests

 // returns an instance of the server


//middleware and staticfiles
app.use(morgan('dev'));
app.use(express.static('public')); //to be able to import css files
app.use(express.urlencoded({ extended: true }));




app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'snippet of my new blog',
        body : 'more about my new blog',
    });

    blog.save() // saving it to the database ( blog's collection)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('647f1e1f85af9fa2a12d24cc')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

app.use((req,res,next) =>{
    console.log("new request made");
    console.log("host", req.hostname);
    console.log("path", req.path);
    console.log("method", req.method);
    next(); // importnat to put next to that we move on with the rest
})

app.get('/', (req, res) => {
    res.redirect('/blogs')

//     const blogs = [
// {title: "The first blog", snippet : "This is the sinppet of the first blog"},
// {title: "The second blog", snippet: "This is teh snippet of the second blog"},];
//     // res.sendFile('./views/index.html', {root: __dirname});
//     res.render('index', { blogs});
//     // i want these files to be displayed
});

app.get('/blogs', (req,res) => {
    Blog.find().sort({createdAt: -1}) //to be able to post from newest to oldest
        .then((result)=> {
            res.render('index', {blogs:result});
        })
        .catch((error) => {
            console.log(error);
        })
})

app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);
    console.log(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((error) => {
        console.log(error);
    })
})

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', {blog: result, title : 'Blog Details'}); 
    })
    .catch(err => {
        console.log(err);
    })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/about', (req,res)=> {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about')
});

app.get('/about',(req,res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create')
})

app.use((req, res) => {
    // res.sendFile("./views/404error.html", {root: __dirname});
    res.status(404).render('404');
})

// this has to be the last
