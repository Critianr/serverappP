const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { check } = require('express-validator')


router.get('/profile', authController.profile)

router.post('/register',[
        check('name', 'Nombre no valido, minimo 2 caracteres, maximo 40 caracteres').isLength({min: 2, max: 40}),
        check('email', 'Email no valido').isEmail(),
        check('password', 'Contraseña debil').isStrongPassword()
    ],
    authController.register
)


/**
 * @api {post} /login Ingreso de usuarios
 * @apiName Login
 * @apiGroup AUTH
 * @apiDescription ingreso de usuarios a la plataforma usando email y password 
 * @apiParam {prueba@prueba.com} email E-mail del usuario que ingrea
 * @apiParam {Prueba150} password Contraseña del usuario
 */
router.post('/login', authController.login)

module.exports = router
