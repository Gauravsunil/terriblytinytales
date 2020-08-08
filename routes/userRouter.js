const express=require('express');
const https = require('https');
const bodyParser=require('body-parser');
const Data=require('../models/number')
const userRouter=express.Router();
const fs=require('fs');
userRouter.get('/number/:number',(req,res,next)=>{

    // const file1 = fs.createWriteStream("data.txt");
    // const request = https.get("https://terriblytinytales.com/test.txt", function(response) {
    //   response.pipe(file1);
    // });
    console.log(`get data = ${req.params.number}`);
    const data={
        num:req.params.number
    }
    Data.create(data)
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err)
    })
    const file='data.txt';
    // read file from current directory
    
    fs.readFile(file, 'utf8', function (err, data) {
      var wordsArray = data.split(/\s+/);
      var wordsMap = {};
      var i=0;
      wordsArray.forEach(function (key) {
        if(i<req.params.number){
        if (wordsMap.hasOwnProperty(key)) {
          wordsMap[key]++;
        } else {
          wordsMap[key] = 1;
        }
        i++;
        }
      })
      var finalWordsArray = [];
      finalWordsArray = Object.keys(wordsMap).map(function(key) {
        return {
          name: key,
          total: wordsMap[key]
        };
      });
      finalWordsArray.sort(function(a, b) {
        return b.total - a.total;
      });
    console.log(finalWordsArray);
    res.send(finalWordsArray)
    res.end(finalWordsArray);
    });

})

module.exports=userRouter;