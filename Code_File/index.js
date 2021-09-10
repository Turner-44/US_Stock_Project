const express = require('express');
const fs = require('fs');
const app = express();

app.use('', express.static(__dirname + '/Public'));
//app.use(express.static(__dirname + '/stockSearch.js'));

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(4000, (err) => {
    if(err) {
        console.log('Something went wrong ops', err)
    } else {
        console.log('Server is running...');  
    }
    
});