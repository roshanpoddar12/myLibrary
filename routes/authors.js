const express = require('express');
const router = express.Router();
const Author = require('./../models/author')

//All authors route
router.get('/', async(req,res)=>{
    let searchOption={};
    if(req.query.name != null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name,'i');
    }
    try{
        const allAuthors =await Author.find(searchOption);
        res.render("authors/index",{
            authors: allAuthors,
            searchOption: req.query
        });
    }
     catch{
        res.redirect('/');
     }
    
})

//New authors route 
router.get('/new',(req,res)=>{
    res.render("authors/new");
})

// Create a author route
router.post('/',async(req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor =await author.save();
        res.redirect('authors');
    }catch(err){
        let locals = {
            author: author,
            errorMsg: 'Error while creating Author'
        };
        res.render('authors/new',locals);
    }
})

module.exports = router;