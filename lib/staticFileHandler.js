// 1. import http
const http = require('http');
const path = require('path');
const fs = require('fs');


//2. create server
const serveStaticFile = (reqest, respone) => {
    //3.1 Parse URL 
    //console.log(`reqest url ${reqest.url} ` )

    const url = reqest.url === '/' ? 'index.html' : reqest.url;

    //מיקום קובץ 
    const filepath = path.join(__dirname, '../public', url); 
    console.log(`filepath:  ${filepath}`);

    const fileEnd  = path.extname(filepath) ; 
    console.log(`fileEnd:   ${fileEnd}`);

    let contentType ;

    switch(fileEnd){
        case 'html': contentType = {'Content-Type' : 'text/html' }; break;
        case  'css': contentType = {'Content-Type' : 'text/css' }; break;
        case  'png': contentType = {'Content-Type' : 'image/png' }; break;
        default: break;
    }

    //

    //בדיקה אם הקובץ נימצא
    fs.readFile(filepath, (error, data) => {

        if (error) {
            if (error.code === 'ENOENT') {
                const errorFile = path.join(__dirname, '../public', '404.html')
                fs.readFile(errorFile,(err,contant)=>{
                    respone.writeHead(404, 'text/html')
                    respone.end(contant)

                });
            }
            else {
                respone.writeHead(500)
                respone.end(`server error ${error.code}`)
            }
            
            

        }
        else {
            respone.writeHead(200,contentType)
            respone.end(data, 'utf8')
        }
            


    });

    //if(reqest.url === '/')
    // index
    //else


    //3.2 if no path return index
    //3.3 else look for file
    //3.4 if file no found = error
    //3.5 if file find= return file 

    //respone.end('hello word')
};


module.exports = {serveStaticFile};



