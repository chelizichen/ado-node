var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// lib/constant/constant.ts
var CONSTANT = /* @__PURE__ */ ((CONSTANT2) => {
  CONSTANT2["Observer"] = "Observer";
  CONSTANT2["Config"] = "Config";
  CONSTANT2["Config_INST"] = "Config_Inst";
  return CONSTANT2;
})(CONSTANT || {});
var CODE = /* @__PURE__ */ ((CODE2) => {
  CODE2[CODE2["CACHE"] = 10] = "CACHE";
  CODE2[CODE2["SUCCESS"] = 0] = "SUCCESS";
  CODE2[CODE2["ERROR"] = -1] = "ERROR";
  CODE2[CODE2["FIELDERROR"] = -2] = "FIELDERROR";
  CODE2[CODE2["TYPEERROR"] = -3] = "TYPEERROR";
  CODE2[CODE2["NOTFOUND"] = -4] = "NOTFOUND";
  CODE2[CODE2["SERVERERROR"] = -5] = "SERVERERROR";
  return CODE2;
})(CODE || {});
var MESSAGE = /* @__PURE__ */ ((MESSAGE2) => {
  MESSAGE2["CACHE"] = "cache";
  MESSAGE2["SUCCESS"] = "success";
  MESSAGE2["ERROR"] = "error";
  MESSAGE2["FIELDERROR"] = "missing field";
  MESSAGE2["TypeError"] = "type error";
  MESSAGE2["NOTFOUND"] = "not found";
  MESSAGE2["SERVERERROR"] = "server error";
  return MESSAGE2;
})(MESSAGE || {});

// lib/error/client.ts
var ClientError = class extends Error {
  name = "ClientError";
  code = -1 /* ERROR */;
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
  static RetClientError(message) {
    const data = new ClientError(message);
    return {
      code: -1 /* ERROR */,
      message: "error" /* ERROR */,
      data
    };
  }
};

// ../../../node_modules/reflect-metadata/Reflect.js
var Reflect2;
(function(Reflect3) {
  (function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect3);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect3;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function(key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
        }
        if (previous)
          previous(key, value);
      };
    }
  })(function(exporter) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      create: supportsCreate ? function() {
        return MakeDictionary(/* @__PURE__ */ Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map, key) {
        return hasOwn.call(map, key);
      } : function(map, key) {
        return key in map;
      },
      get: downLevel ? function(map, key) {
        return hasOwn.call(map, key) ? map[key] : void 0;
      } : function(map, key) {
        return map[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target))
          throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(target, propertyKey, false);
      if (IsUndefined(metadataMap))
        return false;
      if (!metadataMap.delete(metadataKey))
        return false;
      if (metadataMap.size > 0)
        return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0)
        return true;
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create)
          return void 0;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create)
          return void 0;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap))
        return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap))
        return void 0;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, true);
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null)
        return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0)
        return ownKeys;
      if (ownKeys.length <= 0)
        return parentKeys;
      var set = new _Set();
      var keys = [];
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap))
        return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys.length = k;
          return keys;
        }
        var nextValue = IteratorValue(next);
        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    function Type(x) {
      if (x === null)
        return 1;
      switch (typeof x) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x) {
      return x === void 0;
    }
    function IsNull(x) {
      return x === null;
    }
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(argument, 3);
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f)
        f.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O)
        return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = function() {
        function MapIterator2(keys, values, selector) {
          this._index = 0;
          this._keys = keys;
          this._values = values;
          this._selector = selector;
        }
        MapIterator2.prototype["@@iterator"] = function() {
          return this;
        };
        MapIterator2.prototype[iteratorSymbol] = function() {
          return this;
        };
        MapIterator2.prototype.next = function() {
          var index = this._index;
          if (index >= 0 && index < this._keys.length) {
            var result = this._selector(this._keys[index], this._values[index]);
            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }
            return { value: result, done: false };
          }
          return { value: void 0, done: true };
        };
        MapIterator2.prototype.throw = function(error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          throw error;
        };
        MapIterator2.prototype.return = function(value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          return { value, done: true };
        };
        return MapIterator2;
      }();
      return function() {
        function Map2() {
          this._keys = [];
          this._values = [];
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        }
        Object.defineProperty(Map2.prototype, "size", {
          get: function() {
            return this._keys.length;
          },
          enumerable: true,
          configurable: true
        });
        Map2.prototype.has = function(key) {
          return this._find(key, false) >= 0;
        };
        Map2.prototype.get = function(key) {
          var index = this._find(key, false);
          return index >= 0 ? this._values[index] : void 0;
        };
        Map2.prototype.set = function(key, value) {
          var index = this._find(key, true);
          this._values[index] = value;
          return this;
        };
        Map2.prototype.delete = function(key) {
          var index = this._find(key, false);
          if (index >= 0) {
            var size = this._keys.length;
            for (var i = index + 1; i < size; i++) {
              this._keys[i - 1] = this._keys[i];
              this._values[i - 1] = this._values[i];
            }
            this._keys.length--;
            this._values.length--;
            if (key === this._cacheKey) {
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            return true;
          }
          return false;
        };
        Map2.prototype.clear = function() {
          this._keys.length = 0;
          this._values.length = 0;
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        };
        Map2.prototype.keys = function() {
          return new MapIterator(this._keys, this._values, getKey);
        };
        Map2.prototype.values = function() {
          return new MapIterator(this._keys, this._values, getValue);
        };
        Map2.prototype.entries = function() {
          return new MapIterator(this._keys, this._values, getEntry);
        };
        Map2.prototype["@@iterator"] = function() {
          return this.entries();
        };
        Map2.prototype[iteratorSymbol] = function() {
          return this.entries();
        };
        Map2.prototype._find = function(key, insert) {
          if (this._cacheKey !== key) {
            this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
          }
          if (this._cacheIndex < 0 && insert) {
            this._cacheIndex = this._keys.length;
            this._keys.push(key);
            this._values.push(void 0);
          }
          return this._cacheIndex;
        };
        return Map2;
      }();
      function getKey(key, _) {
        return key;
      }
      function getValue(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return function() {
        function Set2() {
          this._map = new _Map();
        }
        Object.defineProperty(Set2.prototype, "size", {
          get: function() {
            return this._map.size;
          },
          enumerable: true,
          configurable: true
        });
        Set2.prototype.has = function(value) {
          return this._map.has(value);
        };
        Set2.prototype.add = function(value) {
          return this._map.set(value, value), this;
        };
        Set2.prototype.delete = function(value) {
          return this._map.delete(value);
        };
        Set2.prototype.clear = function() {
          this._map.clear();
        };
        Set2.prototype.keys = function() {
          return this._map.keys();
        };
        Set2.prototype.values = function() {
          return this._map.values();
        };
        Set2.prototype.entries = function() {
          return this._map.entries();
        };
        Set2.prototype["@@iterator"] = function() {
          return this.keys();
        };
        Set2.prototype[iteratorSymbol] = function() {
          return this.keys();
        };
        return Set2;
      }();
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return function() {
        function WeakMap2() {
          this._key = CreateUniqueKey();
        }
        WeakMap2.prototype.has = function(target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== void 0 ? HashMap.has(table, this._key) : false;
        };
        WeakMap2.prototype.get = function(target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== void 0 ? HashMap.get(table, this._key) : void 0;
        };
        WeakMap2.prototype.set = function(target, value) {
          var table = GetOrCreateWeakMapTable(target, true);
          table[this._key] = value;
          return this;
        };
        WeakMap2.prototype.delete = function(target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== void 0 ? delete table[this._key] : false;
        };
        WeakMap2.prototype.clear = function() {
          this._key = CreateUniqueKey();
        };
        return WeakMap2;
      }();
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create)
            return void 0;
          Object.defineProperty(target, rootKey, { value: HashMap.create() });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i)
          buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect2 || (Reflect2 = {}));

// lib/ioc/ref.ts
var ref = {
  def: function(key, value, target, propertyKey) {
    if (key instanceof Function) {
      Reflect.defineMetadata(key.name, value, key.prototype);
    } else {
      if (target && propertyKey) {
        Reflect.defineMetadata(key, value, target, propertyKey);
      }
      if (target && !propertyKey) {
        Reflect.defineMetadata(key, value, target);
      }
    }
  },
  get: function(key, target, propertyKey) {
    if (propertyKey && target) {
      return Reflect.getMetadata(key, target, propertyKey);
    }
    if (typeof key == "string") {
      if (target) {
        return Reflect.getMetadata(key, target);
      } else {
        return Reflect.getMetadata(key, key);
      }
    } else {
      return Reflect.getMetadata(key.name, key.prototype);
    }
  }
};

// lib/error/error.ts
var Error2 = (e) => {
  return function(_target, _propertyKey, descriptor) {
    if (e.force) {
      descriptor.value = function(_req, res) {
        const { message, code } = e;
        res.json({ message, code });
      };
    }
    ref.def("error", e, descriptor.value);
  };
};

// lib/error/dababase.ts
var DataBaseError = class extends Error {
  name = "DataBaseError";
  code = -1 /* ERROR */;
  detail;
  constructor(message, detail) {
    super(message);
    this.detail = detail;
  }
};

// lib/error/field.ts
var FieldError = class extends Error {
  name = "FieldError";
  code = -2 /* FIELDERROR */;
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
  static RetFieldError(message) {
    const data = new FieldError(message);
    return {
      code: -2 /* FIELDERROR */,
      message: "missing field" /* FIELDERROR */,
      data
    };
  }
};

// lib/error/type.ts
var TypesError = class extends Error {
  name = "TypeError";
  code = -3 /* TYPEERROR */;
  message;
  constructor(message) {
    super(message);
    this.message = message;
  }
  static RetTypeError(message) {
    const data = new TypesError(message);
    return {
      code: -3 /* TYPEERROR */,
      message: "type error" /* TypeError */,
      data
    };
  }
};

// lib/oper/protect.ts
function getStrCount(aStr, aChar) {
  let result;
  let count = 0;
  if (typeof aChar === "string") {
    let regex = new RegExp(aChar, "g");
    result = aStr.match(regex);
    count = !result ? 0 : result.length;
  }
  if (aChar instanceof Array) {
    aChar.forEach((el) => {
      let regex = new RegExp(el, "g");
      result = aStr.match(regex);
      result = !result ? 0 : result.length;
      count += result;
    });
  }
  return count;
}

// lib/orm/index.ts
var RunConfig = Symbol("RUNCONFIG");
var BASEENITY = Symbol("BASEENITY");
var Conn = Symbol("CONN");
var Target = Symbol("TARGET");
var GetConn = Symbol("GETCONN");
var TableName = Symbol("TableName");
var Cache = Symbol("CACHE");
var RedisClient = Symbol("RedisClient");

// lib/orm/enity.ts
var Entity = (dbname, poolConnection) => {
  return function(target) {
    ref.def(":pool", poolConnection, target.prototype);
    const targetInst = new target();
    ref.def(target.name, targetInst, target.prototype);
    targetInst[RunConfig](target, dbname);
  };
};
var Key = (target, propertyKey) => {
  ref.def("key", propertyKey, target.constructor.prototype);
};
var Keyword = (target, propertyKey) => {
  ref.def("keyword", propertyKey, target.constructor.prototype);
};
var AutoCreate = (target, propertyKey) => {
  const getPrevAutoCreate = ref.get(
    "AutoCreate" /* AutoCreate */,
    target.constructor.prototype
  );
  if (!getPrevAutoCreate) {
    ref.def(
      "AutoCreate" /* AutoCreate */,
      [propertyKey],
      target.constructor.prototype
    );
  } else {
    getPrevAutoCreate.push(propertyKey);
    ref.def(
      "AutoCreate" /* AutoCreate */,
      getPrevAutoCreate,
      target.constructor.prototype
    );
  }
};
var IsEmail = (target, propertyKey) => {
  const EmailValidate = (data) => {
    const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
    return reg.test(data);
  };
  ref.def(propertyKey, EmailValidate, target.constructor.prototype);
};
var IsNumber = (target, propertyKey) => {
  const IsNum = (num) => {
    return !isNaN(num);
  };
  ref.def(propertyKey, IsNum, target.constructor.prototype);
};
var IsOptional = (target, propertyKey) => {
  const RetTrue = () => true;
  ref.def(propertyKey, RetTrue, target.constructor.prototype);
};
var EnityTable = /* @__PURE__ */ new Map();

// lib/orm/sql.ts
var query = class {
  sql = "";
  Enity = "";
  and_sql = "";
  or_sql = "";
  likeand_sql = "";
  likeor_sql = "";
  pagination_sql = "";
  column_sql = "";
  setEnity(Enity) {
    if (Enity instanceof Array) {
      this.Enity = Enity.join(",");
    } else {
      this.Enity = Enity;
    }
    return this;
  }
  setColumn(keys) {
    let columns = "";
    this.sql = "";
    columns = keys.join(",");
    this.column_sql = columns;
    this.column_sql = this.column_sql + " from ";
    return this;
  }
  and(options, value) {
    if (value) {
      this.and_sql = options + " = " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" and ").replaceAll(",", " = ");
      this.and_sql = sql;
    }
    return this;
  }
  or(options, value) {
    if (value) {
      this.or_sql = options + " = " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" or ").replaceAll(",", " = ");
      this.or_sql = sql;
    }
    return this;
  }
  like_or(options, value) {
    if (value) {
      this.likeor_sql = options + " like " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" or ").replaceAll(",", " like ");
      this.likeor_sql = sql;
    }
    return this;
  }
  like_and(options, value) {
    if (value) {
      this.likeand_sql = options + " like " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" or ").replaceAll(",", " like ");
      this.likeand_sql = sql;
    }
    return this;
  }
  pagination(page, size) {
    this.pagination_sql += page + "," + size;
    this.pagination_sql = " limit " + this.pagination_sql;
    return this;
  }
  getSql() {
    let andor = "";
    let like_andor = "";
    if (this.and_sql || this.or_sql) {
      andor = this.and_sql ? this.and_sql : this.or_sql;
      andor = " where " + andor;
      if (this.and_sql && this.or_sql) {
        andor = " where " + this.and_sql + " or " + this.or_sql + " ";
      }
    }
    if (this.likeand_sql || this.likeor_sql) {
      like_andor = this.likeand_sql ? this.likeand_sql : this.likeor_sql;
      if (this.likeand_sql && this.likeor_sql) {
        like_andor = this.likeand_sql + " or " + this.likeor_sql + " ";
      }
      if (!andor) {
        like_andor = " where " + like_andor;
      }
    }
    if (!this.column_sql) {
      this.column_sql = " * from ";
    }
    this.sql = "select" + this.column_sql + this.Enity + andor + like_andor + this.pagination_sql;
    return this.sql;
  }
};
var del = class {
  sql = "select";
  Enity = "";
  andsql = "";
  orsql = "";
  setEnity(Enity) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    this.sql = "delete from " + this.Enity + " ";
    return this;
  }
  and(options, value) {
    if (value) {
      if (!this.andsql) {
        this.andsql += " where ";
      } else {
        this.andsql = "";
        this.andsql += " and ";
      }
      this.andsql += options + ' = "' + value + '"';
      this.sql += this.andsql;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.and(el, options[el]);
      });
    }
    return this;
  }
  or(options, value) {
    if (value) {
      if (!this.orsql) {
        this.orsql += " where ";
      } else {
        this.orsql = "";
        this.orsql += " or ";
      }
      this.orsql += options + ' = "' + value + '"';
      this.sql += this.orsql;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.or(el, options[el]);
      });
    }
    return this;
  }
  getSql() {
    return this.sql;
  }
};
var update = class {
  Enity;
  sql = "";
  options = {};
  orsql = "";
  andsql = "";
  setEnity(Enity) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    return this;
  }
  setOptions(options, value) {
    if (value && typeof options == "string") {
      console.log(this.options);
      this.options[options] = value;
    } else {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.setOptions(el, options[el]);
      });
    }
    return this;
  }
  or(options, value) {
    if (value) {
      if (!this.andsql && !this.orsql) {
        this.orsql += " where ";
      } else {
        this.orsql = " ";
        this.orsql += " or ";
      }
      this.orsql += options + ' = "' + value + '"';
      this.sql += this.orsql;
      return this;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.or(el, options[el]);
      });
    }
    return this;
  }
  and(options, value) {
    if (value) {
      if (!this.andsql && !this.orsql) {
        this.andsql += " where ";
      } else {
        this.andsql = " ";
        this.andsql += " and ";
      }
      this.andsql += options + ' = "' + value + '"';
      this.sql += this.andsql;
      return this;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.and(el, options[el]);
      });
    }
    return this;
  }
  getSql() {
    const opt = [this.options];
    console.log("this.sql", this.sql);
    const sql = "update  " + this.Enity + " Set ? " + this.sql;
    return {
      opt,
      sql
    };
  }
};
var save = class {
  sql = "";
  Enity = "";
  options = {};
  setEnity(Enity) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    return this;
  }
  setOptions(options, value) {
    if (value && typeof options == "string") {
      console.log(this.options);
      this.options[options] = value;
    } else {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.setOptions(el, options[el]);
      });
    }
    return this;
  }
  getSql() {
    const opt = [this.options];
    console.log("this.sql", this.sql);
    const sql = "insert into  " + this.Enity + " SET ? ";
    return {
      opt,
      sql
    };
  }
};

// lib/ioc/class.ts
import * as express from "express";
var AdoNodeController = class {
  constructor(Base, Service) {
    this.Base = Base;
    this.Service = Service;
  }
  Boost(Base) {
    const AdoNodeGlobalInterceptor = ref.get(
      Base.name,
      Base.prototype,
      ":ControllerInterceptor"
    );
    const app = express.Router();
    this.Service.forEach((service, URL) => {
      let fn = service.fn;
      service.fn = async function(req, res) {
        if (AdoNodeGlobalInterceptor) {
          if (AdoNodeGlobalInterceptor.before) {
            const data = await AdoNodeGlobalInterceptor.before(req);
            if (data) {
              res.json(data);
              return;
            }
          }
          const ret = await fn(req, res);
          if (ret instanceof Error) {
            res.json(ret);
            return;
          }
          if (ret.data && ret.after) {
            res.json(ret.data);
            ret.after(req, res);
            return;
          } else if (ret.data && !ret.after) {
            res.json(ret.data);
            return;
          }
          if (ret) {
            res.json(ret);
            return;
          }
          if (AdoNodeGlobalInterceptor.after) {
            AdoNodeGlobalInterceptor.after(req);
          }
          return;
        } else {
          const ret = await fn(req, res);
          if (ret instanceof Error) {
            res.json(ret);
            return;
          }
          if (ret.data && ret.after) {
            res.json(ret.data);
            ret.after(req, res);
            return;
          } else if (ret.data && !ret.after) {
            res.json(ret.data);
            return;
          }
          if (ret) {
            res.json(ret);
            return;
          }
          return;
        }
      };
      if (service.method == "Get") {
        URL = this.Base + URL;
        app.get(URL, service.fn);
      }
      if (service.method == "Post") {
        URL = this.Base + URL;
        app.post(URL, service.fn);
      }
      if (service.method == "All") {
        app.all(URL, service.fn);
      }
      console.log("url", URL);
    });
    return app;
  }
};

// lib/ioc/service.ts
var SerivceMap = /* @__PURE__ */ new Map();
function GenereateRouter(Controller2) {
  const URL = ref.get("BaseUrl", Controller2.prototype);
  const GetService = new Controller2(URL, SerivceMap);
  return GetService.Boost(Controller2);
}

// lib/ioc/controller.ts
var Controller = (BaseUrl) => {
  return (target) => {
    ref.def("BaseUrl", BaseUrl, target.prototype);
    ref.def(target, GenereateRouter(target.prototype.constructor));
    SerivceMap.clear();
  };
};

// lib/ioc/ioc.ts
var Inject = (InjectTarget) => {
  return function(target, propertyKey) {
    const Service = ref.get(InjectTarget);
    target.constructor.prototype[propertyKey] = Service;
  };
};
var Collect = () => {
  return function(target) {
    ref.def(target, target.prototype);
  };
};

// lib/method/server.ts
import express2 from "express";
import { cpus } from "os";
import cluster from "cluster";
import multer from "multer";
function defineAdoNodeOptions(options) {
  return options;
}
var _AdoNodeServer = class {
  static __getProvider__(provider) {
    if (provider.length && provider.length >= 1) {
      provider.forEach((el) => {
        const controller = ref.get(el.name, el.prototype, ":controller");
        const provider2 = ref.get(el.name, el.prototype, ":provider");
        this.__getProvider__(provider2);
        if (controller.length && controller.length >= 1 && controller instanceof Array) {
          controller.forEach((el2) => {
            this.Controllers.push(el2);
          });
        }
      });
    }
  }
  static createControllers() {
    const opt = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":modules"
    );
    opt.forEach((el) => {
      const controller = ref.get(el.name, el.prototype, ":controller");
      const provider = ref.get(el.name, el.prototype, ":provider");
      this.__getProvider__(provider);
      if (controller.length && controller.length >= 1 && controller instanceof Array) {
        controller.forEach((el2) => {
          this.Controllers.push(el2);
        });
      }
    });
    const Controller2 = [...new Set(this.Controllers)];
    return Controller2;
  }
  static run() {
    const isCluster = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":cluster"
    );
    if (isCluster) {
      let workers = {};
      if (cluster.isPrimary) {
        cluster.on("exit", (worker, _code, _signal) => {
          console.log(`\u5DE5\u4F5C\u8FDB\u7A0B ${worker.process.pid} \u5DF2\u9000\u51FA`);
          delete workers[worker.process.pid];
          worker = cluster.fork();
          workers[worker.process.pid] = worker;
        });
        for (let i = 0; i < cpus().length; i++) {
          let worker = cluster.fork();
          workers[worker.process.pid] = worker;
        }
      } else {
        this.runServer();
      }
    } else {
      this.runServer();
    }
  }
  static runServer() {
    const app = express2();
    const globalPipes = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":globalPipes"
    );
    if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
      globalPipes.forEach((pipe) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    app.use(express2.json());
    const port = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":port");
    const base = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":base");
    const controller = this.createControllers();
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    app.set("port", port);
    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }
  static runSSRServer(callBack) {
    const app = express2();
    const globalPipes = ref.get(
      _AdoNodeServer.name,
      _AdoNodeServer.prototype,
      ":globalPipes"
    );
    if (globalPipes && globalPipes.length && globalPipes instanceof Array) {
      globalPipes.forEach((pipe) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    app.use(express2.json());
    app.use(multer({ dest: "public/server" }).any());
    const base = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":base");
    const port = ref.get(_AdoNodeServer.name, _AdoNodeServer.prototype, ":port");
    const controller = this.createControllers();
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    callBack(app);
    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }
};
var AdoNodeServer = _AdoNodeServer;
__publicField(AdoNodeServer, "Controllers", []);

// lib/method/method.ts
function useRunTimeInterceptor(Interceptor, time, options) {
  if (Interceptor) {
    if (Interceptor[time]) {
      return Interceptor[time](options.req);
    }
  }
  return void 0;
}
function useArgs(propertyKey, target, req, res) {
  const hasQuery = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":query"
  );
  const hasBody = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":body"
  );
  const hasParams = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":params"
  );
  const hasHeaders = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":headers"
  );
  const hasRequest = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":request"
  );
  const hasResponse = ref.get(
    propertyKey,
    target.constructor.prototype,
    ":response"
  );
  let arg = [];
  if (typeof hasQuery === "number" || typeof hasBody === "number" || typeof hasHeaders === "number" || typeof hasRequest == "number" || typeof hasResponse == "number" || typeof hasParams == "number") {
    arg[hasQuery] = req.query;
    arg[hasBody] = req.body;
    arg[hasParams] = req.params;
    arg[hasHeaders] = req.headers;
    arg[hasRequest] = req;
    arg[hasResponse] = res;
    return arg;
  }
  return [req, res];
}
var createMethod = (method) => {
  return (URL) => {
    return function(target, propertyKey, descriptor) {
      const fn = descriptor.value;
      ref.def(propertyKey, URL, target.constructor.prototype, ":url");
      descriptor.value = async function(req, res) {
        target.constructor.prototype[propertyKey] = fn;
        const interceptor = ref.get(
          propertyKey,
          target.constructor.prototype,
          ":interceptor"
        );
        const before_data = await useRunTimeInterceptor(interceptor, "before", {
          req
        });
        console.log(before_data);
        if (before_data) {
          return before_data;
        }
        const pipe = ref.get(
          propertyKey,
          target.constructor.prototype,
          ":pipe"
        );
        if (pipe) {
          const pipe_data = await pipe.run(req);
          if (pipe_data) {
            return pipe_data;
          }
        }
        const hack_data = await useRunTimeInterceptor(interceptor, "hack", {
          req
        });
        if (hack_data) {
          return hack_data;
        }
        const args = useArgs(propertyKey, target, req, res);
        const ret = await target.constructor.prototype[propertyKey](...args);
        if (ret && interceptor && interceptor.after) {
          return {
            data: ret,
            after: interceptor.after
          };
        }
        if (ret && !interceptor) {
          return {
            data: ret
          };
        }
        return {
          msg: "ok",
          code: 0
        };
      };
      SerivceMap.set(URL, {
        fn: descriptor.value,
        method
      });
    };
  };
};
var Get = createMethod("Get");
var Post = createMethod("Post");
var All = createMethod("All");

// lib/pipe/pipe.ts
var UsePipe = (fn) => {
  return function(target, propertyKey) {
    ref.def(propertyKey, fn, target.constructor.prototype, ":pipe");
  };
};
function validate(Proto, inst) {
  let errorfield = {};
  const Autocreate = ref.get(
    "AutoCreate" /* AutoCreate */,
    Proto.prototype
  );
  console.log("Autocreate", Autocreate);
  const Filter = Object.getOwnPropertyNames(new Proto()).filter(
    (el) => Autocreate.indexOf(el) == -1
  );
  console.log("Filter", Filter);
  const isError = Filter.some((el) => {
    const func = ref.get(el, Proto.prototype);
    const ret = func(inst[el]);
    if (!ret) {
      errorfield = {
        key: el,
        value: inst[el]
      };
      return true;
    }
    return false;
  });
  if (isError) {
    return new FieldError(
      `${errorfield.key + " " + errorfield.value} \u5B58\u5728\u9519\u8BEF`
    );
  }
  return !isError;
}

// lib/orm/orm.ts
import { createClient } from "redis";
import { isBoolean, isObject } from "lodash";

// lib/orm/transaction.ts
var transaction = class {
  __that__;
  conn;
  __manager__;
  constructor() {
    this.__manager__ = [];
  }
  async connection() {
    this.conn = await this.__that__[Conn];
  }
  async start() {
    return new Promise((resolve, reject) => {
      this.conn.beginTransaction((err) => {
        if (err) {
          reject(err);
        }
        Promise.all(this.__manager__.map(async (el) => await el())).then((res) => {
          console.log("res", res);
          this.conn.commit((err2) => {
            if (err2) {
              console.log("\u4E8B\u7269\u63D0\u4EA4\u5931\u8D25");
              reject(err2);
            }
          });
          resolve(res);
          this.conn.release();
        }).catch((err2) => {
          console.log("err", err2);
          this.conn.rollback(() => {
            console.log("\u6570\u636E\u64CD\u4F5C\u56DE\u6EDA");
          });
          reject(err2);
        });
      });
    });
  }
  push(fn) {
    this.__manager__.push(fn);
  }
};

// lib/orm/orm.ts
var AdoOrmBaseEntity = class {
  [BASEENITY];
  [Conn];
  [Target];
  [TableName];
  [RedisClient];
  constructor() {
    this[Target] = AdoOrmBaseEntity.name;
    this[RedisClient] = createClient();
    this[RedisClient].connect();
  }
  createTransaction() {
    const TranSactionInstance = new transaction();
    TranSactionInstance.__that__ = this;
    return TranSactionInstance;
  }
  createQueryBuilder() {
    return {
      query: new query(),
      save: new save(),
      update: new update(),
      del: new del()
    };
  }
  async [RunConfig](BaseEnity, dbname) {
    this[BASEENITY] = BaseEnity;
    this[TableName] = dbname;
    const Connection = ref.get(":pool", this[BASEENITY].prototype);
    this[Conn] = await Connection();
  }
  async [Cache](key, value, cacheOptions2) {
    if (cacheOptions2) {
      if (isObject(cacheOptions2) && cacheOptions2.cache && cacheOptions2.timeout) {
        console.log("1", key);
        this[RedisClient].set(key, value);
        this[RedisClient].expire(key, cacheOptions2.timeout);
      }
      if (isObject(cacheOptions2) && !cacheOptions2.cache && cacheOptions2.force && cacheOptions2.timeout) {
        console.log("2", key);
        this[RedisClient].set(key, value);
        this[RedisClient].expire(key, cacheOptions2.timeout);
      }
      if (isBoolean(cacheOptions2) && cacheOptions2 === true) {
        this[RedisClient].set(key, value);
      }
    }
  }
  async getList(page, size) {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `select * from ?? limit ?,?`,
        [this[TableName], parseInt(page), parseInt(size)],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async getOneBy(val, cache) {
    {
      let cacheKey;
      const isCache = isObject(cache) && cache.cache || cache == true;
      if (isCache) {
        cacheKey = `${this[TableName]}:getOneBy:${val}`;
        console.log(cacheKey);
        if (isObject(cache) && !cache.force) {
          let cacheVal = await this[RedisClient].get(cacheKey);
          if (cacheVal) {
            return cacheVal;
          }
        }
      }
      const key = ref.get("key", this[BASEENITY].prototype);
      const count = getStrCount(val, ["delete", "drop"]);
      if (count) {
        return new ClientError("\u975E\u6CD5\u53C2\u6570,\u53EF\u80FD\u4E3A\u6076\u610Fsql\u6CE8\u5165");
      }
      return new Promise((resolve) => {
        let _this = this;
        this[Conn].query(
          `select * from ?? where ?? = ?`,
          [this[TableName], key, val],
          function(err, res) {
            if (err) {
              resolve(new DataBaseError("\u6570\u636E\u5E93\u9519\u8BEF,\u4E5F\u8BB8\u914D\u7F6E\u9879\u662F\u975E\u6CD5\u7684", err));
            }
            resolve(res);
            if (isCache) {
              _this[Cache](
                cacheKey,
                JSON.stringify(res),
                cache
              );
            }
          }
        );
      });
    }
  }
  async delOneBy(val) {
    const key = ref.get("key", this[BASEENITY].prototype);
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `DELETE FROM ?? WHERE ?? = ?`,
        [this[TableName], key, val],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async countBy(val, cache) {
    let cacheKey;
    const isCache = isObject(cache) && cache.cache || cache == true;
    if (isCache) {
      let tostr = JSON.stringify(val);
      cacheKey = `${this[TableName]}:getOneBy:${tostr}`;
      if (isObject(cache) && !cache.force) {
        let cacheVal = await this[RedisClient].get(cacheKey);
        if (cacheVal) {
          return cacheVal;
        }
      }
    }
    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let _this = this;
      this[Conn].query(
        countSql + jonitSql,
        [this[TableName]],
        function(err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);
          if (isCache) {
            _this[Cache](cacheKey, JSON.stringify(res), cache);
          }
        }
      );
    });
  }
  async getBy(val, cache) {
    let cacheKey;
    const isCache = isObject(cache) && cache.cache || cache == true;
    if (isCache) {
      cacheKey = `${this[TableName]}:getOneBy:${val}`;
      if (isObject(cache) && !cache.force) {
        let cacheVal = await this[RedisClient].get(cacheKey);
        if (cacheVal) {
          return cacheVal;
        }
      }
    }
    const sql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      let _this = this;
      this[Conn].query(
        "select * from ?? where " + sql,
        [this[TableName]],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
          if (isCache) {
            _this[Cache](cacheKey, JSON.stringify(res), cache);
          }
        }
      );
    });
  }
  async save(val) {
    const filterUndefined = JSON.parse(JSON.stringify(val));
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `insert into ??  SET ? `,
        [this[TableName], filterUndefined],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async getMany(sql, options, cache) {
    let cacheKey;
    const isCache = isObject(cache) && cache.cache || cache == true;
    if (isCache) {
      const tojson = JSON.stringify(options);
      cacheKey = `${this[TableName]}:getMany:${tojson}`;
      if (isObject(cache) && !cache.force) {
        let cacheVal = await this[RedisClient].get(cacheKey);
        if (cacheVal) {
          return cacheVal;
        }
      }
    }
    return new Promise((resolve, reject) => {
      let _this = this;
      this[Conn].query(sql, options, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          if (isCache) {
            _this[Cache](cacheKey, JSON.stringify(res), cache);
          }
        }
      });
    });
  }
};

// lib/interceptor/global.ts
var UseControllerInterceptor = (fn) => {
  return function(target) {
    ref.def(target.name, fn, target.prototype, ":ControllerInterceptor");
  };
};

// lib/interceptor/interceptor.ts
var UseInterceptor = (fn) => {
  return function(target, propertyKey) {
    ref.def(
      propertyKey,
      fn,
      target.constructor.prototype,
      ":interceptor"
    );
  };
};

// lib/module/module.ts
var Module = (AdoNodeOptions) => {
  return function(target) {
    ref.def(
      target.name,
      AdoNodeOptions.Controller,
      target.prototype,
      ":controller"
    );
    ref.def(
      target.name,
      AdoNodeOptions.Provider,
      target.prototype,
      ":provider"
    );
    ref.def(target.name, true, target.prototype, ":module");
  };
};
var Modules = (modules) => {
  modules.Modules.forEach((el) => {
    const isModule = ref.get(el.name, el.prototype, ":module");
    if (!isModule) {
      throw new Error(`${el.name} is Not a Moudle`);
    }
  });
  return function() {
    ref.def(
      AdoNodeServer.name,
      modules.Modules,
      AdoNodeServer.prototype,
      ":modules"
    );
    ref.def(AdoNodeServer.name, modules.Base, AdoNodeServer.prototype, ":base");
    ref.def(
      AdoNodeServer.name,
      modules.GlobalPipes,
      AdoNodeServer.prototype,
      ":globalPipes"
    );
    ref.def(AdoNodeServer.name, modules.Port, AdoNodeServer.prototype, ":port");
    ref.def(
      AdoNodeServer.name,
      modules.Cluster,
      AdoNodeServer.prototype,
      ":cluster"
    );
  };
};

// lib/params/params.ts
function Query() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":query"
    );
  };
}
function Body() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":body"
    );
  };
}
function Headers() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":headers"
    );
  };
}
function Req() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":request"
    );
  };
}
function Res() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":response"
    );
  };
}
function Params() {
  return function(target, propertyKey, parameterIndex) {
    ref.def(
      propertyKey,
      parameterIndex,
      target.constructor.prototype,
      ":params"
    );
  };
}

// lib/pipe/tansformer.ts
import * as __ from "lodash";
var class_transform = class {
  static plainToClass(toClass, plain) {
    if (plain instanceof Array) {
      let retPlain = plain.map((el) => {
        const inst = new toClass();
        return __.assign(inst, el);
      });
      return retPlain;
    } else {
      const inst = new toClass();
      let retPlain = __.assign(inst, plain);
      return retPlain;
    }
  }
  static __classToPlain__(get, inst) {
    const plain = {};
    get.forEach((el) => {
      plain[el] = inst[el];
    });
    return plain;
  }
  static classToPlain(classInst, options) {
    if (!options || options.exclude) {
      if (classInst instanceof Array) {
        let plain = classInst.map((inst) => {
          const filt = ref.get(
            "AutoCreate" /* AutoCreate */,
            inst.constructor.prototype
          );
          const keys = Object.getOwnPropertyNames(inst);
          const get = keys.map((el) => {
            return filt.indexOf(el) == -1 ? el : void 0;
          }).filter((el) => el);
          return this.__classToPlain__(get, inst);
        });
        return plain;
      } else {
        const filt = ref.get(
          "AutoCreate" /* AutoCreate */,
          classInst.constructor.prototype
        );
        const keys = Object.getOwnPropertyNames(classInst);
        const get = keys.map((el) => {
          return filt.indexOf(el) == -1 ? el : void 0;
        }).filter((el) => el);
        return this.__classToPlain__(get, classInst);
      }
    } else {
      if (classInst instanceof Array) {
        let plain = classInst.map((inst) => {
          const keys = Object.getOwnPropertyNames(inst).filter((el) => el);
          return this.__classToPlain__(keys, inst);
        });
        return plain;
      } else {
        const keys = Object.getOwnPropertyNames(classInst).filter((el) => el);
        return this.__classToPlain__(keys, classInst);
      }
    }
  }
};
export {
  AdoNodeController,
  AdoNodeServer,
  AdoOrmBaseEntity,
  AutoCreate,
  Body,
  CODE,
  CONSTANT,
  ClientError,
  Collect,
  Controller,
  DataBaseError,
  EnityTable,
  Entity,
  Error2 as Error,
  FieldError,
  GenereateRouter,
  Get,
  Headers,
  Inject,
  IsEmail,
  IsNumber,
  IsOptional,
  Key,
  Keyword,
  MESSAGE,
  Module,
  Modules,
  Params,
  Post,
  Query,
  Req,
  Res,
  SerivceMap,
  TypesError,
  UseControllerInterceptor,
  UseInterceptor,
  UsePipe,
  class_transform,
  defineAdoNodeOptions,
  del,
  getStrCount,
  query,
  ref,
  save,
  update,
  validate
};
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
