const mongoose = require('mongoose');
const password = '3dIvYTqRw5hcEtpR';
const dbname = 'sistemas';
const uri =  `mongodb+srv://JosephPuma:${password}@cluster0.bslu6.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = () => {

    const connect = ()=>{
        mongoose.connect(
           uri, 
           {
              useNewUrlParser: true, 
              useUnifiedTopology: true,
              keepAlive: true
            },
            (err) => {
                if(err){ 
                    console.log('Error en conexion a BD...!!!');
                }else{
                    console.log('Conexion Correcta..........!!!')
                }
            }
        );
    }

    connect();
};