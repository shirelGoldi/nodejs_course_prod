let ws;
//let message;
let value; 

function connectionWebSocket(){
    ws= new WebSocket('wss://nodejs-course-prod-x5gx.onrender.com');

    //Evening
    ws.onopen= ()=>{

        console.log('connected to  WS server');
    };

    ws.onmessage= (event)=>{
        const chat= document.getElementById('chat');
        const messageDIV= document.createElement('div');

        const reader = new FileReader();
        reader.onload= ()=>{
            //console.log(reader.result) ;
            messageDIV.textContent = reader.result;
            chat.appendChild(messageDIV);
        };

        if(event.data instanceof Blob){
            reader.readAsText(event.data);
        }

        


    };

    ws.onclose= ()=>{
        
    };


}

function sendMessage(){
    
    if(ws.readyState === WebSocket.OPEN){
        const input = document.getElementById('message');
        console.log(input)
        ws.send(input.value);
        input.value= ' ';
        
        // Client send message to server
        //ws.send('Hello from client');
        
    }
        
}

//function updateMessage(value){
//    message = value; 
//}
connectionWebSocket();

