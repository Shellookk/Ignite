import http from 'http'

const server = http.createServer((request, response)=>{
    return response.end("hello world");
});

server.listen(3333);
