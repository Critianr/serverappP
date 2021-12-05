const express = require('express');
const router = express.Router();
const authservice = require('../services/auth.service');
const ticketSchema = require('../models/tickets');
const User = require('../models/user');
const { token } = require('morgan');
// peticion get
// // res se envia
router.get('/tickets', async (req, res)=>{
    const ticketdb = await ticketSchema.find();
    res.send(ticketdb);
    console.log(ticketdb)
});

// peticion post req/ el que me trae la informacion
router.post('/nuevoticket', async (req, res)=>{
    const body = req.body; 
    const ticket = await new ticketSchema(body);
    await ticket.save();
    res.json({status: 'task saved'});
    console.log(ticket)
});

router.put('/tickets/placa/:placa', async (req, res)=>{
    const placa = req.params.placa;
    const body = req.body;
    try{
    const item = await ticketSchema.findOneAndUpdate({placa:placa}, body,{new:true}    );
        //  await item.save();
    // const item = await ticketSchema.save({placa:placa}, body, {new:true}); //findOneAndUpdate
    res.json(item);
    console.log(item)
    }catch (error){
        console.log(error)
        return res.status(400).json({
            mensaje:'ocurrio un error',
            error: error
        })
    }
});

router.get('/tickets/:id', async(req, res) => {
    const _id = req.params.id;
    try {
    const notaDB = await ticketSchema.findOne({_id});
    res.json(notaDB);
    } catch (error) {
    return res.status(400).json({
    mensaje: 'Ocurrio un error',
    error
    })
    }
   });
router.get('/tickets/placa/:placa', async (req, res)=>{
    const placa = req.params.placa;
    try{ 
        const item = await ticketSchema.find({placa: placa});
        res.send(item);
        console.log(item)
    }catch (error) {
        return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error: error
    })
    }
});
// router.get('/tickets/:id', async (req, res)=>{
//     const item = await ticketSchema.findOne(req.params.id);
//     res.send(item);
//     console.log(item)
// });

// ---------------------------------------- auth route
// router.post('/login', async (req, res)=>{
//     try{
//         const {email, password}= req.body;
//         if(!email || !password ) {
//             return res.status(400).json('email adn pass required');
//         }
//         let token = await authservice.login(req.body);
//         if(token){
//            res.status(token.code).json(token);
//         }
//         }catch(error){
//         res.send(error);
//     }
// });
// router.post('/register', async (req, res) => {
//     try{
//         const user = new User(req.body);
//         const userData = await authservice.register(user);
//         res.send(userData);
//     }catch(error){
//         res.send(error)
//     }
// });
module.exports = router;