const http = require("http");
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
if (request.url === "/create-directory") {
fs.mkdir("content", (error, data) => {
    if (error) {
    response.end(err);
    } else {
    response.end("content folder created");
    }
});
    }
    
if (request.url === "/create-text" && request.method === "POST") {
let body = "";
request.on("data", function (data) {
    body += data.toString();
});
    
    
request.on("end", () => {
   
    fs.writeFile("randomText.txt", "What is all this!?", function (err) {
    if (err) {
        response.end(err);
    } else {
        response.end("randomText.txt created");
    }
    });
});
}
    
if (request.url === "/new-folder-and-file" && request.method === "POST") {
let body = "";
request.on("data", function (data) {
    body += data.toString();
});
    
request.on("end", () => {
  
    fs.readFile('randomText.txt', 'utf8' , (err, data) => {
    if (err) {
        response.error(error)
        return
    }
    
    fs.writeFile("content/verbage.txt",data, function (err) {
        if (err) {
        response.end(err);
        } else {
        response.end("verbage.txt created");
        }
    });
    });
});
    
setTimeout(function(){
    fs.unlink("./content/verbage.txt", () => {
    fs.rmdir("content", () => (console.log("content removed")));
    }) }, 7000);
}
})
.listen(3000, ()=> {
console.log("Server Started!!!");
});