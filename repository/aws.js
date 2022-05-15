const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

class imageRepository {

    constructor(){
        
        this.s3 = new AWS.S3({
            accessKeyId: "AKIA4ZC5XYKPFSZS6QXZ",
            secretAccessKey: "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",
        });

    }

    async listBuckets(){
        this.s3.listBuckets({}, (err, data) =>{
            if (err) throw err;
            return console.log(data);
        });
        
    }

    async listObjects(){
        
        const bucketParams = {
            Bucket : 's9mybucket',
        };

        this.s3.listObjects(bucketParams, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data);
            }
        });
    }

    async uploadImage(name, imagen, type){

        const key = `${name}.${type.split('/')[1]}`;

        return new Promise((resolve, reject) =>{
            const params = {
                Bucket: 's9mybucket',
                Key: key,
                Body: imagen,
                ACL: 'public-read',
                contentType: type
            }
    
            this.s3.upload(params, (err, data) =>{
                if(err){
                    reject(err);
                }
                resolve(`https://s9mybucket.s3.amazonaws.com/${key}`);
            });
    
        })
    }

    async deleteImage(key){

        const params = {
            Bucket: 's9mybucket',
            Key: key
        }

        this.s3.deleteObject(params, (err, data)=>{
            if (err) throw err;
            console.log('Objeto eliminado: ' + key);
        })

    }

}

    
module.exports = imageRepository