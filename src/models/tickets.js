const mongoose = require('mongoose');
// const timeZone = require('mongoose-timezone');
const Schema = mongoose.Schema;
const moment = require('moment');
var current = new Date();
const timeStamp = new Date(Date.UTC(current.getFullYear(), 
current.getMonth(),current.getDate(),current.getHours(), 
current.getMinutes(),current.getSeconds(), current.getMilliseconds()));

const ticketSchema = new Schema({
    id: Number,
    placa: String,
    tiempoInicio: { type: String, default: Date },
    TipoVehiculo: String,
    Puesto: Number,
    tiempoFinal: {  type: String,  default: Date},
    valorP: Number,
    Tarifa: Number,
    // activo: { type: Boolean, default: true},
    // { type: Date, default:timeStamp }
});
// Schema.plugin(timeZone, { paths: ['tiempoInicio', 'subDocument.subDate'] });
module.exports = mongoose.model('tickets', ticketSchema );
//  'Tarifas', tarifaSchema, 'UserLog', LoginSchema );
