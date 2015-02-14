// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../.././vom/vom');





var time = require('./../vdl/vdlroot/src/time/time');
var uniqueid = require('./../uniqueid/uniqueid');

module.exports = {};



// Types:
var _type1 = new vom.Type();
var _type2 = new vom.Type();
var _typeAnnotation = new vom.Type();
var _typeRequest = new vom.Type();
var _typeResponse = new vom.Type();
var _typeSpanRecord = new vom.Type();
var _typeTraceFlags = new vom.Type();
var _typeTraceRecord = new vom.Type();
_type1.kind = vom.Kind.LIST;
_type1.name = "";
_type1.elem = _typeSpanRecord;
_type2.kind = vom.Kind.LIST;
_type2.name = "";
_type2.elem = _typeAnnotation;
_typeAnnotation.kind = vom.Kind.STRUCT;
_typeAnnotation.name = "v.io/core/veyron2/vtrace.Annotation";
_typeAnnotation.fields = [{name: "When", type: new time.Time()._type}, {name: "Message", type: vom.Types.STRING}];
_typeRequest.kind = vom.Kind.STRUCT;
_typeRequest.name = "v.io/core/veyron2/vtrace.Request";
_typeRequest.fields = [{name: "SpanID", type: new uniqueid.Id()._type}, {name: "TraceID", type: new uniqueid.Id()._type}, {name: "Flags", type: _typeTraceFlags}];
_typeResponse.kind = vom.Kind.STRUCT;
_typeResponse.name = "v.io/core/veyron2/vtrace.Response";
_typeResponse.fields = [{name: "Flags", type: _typeTraceFlags}, {name: "Trace", type: _typeTraceRecord}];
_typeSpanRecord.kind = vom.Kind.STRUCT;
_typeSpanRecord.name = "v.io/core/veyron2/vtrace.SpanRecord";
_typeSpanRecord.fields = [{name: "ID", type: new uniqueid.Id()._type}, {name: "Parent", type: new uniqueid.Id()._type}, {name: "Name", type: vom.Types.STRING}, {name: "Start", type: new time.Time()._type}, {name: "End", type: new time.Time()._type}, {name: "Annotations", type: _type2}];
_typeTraceFlags.kind = vom.Kind.INT32;
_typeTraceFlags.name = "v.io/core/veyron2/vtrace.TraceFlags";
_typeTraceRecord.kind = vom.Kind.STRUCT;
_typeTraceRecord.name = "v.io/core/veyron2/vtrace.TraceRecord";
_typeTraceRecord.fields = [{name: "ID", type: new uniqueid.Id()._type}, {name: "Spans", type: _type1}];
module.exports.Annotation = (vom.Registry.lookupOrCreateConstructor(_typeAnnotation));
module.exports.Request = (vom.Registry.lookupOrCreateConstructor(_typeRequest));
module.exports.Response = (vom.Registry.lookupOrCreateConstructor(_typeResponse));
module.exports.SpanRecord = (vom.Registry.lookupOrCreateConstructor(_typeSpanRecord));
module.exports.TraceFlags = (vom.Registry.lookupOrCreateConstructor(_typeTraceFlags));
module.exports.TraceRecord = (vom.Registry.lookupOrCreateConstructor(_typeTraceRecord));




// Consts:

  module.exports.Empty = new (vom.Registry.lookupOrCreateConstructor(_typeTraceFlags))(0);

  module.exports.CollectInMemory = new (vom.Registry.lookupOrCreateConstructor(_typeTraceFlags))(1);



// Errors:



// Services:

   
 


