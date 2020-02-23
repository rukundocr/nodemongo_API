
const mongoose = require("mongoose");
const thingschmema = mongoose.Schema({
    moisture: { type: String, required: true },
    temp: { type:String, required: true },
    //userId: { type: String, required: true },
    humidity: { type: Number, required: true },
    motor_status:{type:Number,required:true},
   // created_at:{type:new Date(), required:true}
    updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('SensorDta',thingschmema);