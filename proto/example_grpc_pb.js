// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var example_pb = require('./example_pb.js');

function serialize_myservice_DataRequest(arg) {
  if (!(arg instanceof example_pb.DataRequest)) {
    throw new Error('Expected argument of type myservice.DataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_myservice_DataRequest(buffer_arg) {
  return example_pb.DataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_myservice_DataResponse(arg) {
  if (!(arg instanceof example_pb.DataResponse)) {
    throw new Error('Expected argument of type myservice.DataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_myservice_DataResponse(buffer_arg) {
  return example_pb.DataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MyServiceService = exports.MyServiceService = {
  getData: {
    path: '/myservice.MyService/GetData',
    requestStream: false,
    responseStream: false,
    requestType: example_pb.DataRequest,
    responseType: example_pb.DataResponse,
    requestSerialize: serialize_myservice_DataRequest,
    requestDeserialize: deserialize_myservice_DataRequest,
    responseSerialize: serialize_myservice_DataResponse,
    responseDeserialize: deserialize_myservice_DataResponse,
  },
};

exports.MyServiceClient = grpc.makeGenericClientConstructor(MyServiceService);
