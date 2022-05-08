var express = require('express');
const { redirect } = require('express/lib/response');
const model = require('../models/productScheme');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  model.find( (err, docs) =>{
    if(err){
      console.log(err);
    }else{
      console.log({data:docs});
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

router.post('/create', function(req, res, next){

  const data = req.body;

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

  model.remove({
    _id: id
  }, function(err){
    if(err) return console.log(err);
    res.redirect('/');
  });

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
