const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./example.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const myservice = grpc.loadPackageDefinition(packageDefinition).myservice;

const server = new grpc.Server();

server.addService(myservice.MyService.service, { 
    getData: (dataRequest, callback) => {
        const response = { reply: `Hello, ${dataRequest.request.message}!` };
        callback(null, response);
    }
 });

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log("Starting server")
server.start();
console.log("Server started")
