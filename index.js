//const mysql = require('mysql');
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose= require('mongoose');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const Intama = require ('./model/thing.js');
const SensorData = require ('./model/sensor.js');
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(cors())
app.listen(port,()=>console.log(`server listening on port ${port}`));
//database connnection 
  mongoose.connect('mongodb+srv://rukundo:N0HtpmtxjnR2vYE8@cluster0-bg7kr.mongodb.net/test?retryWrites=true',{ useUnifiedTopology: true, useNewUrlParser: true})
//mongoose.connect('mongodb://localhost:27017/stuffdb',{ useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    console.log('Successfully connected to local MongoDB )!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB !');
    console.error(error);
  });

 //get all employee in the table 
 app.get('/employee',(req,res)=>{
 
     Intama.find().then(
          (things) => {
            res.status(200).json(things);
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );

 });
 // get specific employee based on id 
 app.get('/employee/:id',(req,res,next)=>{
     Intama.findOne({
          _id: req.params.id
        }).then(
          (intama) => {
            res.status(200).json(intama);
          }
        ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
   });


   // delete specific items 
   app.delete('/employee/:id',(req,res,next)=>{
     Intama.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
  
   });
   // post a new  thing in db
   app.post('/employee',(req,res,next)=>{
      
   const intama = new Intama({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email: req.body.email,
    phone : req.body.phone,
    address: req.body.address,
    city : req.body.city,
    state: req.body.state
    

   });
   intama.save().then(
     () => {
       res.status(201).json({
         message: 'Post saved successfully!'
       });
     }
   ).catch(
     (error) => {
       res.status(400).json({
         error: error
       });
     }
   );
 });

 // post sensor data
 app.post('/post',(req,res,next)=>{
      
  const sensordata = new SensorData({
   moisture : req.body.moisture,
   temp : req.body.temp,
   humidity: req.body.humidity,
   pump_status: req.body.pump_status,
   updated:Date.now()
   
  });
  sensordata.save().then(
    () => {
      res.status(201).json({
        message: 'Sensor Data saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
//get last sensor data feed
app.get('/getlatest',(req,res)=>{
  SensorData.find().sort({updated:-1}).limit(1)
  .then((data)=>{
    res.json(data).status(200);
  }).catch((error)=>{
    res.json({message:error});
  });
})

//get all sensor data feeds
app.get('/getall',(req,res)=>{
  SensorData.find().sort({updated:-1})
  .then((data)=>{
    res.json(data).status(200);
  }).catch((error)=>{
    res.json({message:error});
  });
})
//delete sensor data 
app.delete('/data/:id',(req,res,next)=>{
  SensorData.deleteOne({_id: req.params.id}).then(
       () => {
         res.status(200).json({
           message: 'Deleted!'
         });
       }
     ).catch(
       (error) => {
         res.status(400).json({
           error: error
         });
       }
     );
});
//delete sensor data records 
app.delete('/data',(req,res,next)=>{
  SensorData.remove().then(
       () => {
         res.status(200).json({
           message: 'Deleted!'
         });
       }
     ).catch(
       (error) => {
         res.status(400).json({
           error: error
         });
       }
     );

});


//update data with specific id 
   app.put('/edit/:id', (req,res,next)=>{
     
     const intama = new Intama({
          _id: req.params.id,
          firstname : req.body.firstname,
          lastname : req.body.lastname,
          email: req.body.email,
          phone : req.body.phone,
          address: req.body.address,
          city : req.body.city,
          state: req.body.state
        });
        Intama.updateOne({_id: req.params.id}, intama).then(
          () => {
            res.status(201).json({
              message: 'Thing updated successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
 });


