
const mongoose = require("mongoose");
const thingschmema = mongoose.Schema({
    moisture: { type: String, required: true },
    temp: { type:String, required: true },
    //userId: { type: String, required: true },
    humidity: { type: String, required: true },
    pump_status:{type:Number,required:true},
   // created_at:{type:new Date(), required:true}
    updated: { type: Date, default: Date.now(), required:false},
});

module.exports = mongoose.model('SensorDta',thingschmema);