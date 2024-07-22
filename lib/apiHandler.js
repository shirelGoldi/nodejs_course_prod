const http = require('http');
const url= require('url');

//Resourse database
// Resource database
const customers = [
    {
        id: 1,
        name: "John Doe",
        address: "123 Main St, Springfield",
        numberOfAccounts: 2,
        balance: 1500.75
    },
    {
        id: 2,
        name: "Jane Smith",
        address: "456 Oak St, Metropolis",
        numberOfAccounts: 1,
        balance: 2500.50
    },
    {
        id: 3,
        name: "Alice Johnson",
        address: "789 Pine St, Gotham",
        numberOfAccounts: 3,
        balance: 3500.00
    },
    {
        id: 4,
        name: "Bob Brown",
        address: "101 Maple St, Star City",
        numberOfAccounts: 4,
        balance: 4500.25
    },
    {
        id: 5,
        name: "Charlie Davis",
        address: "202 Birch St, Central City",
        numberOfAccounts: 1,
        balance: 5500.75
    },
    {
        id: 6,
        name: "Diana Evans",
        address: "303 Cedar St, Coast City",
        numberOfAccounts: 2,
        balance: 6500.50
    },
    {
        id: 7,
        name: "Ethan Foster",
        address: "404 Elm St, Bludhaven",
        numberOfAccounts: 3,
        balance: 7500.00
    },
    {
        id: 8,
        name: "Fiona Green",
        address: "505 Spruce St, Keystone City",
        numberOfAccounts: 4,
        balance: 8500.25
    },
    {
        id: 9,
        name: "George Harris",
        address: "606 Ash St, Smallville",
        numberOfAccounts: 1,
        balance: 9500.75
    },
    {
        id: 10,
        name: "Hannah Martin",
        address: "707 Walnut St, Fawcett City",
        numberOfAccounts: 2,
        balance: 10500.50
    },
    {
        id: 11,
        name: "Isaac Nelson",
        address: "808 Chestnut St, Hub City",
        numberOfAccounts: 3,
        balance: 11500.00
    },
    {
        id: 12,
        name: "Jackie O'Neill",
        address: "909 Poplar St, Midway City",
        numberOfAccounts: 4,
        balance: 12500.25
    },
    {
        id: 13,
        name: "Karen Phillips",
        address: "1010 Beech St, Ivy Town",
        numberOfAccounts: 1,
        balance: 13500.75
    },
    {
        id: 14,
        name: "Liam Quinn",
        address: "1111 Cypress St, Opal City",
        numberOfAccounts: 2,
        balance: 14500.50
    },
    {
        id: 15,
        name: "Megan Roberts",
        address: "1212 Holly St, Happy Harbor",
        numberOfAccounts: 3,
        balance: 15500.00
    },
    {
        id: 16,
        name: "Nathan Scott",
        address: "1313 Redwood St, Ivy City",
        numberOfAccounts: 4,
        balance: 16500.25
    },
    {
        id: 17,
        name: "Olivia Turner",
        address: "1414 Willow St, Monument Point",
        numberOfAccounts: 1,
        balance: 17500.75
    },
    {
        id: 18,
        name: "Patrick Underwood",
        address: "1515 Alder St, Platinum Flats",
        numberOfAccounts: 2,
        balance: 18500.50
    },
    {
        id: 19,
        name: "Quincy Vaughn",
        address: "1616 Sequoia St, New Carthage",
        numberOfAccounts: 3,
        balance: 19500.00
    },
    {
        id: 20,
        name: "Rachel White",
        address: "1717 Fir St, Coral City",
        numberOfAccounts: 4,
        balance: 20500.25
    }
];

const webSocket = require('ws');
const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');

//1-- create a Server
const handleApiRequest = (request, respone)=>
{
    //API
    //api/v1/customers- GET (all)




    //api/v1/customers {id}- GET (one)
    //qpi/v1/customers - post {body{name,addres...}}
    //qpi/v1/customers - put {body{name,addres...}}
    //qpi/v1/customers - delete

    //1. Brak-down URL to commponts
    const parseUrl= url.parse(request.url,true)
    const pathname = parseUrl.pathname;     // --> /qpi/v1/customers/{id}
    const method= request.method;           // --> GET

    const arrUrlParms= pathname.split('/'); //Break url to '/' parms
    const lastParm= arrUrlParms[arrUrlParms.length-1] ; //Extract id from url
    const lastLastParm= arrUrlParms[arrUrlParms.length-2] ;
    
    let route = '';
    let body ='';
    let customer = '';
    if (lastParm === 'customers' || lastLastParm === 'customers'){
        route = lastLastParm === 'customers' ? '--customers--x--' :  '--customers--';
    }
    console.log(`${route}${method}--`);
    switch (`${route}${method}--`){
        case '--customers--GET--':
            respone.writeHead(200,{'Content-Type' : 'application/json'});
            respone.end(JSON.stringify(customers));
            break;
        case '--customers--POST--':
                        request.on('data',chunk => body += chunk.toString());
                        request.on('end', ()=>{
                        //create unique id
                        const newID = customers.length + 1
                        const newCustomer = JSON.parse(body);
                        newCustomer.id= newID ;
                        //create the new resource
                        customers.push(newCustomer);
                        respone.writeHead(201,{'Content-Type' : 'application/json'});
                        respone.end(JSON.stringify(newCustomer));


                    });
            break;
        case '--customers--x--GET--':
                 customer = customers.find(c => c.id === parseInt(lastParm));
                if (customer){
                    respone.writeHead(200,{'content-type': 'application/json'});
                    respone.end(JSON.stringify(customer));
                }
                else{
                    respone.writeHead(404,{'content-type':'application/json'});
                    respone.end(JSON.stringify({message: `customer '{lastParm}' not found`})) ; 
                }
            break;
        case '--customers--x--PUT--':
                console.log('put');
                customer = customers.find(c=> c.id  === parseInt(lastParm));
                if(customer){
                    console.log(customer.id);                    
                    request.on('data',chunk => body += chunk.toString());
                    request.on('end', ()=>{
                        //create unique id                        
                        const cusToUp = JSON.parse(body);
                        console.log(cusToUp);
                        
                        for(let i=0 ; i< customers.length; i++){
                            if (customers[i].id === parseInt(lastParm))
                            {

                                customers[i].address= cusToUp.address;
                                console.log(customers[i]);
                               
                            }
                        }
                        //create the new resource
                        
                        respone.writeHead(200,{'Content-Type' : 'application/json'});
                        respone.end(JSON.stringify(cusToUp));


                    });
                }
            break;
        //case '--customers--x--DELETE--':
        //   break;
        default:
            respone.writeHead(404,{'content-type':'application/json'});
            respone.end(JSON.stringify({message: `customer '{lastParm}' not found`})) ; 


        
    }

/*
    if(lastParm=== 'customers' || lastLastParm === 'customers' ){   // without parm 
        if(lastParm === 'customers' ){
            if(method=== 'GET'){ // GET ALL
                respone.writeHead(200,{'Content-Type' : 'application/json'});
                respone.end(JSON.stringify(customers));

            } else if(method=== 'POST'){ //add
                    let body ='';
                    request.on('data',chunk => body += chunk.toString());
                    request.on('end', ()=>{
                        //create unique id
                        const newID = customers.length + 1
                        const newCustomer = JSON.parse(body);
                        newCustomer.id= newID ;
                        //create the new resource
                        customers.push(newCustomer);
                        respone.writeHead(201,{'Content-Type' : 'application/json'});
                        respone.end(JSON.stringify(newCustomer));


                    });




                   // respone.writeHead(500,{'Content-Type' : 'application/json'});
                   // respone.end(JSON.stringify({message: `server error, function not found !!!`}));
            }
        }
        else {
            if(method === 'GET'){ //GET {one}
                
                const customer = customers.find(c => c.id === parseInt(lastParm));
                if (customer){
                    respone.writeHead(200,{'content-type': 'application/json'});
                    respone.end(JSON.stringify(customer));
                }
                else{
                    respone.writeHead(404,{'content-type':'application/json'});
                    respone.end(JSON.stringify({message: `customer '{lastParm}' not found`})) ; 
                }

            }else if(method === 'PUT'){// UPDATE
                console.log('put');
                const customer = customers.find(c=> c.id  === parseInt(lastParm));
                if(customer){
                    console.log(customer.id);
                    let body ='';
                    request.on('data',chunk => body += chunk.toString());
                    request.on('end', ()=>{
                        //create unique id                        
                        const cusToUp = JSON.parse(body);
                        console.log(cusToUp);
                        
                        for(let i=0 ; i< customers.length; i++){
                            if (customers[i].id === parseInt(lastParm))
                            {

                                customers[i].address= cusToUp.address;
                                console.log(customers[i]);
                               
                            }
                        }
                        //create the new resource
                        
                        respone.writeHead(200,{'Content-Type' : 'application/json'});
                        respone.end(JSON.stringify(cusToUp));


                    });
                   
                }else{
                    respone.writeHead(404,{'Content-Type' : 'application/json'});
                    respone.end(JSON.stringify({message: `Customer  not found!`}));
                }
                
            } else if(method === 'DELETE'){

            }
    }
        

    }else{ 
        
        respone.writeHead(404, {'Content-Type': 'application/json'});
        respone.end(JSON.stringify({message: 'API endpoint not found!'}));

    }



  */  

    //2. 

    //3.Respon
};

//2 -- Initialize the web server


//3 -- Start the server
module.exports= {handleApiRequest};


