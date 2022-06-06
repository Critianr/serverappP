const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const app = express()
const authRoutes = require('./routes/auth.routes')


//configuraciones
app.set('port', process.env.PORT || 4000);
// mongoose.connect('mongodb+srv://root:toor@cluster0.q692i.mongodb.net/Cluster0?retryWrites=true&w=majority')
   mongoose.connect('mongodb://root:toor@cluster0-shard-00-00.q692i.mongodb.net:27017,cluster0-shard-00-01.q692i.mongodb.net:27017,cluster0-shard-00-02.q692i.mongodb.net:27017/?ssl=true&replicaSet=atlas-v23fkp-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(db => console.log('mi base Connected'))
  .catch(err => console.log(err))
  app.use('/documentation', express.static(path.join(__dirname, '../doc/')))
//middlewares 
console.log(process.env.JWT_SECRET)

app.use(morgan('dev'));
app.use(cors());
// app.use((req, res, next)=>{
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Coow-Headntrol-Allers", "Origin, X-Requested-With, ContentType, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
//  });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//rutas

app.use('/auth', authRoutes)

app.listen(app.get('port'), ()=>{
    console.log('Server started', app.get('port'));
});