const http = require('http');
const webSocket = require('ws');
const path = require('path');
const fs = require('fs');

//1-- create a Server

const chatHandler = server =>{


const wss = new webSocket.Server({server});
// handeling Client Connections 
wss.on('connection',ws=>{
    ws.on('message',message=>{
        console.log(`recived : ${message}`);

        wss.clients.forEach(c => {
            if(c.readyState === webSocket.OPEN){
                c.send(message);
            }

        }
            
        )
    })
    //send connection message
    console.log('connecting to server')
    ws.send('welcome  the chat')
});

}

module.exports= {chatHandler};

//3 -- Start the server



