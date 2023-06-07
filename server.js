const http = require('http');
const fs = require('fs');
const _ = require("lodash");

/* request will have the url of the webiste */
const server = http.createServer((request, response) => {
    //loadash

    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();

    //set reponse header

    response.setHeader('Content-Type', 'text/html'); // to return html files
    // response.write('<p>hello mfs <p>'); // send this message back to the browser
    // response.end();

    let path = './views/';
    switch(request.url) {
        case '/':
            path+= 'index.html';
            response.statusCode = 200 // this means success
            break;
        case '/about':
            path+="about.html"
            response.statusCode = 200 // this means success
            break;
        case '/about-us':
            response.statusCode = 301 // thisis to redirect (the abot me page has been moved to about)
            response.setHeader('Location', '/about'); //redirect back to the about page
            response.end();
        default:
            path+= "404error.html";
            response.statusCode = 404 // this means error
            break;
    }


    // send an html file
    fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            response.end();
        } else {
            
            response.write(data);
            response.end();
        }

        
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});