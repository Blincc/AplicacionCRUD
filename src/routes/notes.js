const express = require ('express');
const router = express.Router(); 

/* gracias a esta linea de codigo puego agregar ,eliminar,o modificar un dato  */
const Note = require ('../models/Note');

router.get('/notes/add', (req, res) =>{
    
res.render('notes/new-equipo');
});

router.post('/notes/new-equipo', async(req, res) =>{
    console.log(req.body);
   const {title, description} = req.body;
   const errors = [];
   if(!title){
       errors.push({ text: 'Escriba porfavor una orden de Servicio'});
   }
   if(!description){
       errors.push({text: 'Escriba porfavor una Descripcion del Equipo'});
   }
   if(errors.length > 0){
       res.render('notes/new-equipo',{
           errors,
           title,
           description
       });

   } else{
     const newNote = new Note({title, description});
      await newNote.save();
      req.flash('success_msg', 'Equipo nuevo agregado  satisfactoriamente');
     res.redirect('/notes');
   }
    
});

router.get('/notes', async (req, res) => {
   const notes = await Note.find().sort({date: 'desc'});
   res.render('notes/all-notes', { notes });

});

router.get('/notes/edit/:id', async (req, res) =>{
    
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note',{ note });

});

router.put('/notes/edit-note/:id', async (req, res)=>{
    console.log(req.body);
    const{ title, description}= req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description})
    req.flash('success_msg', 'Equipo actualizado satisfactoriamente')
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) =>{
    console.log(req.body);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Equipo eliminado satisfactoriamente')
    res.redirect('/notes');
});





module.exports = router;