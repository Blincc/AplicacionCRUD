const express = require ('express');
/* const { route } = require('./notes'); */
const router = express.Router();


/* peticiones */
router.get('/users/signin', (req, res) =>{
res.render('users/signin')
});

router.get('/users/signup', (req, res) =>{
    res.render('users/signup')
    });
     
router.post('/users/signup', (req, res) =>{
 const {name, email, password, confirm_password } = req.body;
 const errors = [];
 console.log(req.body);
 if(name.length <= 0){
     errors.push({text: 'Escriba un nombre de usuario'});
 }
 if(password != confirm_password){
     errors.push({text: 'Contraseñas no coinciden'});
 }
 if(password.length < 4){
     errors.push({text: 'La contraseña dede de ser mayor a 4 digitos'});
 }
 if (errors > 0){
     res.render(users/signup, {errors, name, email, password, confirm_password });
 } else{
    res.send('ok');

 }

 
});
module.exports = router;