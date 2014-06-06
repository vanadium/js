// This file was auto-generated by the veyron vdl tool.
// Source: cache.vdl

package sample

import (
	// The non-user imports are prefixed with "_gen_" to prevent collisions.
	_gen_veyron2 "veyron2"
	_gen_context "veyron2/context"
	_gen_ipc "veyron2/ipc"
	_gen_naming "veyron2/naming"
	_gen_rt "veyron2/rt"
	_gen_vdl "veyron2/vdl"
	_gen_wiretype "veyron2/wiretype"
)

// KeyValuePair is a representation of a cached key and value pair.
type KeyValuePair struct {
	Key   string
	Value _gen_vdl.Any
}

// A Cache service mimics the memcache interface.
// Cache is the interface the client binds and uses.
// Cache_ExcludingUniversal is the interface without internal framework-added methods
// to enable embedding without method collisions.  Not to be used directly by clients.
type Cache_ExcludingUniversal interface {
	// Set sets a value for a key.
	Set(ctx _gen_context.T, key string, value _gen_vdl.Any, opts ..._gen_ipc.CallOpt) (err error)
	// Get returns the value for a key.  If the value is not found, returns
	// a not found error.
	Get(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply _gen_vdl.Any, err error)
	// Same as Get, but casts the return argument to an byte.
	GetAsByte(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply byte, err error)
	// Same as Get, but casts the return argument to an int32.
	GetAsInt32(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply int32, err error)
	// Same as Get, but casts the return argument to an int64.
	GetAsInt64(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply int64, err error)
	// Same as Get, but casts the return argument to an uint32.
	GetAsUint32(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply uint32, err error)
	// Same as Get, but casts the return argument to an uint64.
	GetAsUint64(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply uint64, err error)
	// Same as Get, but casts the return argument to an float32.
	GetAsFloat32(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply float32, err error)
	// Same as Get, but casts the return argument to an float64.
	GetAsFloat64(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply float64, err error)
	// Same as Get, but casts the return argument to a string.
	GetAsString(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply string, err error)
	// Same as Get, but casts the return argument to a bool.
	GetAsBool(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply bool, err error)
	// Same as Get, but casts the return argument to an error.
	GetAsError(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply error, err error)
	// AsMap returns the full contents of the cache as a map.
	AsMap(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply map[string]_gen_vdl.Any, err error)
	// KeyValuePairs returns the full contents of the cache as a slice of pairs.
	KeyValuePairs(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply []KeyValuePair, err error)
	// MostRecentSet returns the key and value and the timestamp for the most
	// recent set operation
	// TODO(bprosnitz) support type types and change time to native time type
	MostRecentSet(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (value KeyValuePair, time int64, err error)
	// KeyPage indexes into the keys (in alphanumerically sorted order) and
	// returns the indexth page of 10 keys.
	KeyPage(ctx _gen_context.T, index int64, opts ..._gen_ipc.CallOpt) (reply [10]string, err error)
	// Size returns the total number of entries in the cache.
	Size(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply int64, err error)
	// MultiGet sets up a stream that allows fetching multiple keys.
	MultiGet(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply CacheMultiGetStream, err error)
}
type Cache interface {
	_gen_ipc.UniversalServiceMethods
	Cache_ExcludingUniversal
}

// CacheService is the interface the server implements.
type CacheService interface {

	// Set sets a value for a key.
	Set(context _gen_ipc.ServerContext, key string, value _gen_vdl.Any) (err error)
	// Get returns the value for a key.  If the value is not found, returns
	// a not found error.
	Get(context _gen_ipc.ServerContext, key string) (reply _gen_vdl.Any, err error)
	// Same as Get, but casts the return argument to an byte.
	GetAsByte(context _gen_ipc.ServerContext, key string) (reply byte, err error)
	// Same as Get, but casts the return argument to an int32.
	GetAsInt32(context _gen_ipc.ServerContext, key string) (reply int32, err error)
	// Same as Get, but casts the return argument to an int64.
	GetAsInt64(context _gen_ipc.ServerContext, key string) (reply int64, err error)
	// Same as Get, but casts the return argument to an uint32.
	GetAsUint32(context _gen_ipc.ServerContext, key string) (reply uint32, err error)
	// Same as Get, but casts the return argument to an uint64.
	GetAsUint64(context _gen_ipc.ServerContext, key string) (reply uint64, err error)
	// Same as Get, but casts the return argument to an float32.
	GetAsFloat32(context _gen_ipc.ServerContext, key string) (reply float32, err error)
	// Same as Get, but casts the return argument to an float64.
	GetAsFloat64(context _gen_ipc.ServerContext, key string) (reply float64, err error)
	// Same as Get, but casts the return argument to a string.
	GetAsString(context _gen_ipc.ServerContext, key string) (reply string, err error)
	// Same as Get, but casts the return argument to a bool.
	GetAsBool(context _gen_ipc.ServerContext, key string) (reply bool, err error)
	// Same as Get, but casts the return argument to an error.
	GetAsError(context _gen_ipc.ServerContext, key string) (reply error, err error)
	// AsMap returns the full contents of the cache as a map.
	AsMap(context _gen_ipc.ServerContext) (reply map[string]_gen_vdl.Any, err error)
	// KeyValuePairs returns the full contents of the cache as a slice of pairs.
	KeyValuePairs(context _gen_ipc.ServerContext) (reply []KeyValuePair, err error)
	// MostRecentSet returns the key and value and the timestamp for the most
	// recent set operation
	// TODO(bprosnitz) support type types and change time to native time type
	MostRecentSet(context _gen_ipc.ServerContext) (value KeyValuePair, time int64, err error)
	// KeyPage indexes into the keys (in alphanumerically sorted order) and
	// returns the indexth page of 10 keys.
	KeyPage(context _gen_ipc.ServerContext, index int64) (reply [10]string, err error)
	// Size returns the total number of entries in the cache.
	Size(context _gen_ipc.ServerContext) (reply int64, err error)
	// MultiGet sets up a stream that allows fetching multiple keys.
	MultiGet(context _gen_ipc.ServerContext, stream CacheServiceMultiGetStream) (err error)
}

// CacheMultiGetStream is the interface for streaming responses of the method
// MultiGet in the service interface Cache.
type CacheMultiGetStream interface {

	// Send places the item onto the output stream, blocking if there is no buffer
	// space available.
	Send(item string) error

	// CloseSend indicates to the server that no more items will be sent; server
	// Recv calls will receive io.EOF after all sent items.  Subsequent calls to
	// Send on the client will fail.  This is an optional call - it's used by
	// streaming clients that need the server to receive the io.EOF terminator.
	CloseSend() error

	// Recv returns the next item in the input stream, blocking until
	// an item is available.  Returns io.EOF to indicate graceful end of input.
	Recv() (item _gen_vdl.Any, err error)

	// Finish closes the stream and returns the positional return values for
	// call.
	Finish() (err error)

	// Cancel cancels the RPC, notifying the server to stop processing.
	Cancel()
}

// Implementation of the CacheMultiGetStream interface that is not exported.
type implCacheMultiGetStream struct {
	clientCall _gen_ipc.Call
}

func (c *implCacheMultiGetStream) Send(item string) error {
	return c.clientCall.Send(item)
}

func (c *implCacheMultiGetStream) CloseSend() error {
	return c.clientCall.CloseSend()
}

func (c *implCacheMultiGetStream) Recv() (item _gen_vdl.Any, err error) {
	err = c.clientCall.Recv(&item)
	return
}

func (c *implCacheMultiGetStream) Finish() (err error) {
	if ierr := c.clientCall.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (c *implCacheMultiGetStream) Cancel() {
	c.clientCall.Cancel()
}

// CacheServiceMultiGetStream is the interface for streaming responses of the method
// MultiGet in the service interface Cache.
type CacheServiceMultiGetStream interface {
	// Send places the item onto the output stream, blocking if there is no buffer
	// space available.
	Send(item _gen_vdl.Any) error

	// Recv fills itemptr with the next item in the input stream, blocking until
	// an item is available.  Returns io.EOF to indicate graceful end of input.
	Recv() (item string, err error)
}

// Implementation of the CacheServiceMultiGetStream interface that is not exported.
type implCacheServiceMultiGetStream struct {
	serverCall _gen_ipc.ServerCall
}

func (s *implCacheServiceMultiGetStream) Send(item _gen_vdl.Any) error {
	return s.serverCall.Send(item)
}

func (s *implCacheServiceMultiGetStream) Recv() (item string, err error) {
	err = s.serverCall.Recv(&item)
	return
}

// BindCache returns the client stub implementing the Cache
// interface.
//
// If no _gen_ipc.Client is specified, the default _gen_ipc.Client in the
// global Runtime is used.
func BindCache(name string, opts ..._gen_ipc.BindOpt) (Cache, error) {
	var client _gen_ipc.Client
	switch len(opts) {
	case 0:
		client = _gen_rt.R().Client()
	case 1:
		switch o := opts[0].(type) {
		case _gen_veyron2.Runtime:
			client = o.Client()
		case _gen_ipc.Client:
			client = o
		default:
			return nil, _gen_vdl.ErrUnrecognizedOption
		}
	default:
		return nil, _gen_vdl.ErrTooManyOptionsToBind
	}
	stub := &clientStubCache{client: client, name: name}

	return stub, nil
}

// NewServerCache creates a new server stub.
//
// It takes a regular server implementing the CacheService
// interface, and returns a new server stub.
func NewServerCache(server CacheService) interface{} {
	return &ServerStubCache{
		service: server,
	}
}

// clientStubCache implements Cache.
type clientStubCache struct {
	client _gen_ipc.Client
	name   string
}

func (__gen_c *clientStubCache) Set(ctx _gen_context.T, key string, value _gen_vdl.Any, opts ..._gen_ipc.CallOpt) (err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "Set", []interface{}{key, value}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) Get(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply _gen_vdl.Any, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "Get", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsByte(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply byte, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsByte", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsInt32(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply int32, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsInt32", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsInt64(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply int64, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsInt64", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsUint32(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply uint32, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsUint32", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsUint64(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply uint64, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsUint64", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsFloat32(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply float32, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsFloat32", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsFloat64(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply float64, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsFloat64", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsString(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply string, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsString", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsBool(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply bool, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsBool", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetAsError(ctx _gen_context.T, key string, opts ..._gen_ipc.CallOpt) (reply error, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetAsError", []interface{}{key}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) AsMap(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply map[string]_gen_vdl.Any, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "AsMap", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) KeyValuePairs(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply []KeyValuePair, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "KeyValuePairs", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) MostRecentSet(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (value KeyValuePair, time int64, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "MostRecentSet", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&value, &time, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) KeyPage(ctx _gen_context.T, index int64, opts ..._gen_ipc.CallOpt) (reply [10]string, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "KeyPage", []interface{}{index}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) Size(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply int64, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "Size", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) MultiGet(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply CacheMultiGetStream, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "MultiGet", nil, opts...); err != nil {
		return
	}
	reply = &implCacheMultiGetStream{clientCall: call}
	return
}

func (__gen_c *clientStubCache) UnresolveStep(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply []string, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "UnresolveStep", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) Signature(ctx _gen_context.T, opts ..._gen_ipc.CallOpt) (reply _gen_ipc.ServiceSignature, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "Signature", nil, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

func (__gen_c *clientStubCache) GetMethodTags(ctx _gen_context.T, method string, opts ..._gen_ipc.CallOpt) (reply []interface{}, err error) {
	var call _gen_ipc.Call
	if call, err = __gen_c.client.StartCall(ctx, __gen_c.name, "GetMethodTags", []interface{}{method}, opts...); err != nil {
		return
	}
	if ierr := call.Finish(&reply, &err); ierr != nil {
		err = ierr
	}
	return
}

// ServerStubCache wraps a server that implements
// CacheService and provides an object that satisfies
// the requirements of veyron2/ipc.ReflectInvoker.
type ServerStubCache struct {
	service CacheService
}

func (__gen_s *ServerStubCache) GetMethodTags(call _gen_ipc.ServerCall, method string) ([]interface{}, error) {
	// TODO(bprosnitz) GetMethodTags() will be replaces with Signature().
	// Note: This exhibits some weird behavior like returning a nil error if the method isn't found.
	// This will change when it is replaced with Signature().
	switch method {
	case "Set":
		return []interface{}{}, nil
	case "Get":
		return []interface{}{}, nil
	case "GetAsByte":
		return []interface{}{}, nil
	case "GetAsInt32":
		return []interface{}{}, nil
	case "GetAsInt64":
		return []interface{}{}, nil
	case "GetAsUint32":
		return []interface{}{}, nil
	case "GetAsUint64":
		return []interface{}{}, nil
	case "GetAsFloat32":
		return []interface{}{}, nil
	case "GetAsFloat64":
		return []interface{}{}, nil
	case "GetAsString":
		return []interface{}{}, nil
	case "GetAsBool":
		return []interface{}{}, nil
	case "GetAsError":
		return []interface{}{}, nil
	case "AsMap":
		return []interface{}{}, nil
	case "KeyValuePairs":
		return []interface{}{}, nil
	case "MostRecentSet":
		return []interface{}{}, nil
	case "KeyPage":
		return []interface{}{}, nil
	case "Size":
		return []interface{}{}, nil
	case "MultiGet":
		return []interface{}{}, nil
	default:
		return nil, nil
	}
}

func (__gen_s *ServerStubCache) Signature(call _gen_ipc.ServerCall) (_gen_ipc.ServiceSignature, error) {
	result := _gen_ipc.ServiceSignature{Methods: make(map[string]_gen_ipc.MethodSignature)}
	result.Methods["AsMap"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 68},
			{Name: "", Type: 66},
		},
	}
	result.Methods["Get"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 65},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsBool"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 2},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsByte"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 67},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsError"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 66},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsFloat32"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 25},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsFloat64"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 26},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsInt32"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 36},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsInt64"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 37},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsString"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 3},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsUint32"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 52},
			{Name: "", Type: 66},
		},
	}
	result.Methods["GetAsUint64"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 53},
			{Name: "", Type: 66},
		},
	}
	result.Methods["KeyPage"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "index", Type: 37},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 71},
			{Name: "", Type: 66},
		},
	}
	result.Methods["KeyValuePairs"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 70},
			{Name: "", Type: 66},
		},
	}
	result.Methods["MostRecentSet"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "value", Type: 69},
			{Name: "time", Type: 37},
			{Name: "err", Type: 66},
		},
	}
	result.Methods["MultiGet"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 66},
		},
		InStream:  3,
		OutStream: 65,
	}
	result.Methods["Set"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{
			{Name: "key", Type: 3},
			{Name: "value", Type: 65},
		},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 66},
		},
	}
	result.Methods["Size"] = _gen_ipc.MethodSignature{
		InArgs: []_gen_ipc.MethodArgument{},
		OutArgs: []_gen_ipc.MethodArgument{
			{Name: "", Type: 37},
			{Name: "", Type: 66},
		},
	}

	result.TypeDefs = []_gen_vdl.Any{
		_gen_wiretype.NamedPrimitiveType{Type: 0x1, Name: "anydata", Tags: []string(nil)}, _gen_wiretype.NamedPrimitiveType{Type: 0x1, Name: "error", Tags: []string(nil)}, _gen_wiretype.NamedPrimitiveType{Type: 0x32, Name: "byte", Tags: []string(nil)}, _gen_wiretype.MapType{Key: 0x3, Elem: 0x41, Name: "", Tags: []string(nil)}, _gen_wiretype.StructType{
			[]_gen_wiretype.FieldType{
				_gen_wiretype.FieldType{Type: 0x3, Name: "Key"},
				_gen_wiretype.FieldType{Type: 0x41, Name: "Value"},
			},
			"veyron/examples/wspr_sample.KeyValuePair", []string(nil)},
		_gen_wiretype.SliceType{Elem: 0x45, Name: "", Tags: []string(nil)}, _gen_wiretype.ArrayType{Elem: 0x3, Len: 0xa, Name: "", Tags: []string(nil)}}

	return result, nil
}

func (__gen_s *ServerStubCache) UnresolveStep(call _gen_ipc.ServerCall) (reply []string, err error) {
	if unresolver, ok := __gen_s.service.(_gen_ipc.Unresolver); ok {
		return unresolver.UnresolveStep(call)
	}
	if call.Server() == nil {
		return
	}
	var published []string
	if published, err = call.Server().Published(); err != nil || published == nil {
		return
	}
	reply = make([]string, len(published))
	for i, p := range published {
		reply[i] = _gen_naming.Join(p, call.Name())
	}
	return
}

func (__gen_s *ServerStubCache) Set(call _gen_ipc.ServerCall, key string, value _gen_vdl.Any) (err error) {
	err = __gen_s.service.Set(call, key, value)
	return
}

func (__gen_s *ServerStubCache) Get(call _gen_ipc.ServerCall, key string) (reply _gen_vdl.Any, err error) {
	reply, err = __gen_s.service.Get(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsByte(call _gen_ipc.ServerCall, key string) (reply byte, err error) {
	reply, err = __gen_s.service.GetAsByte(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsInt32(call _gen_ipc.ServerCall, key string) (reply int32, err error) {
	reply, err = __gen_s.service.GetAsInt32(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsInt64(call _gen_ipc.ServerCall, key string) (reply int64, err error) {
	reply, err = __gen_s.service.GetAsInt64(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsUint32(call _gen_ipc.ServerCall, key string) (reply uint32, err error) {
	reply, err = __gen_s.service.GetAsUint32(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsUint64(call _gen_ipc.ServerCall, key string) (reply uint64, err error) {
	reply, err = __gen_s.service.GetAsUint64(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsFloat32(call _gen_ipc.ServerCall, key string) (reply float32, err error) {
	reply, err = __gen_s.service.GetAsFloat32(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsFloat64(call _gen_ipc.ServerCall, key string) (reply float64, err error) {
	reply, err = __gen_s.service.GetAsFloat64(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsString(call _gen_ipc.ServerCall, key string) (reply string, err error) {
	reply, err = __gen_s.service.GetAsString(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsBool(call _gen_ipc.ServerCall, key string) (reply bool, err error) {
	reply, err = __gen_s.service.GetAsBool(call, key)
	return
}

func (__gen_s *ServerStubCache) GetAsError(call _gen_ipc.ServerCall, key string) (reply error, err error) {
	reply, err = __gen_s.service.GetAsError(call, key)
	return
}

func (__gen_s *ServerStubCache) AsMap(call _gen_ipc.ServerCall) (reply map[string]_gen_vdl.Any, err error) {
	reply, err = __gen_s.service.AsMap(call)
	return
}

func (__gen_s *ServerStubCache) KeyValuePairs(call _gen_ipc.ServerCall) (reply []KeyValuePair, err error) {
	reply, err = __gen_s.service.KeyValuePairs(call)
	return
}

func (__gen_s *ServerStubCache) MostRecentSet(call _gen_ipc.ServerCall) (value KeyValuePair, time int64, err error) {
	value, time, err = __gen_s.service.MostRecentSet(call)
	return
}

func (__gen_s *ServerStubCache) KeyPage(call _gen_ipc.ServerCall, index int64) (reply [10]string, err error) {
	reply, err = __gen_s.service.KeyPage(call, index)
	return
}

func (__gen_s *ServerStubCache) Size(call _gen_ipc.ServerCall) (reply int64, err error) {
	reply, err = __gen_s.service.Size(call)
	return
}

func (__gen_s *ServerStubCache) MultiGet(call _gen_ipc.ServerCall) (err error) {
	stream := &implCacheServiceMultiGetStream{serverCall: call}
	err = __gen_s.service.MultiGet(call, stream)
	return
}
