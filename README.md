# protobuf-nodejs-example

## **Step 1: Install Protocol Buffers Compiler (protoc)**

Before we begin, let's install the `protoc` compiler, which is used to compile `.proto` files into JavaScript code.

**For Windows:**

1. Visit the Protocol Buffers GitHub releases page for Windows: https://github.com/protocolbuffers/protobuf/releases
2. Download the latest `protoc-{version}-win32.zip` file.
3. Extract the contents of the zip file to a directory.
4. Add the `bin` directory to your system's PATH.

**For macOS:**

You can use Homebrew to install `protobuf`:

1. Open Terminal.
2. Run the following command:

   ```shell
   brew install protobuf
   ```

## **Step 2: Define Your .proto File**

Create a `.proto` file that defines your service and message types. Here's an example:

```proto
syntax = "proto3";

package myservice;

service MyService {
    rpc GetData (DataRequest) returns (DataResponse);
}

message DataRequest {
    string message = 1;
}

message DataResponse {
    string reply = 1;
}
```

## **Step 3: Generate JavaScript Code**

To generate JavaScript code from your `.proto` file, you need to install the `grpc-tools` package globally using `npm`:

```shell
npm install -g grpc-tools
```

Now, you can use the `grpc_tools_node_protoc` command to generate JavaScript files:

```shell
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./proto --grpc_out=./proto --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` path/to/your/protobuf.proto
```

Replace `path/to/your/protobuf.proto` with the actual path to your `.proto` file.

Example:

```shell
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./proto --grpc_out=./proto --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` ./example.proto
```

## **Step 4: Implement the Service**

With the generated JavaScript code, you can implement your gRPC service. Here's an example:

```javascript
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./example.proto", {
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
  },
});

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log("Starting server");
server.start();
console.log("Server started");
```

This code sets up a gRPC server that listens on port 50051 and implements the `GetData` RPC method.

## **Step 5: Compile and Run**

Compile and run your Node.js gRPC server:

```shell
node your_server_file.js
```

Now, you have a gRPC service running locally.

Please adjust the file paths and package names to match your project's structure. This example provides a basic overview of generating a Protocol Buffers service using Node.js, and it can be extended as needed for your specific use case.
