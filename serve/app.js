const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

app.use(session({
    secret:'jj',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000*60*60
    }
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(router)
app.use('/',express.static(__dirname+'/views'))
app.set('views',__dirname+'/views')
app.engine('html',require('express-art-template'))


app.listen('4000',()=>{
    console.log('4000running...')
})