var express = require('express');
const model = require('../models/productScheme');
const imageRepository = require('../repository/aws');
const aws = new imageRepository();
var router = express.Router();
const multer  = require('multer');
const { S3 } = require('aws-sdk');
const upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {

  model.find( (err, docs) =>{
    if(err){
      console.log(err);
    }else{
      res.render('index', {title: 'Sistema-Productos', docs: docs});
    }
  });

});

router.get('/update:id', function(req, res, next) {


  const id = req.params.id

  model.findById(id, (err, docs)=>{
    if(err) return console.log(err);
    console.log(docs);
    res.render('update', { title: 'Sistema-Productos', docs: docs });
  });


});

router.post('/uploadImage:codigo',upload.single('imagen'), async(req, res, next) =>{
  const id = req.params.codigo
  const imagen = req.file.buffer;
  const type = req.file.mimetype
  const key = `${id}.${type.split('/')[1]}`
  //const imageUrl = `https://s9mybucket.s3.amazonaws.com/${key}`
  await aws.uploadImage(id,imagen,type);
  model.findOneAndUpdate({codigo: id}, {imagen: key}, (err, response)=>{
    if(err) return console.log(err);
  });

  return res.redirect('/');
});

router.post('/updateImage:codigo',upload.single('imagenupdate'), async(req, res, next) =>{
  const id = req.params.codigo
  const imagen = req.file.buffer;
  const type = req.file.mimetype
  const key = `${id}.${type.split('/')[1]}`
  const keydelete = req.body.imagendelete;

  await aws.deleteImage(keydelete)

  await aws.uploadImage(id,imagen,type);

  model.findOneAndUpdate({codigo: id}, {imagen: key}, (err, response)=>{
    if(err) return console.log(err);
  });

  return res.redirect('/');
});

router.post('/create', function(req, res, next){

  const data = {
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    empresa: req.body.empresa,
    tipo: req.body.tipo,
    precio: req.body.precio,
    imagen: '',
  }

  model.create(data, (err, docs) => {
    if(err){
      console.log(err);
    }else{
      console.log({data:docs});
      res.redirect('/')
    }
  });

});

router.post('/delete:id', function(req, res, next){

  const id = req.params.id;
  const key = req.body.imagendelete;

  await aws.deleteImage(key);
  
  model.remove({
    _id: id
  }, function(err){
    if(err) return console.log(err);
  });

  return res.redirect('/');

});

router.post('/updateproduct:id', function(req, res){

  const id = req.params.id;

  const filter = { _id : id};
  const dataUpdate = {
    codigo : req.body.codigo,
    nombre: req.body.nombre,
    empresa: req.body.empresa,
    tipo: req.body.tipo,
    precio: req.body.precio,
  };

  model.findOneAndUpdate(filter, dataUpdate, (err, response)=>{
    if(err) return console.log(err);

    res.redirect('/');

  });

});

module.exports = router;
