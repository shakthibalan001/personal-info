const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')
const login = require('./schema/loginschema')
const dataform = require('./schema/dataformschema')

const app = express();

const mdb ="mongodb+srv://personala-data:444@cluster0.ddqzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;"

mongoose.connect(mdb)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

app.use (morgan('dev'));

app.set('view engine', 'ejs');


app.listen(3000, () => console.log('Server running on http://localhost:3000'));

app.get('/', (req, res) => res.render('login'));

app.get('/login', (req, res) => res.render('login'));

app.get('/logout', (req,res) => res.redirect ('/login'))

app.get('/about', (req, res) => res.render('about'));

app.get('/details', (req, res) => res.render('details'));

app.get('/dataform', (req, res) => res.render('dataform'))

app.get('/personal-info', (req, res) => res.redirect('/data'))


/* for storing the mail and users data ofc */

app.post('/submit', async(req, res) => {
    const {email , password} = req.body
    const similarname = await login.findOne({email:email})
        if(similarname)
        {
            res.redirect('/')
        }
    const data = {email , password}

    console.log(data);

    await login.insertMany([data])  
        res.redirect('/data')
})

/* end for storing the mail and users data ofc */


app.post('/data',async(req, res) => {
    const {name,phone,nationality,address,age,gender,fatherName,motherName}=req.body

    const data = new dataform({name,phone,nationality,address,age,gender,fatherName,motherName})

    console.log(data);

    await data.save()    
        .then(result => {
            res.redirect('/data')
        })

})

app.get('/data' , (req,res) => {
    dataform.find()
        .then(result => {
            console.log(result)
            res.render('personal-info',{personalInfos : result})
        })
})

  
app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
        dataform.findByIdAndDelete(id)
            .then(result => {
                res.json({ redirect: '/data' });
                console.log('item succesfully deleted')               
            })
})

