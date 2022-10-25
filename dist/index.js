"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// index.ts
var ado_node_exports = {};
__export(ado_node_exports, {
  AdoNodeConfig: () => AdoNodeConfig,
  AdoNodeServer: () => AdoNodeServer,
  AdoOrmBaseEnity: () => AdoOrmBaseEnity,
  AutoCreate: () => AutoCreate,
  Body: () => Body,
  CODE: () => CODE,
  CONSTANT: () => CONSTANT,
  ClientError: () => ClientError,
  Collect: () => Collect,
  Config: () => Config,
  Connect: () => Connect,
  Controller: () => Controller,
  CreateCache: () => CreateCache,
  CreateDb: () => CreateDb,
  Curd: () => Curd,
  DataBaseError: () => DataBaseError,
  Delete: () => Delete,
  Enity: () => Enity,
  EnityTable: () => EnityTable,
  Error: () => Error2,
  FieldError: () => FieldError,
  GenereateRouter: () => GenereateRouter,
  Get: () => Get,
  HandleController: () => HandleController,
  Headers: () => Headers,
  Inject: () => Inject,
  Insert: () => Insert,
  IsEmail: () => IsEmail,
  IsNumber: () => IsNumber,
  IsOptional: () => IsOptional,
  Key: () => Key,
  Keyword: () => Keyword,
  MESSAGE: () => MESSAGE,
  Mapper: () => Mapper,
  OberServer: () => OberServer,
  Post: () => Post,
  Query: () => Query,
  Req: () => Req,
  Res: () => Res,
  Select: () => Select,
  SerivceMap: () => SerivceMap,
  TypesError: () => TypesError,
  Update: () => Update,
  UseCache: () => UseCache,
  UseControllerInterceptor: () => UseControllerInterceptor,
  UseDataBase: () => UseDataBase,
  UseInterceptor: () => UseInterceptor,
  UsePipe: () => UsePipe,
  cfjs: () => cfjs,
  defineAdoNodeOptions: () => defineAdoNodeOptions,
  del: () => del,
  getCachekey: () => getCachekey,
  getStrCount: () => getStrCount,
  query: () => query,
  ref: () => ref,
  save: () => save,
  update: () => update,
  useCffn: () => useCffn,
  useConfig: () => useConfig,
  useRunCf: () => useRunCf,
  validate: () => validate
});
module.exports = __toCommonJS(ado_node_exports);

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

// lib/ober/cfjs.ts
function useCffn(fn, weight) {
  cfjs.add(fn, weight);
}
function useRunCf() {
  cfjs.run();
}
var _cfjs = class {
  static add(fn, weight) {
    _cfjs.store.push({ fn, weight });
  }
  static sort() {
    _cfjs.store.sort((a, b) => {
      return a.weight - b.weight;
    });
  }
  static run() {
    _cfjs.sort();
    _cfjs.store.forEach((el) => {
      el.fn();
    });
  }
};
var cfjs = _cfjs;
__publicField(cfjs, "store", []);

// lib/ober/oberserver.ts
var OberServer = class {
  store = [];
  set(key, value) {
    this.store.push({ key, value });
  }
  get(key) {
    const val = this.store.find((el) => {
      return el.key === key;
    });
    return val;
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

// lib/orm/orm.ts
var RunConfig = Symbol("RUNCONFIG");
var BASEENITY = Symbol("BASEENITY");
var Conn = Symbol("CONN");
var Target = Symbol("TARGET");
var GetConn = Symbol("GETCONN");
var AdoOrmBaseEnity = class {
  [BASEENITY];
  [Conn];
  [Target];
  constructor() {
    this[Target] = AdoOrmBaseEnity.name;
  }
  async [RunConfig](BaseEnity, dbname) {
    if (this[Target] !== "AdoOrmBaseEnity") {
      console.log("this.target.name", this[Target]);
      console.log("\u4E0D\u662FAdoOrmBaseEnity \u51FD\u6570\u8C03\u7528 \u62D2\u7EDD\u8BBF\u95EE");
      return false;
    }
    this[GetConn](dbname);
    this[BASEENITY] = BaseEnity;
    return true;
  }
  async [GetConn](dbname) {
    var _a;
    if (this[Target] !== "AdoOrmBaseEnity") {
      console.log("this.target.name", this[Target]);
      console.log("\u4E0D\u662FAdoOrmBaseEnity \u51FD\u6570\u8C03\u7528 \u62D2\u7EDD\u8BBF\u95EE");
      return false;
    }
    let OberInst = ref.get(
      "Observer" /* Observer */,
      OberServer.prototype
    );
    const CommonClass = (_a = OberInst.get("Config" /* Config */)) == null ? void 0 : _a.value;
    const CacheInst = ref.get(dbname, CommonClass.prototype);
    this[Conn] = await CacheInst;
    return;
  }
  async getList() {
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `select * from ${this[BASEENITY].name} limit 0,10`,
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async getOneBy(val) {
    const key = ref.get("key", this[BASEENITY].prototype);
    const count = getStrCount(val, ["delete", "drop"]);
    if (count) {
      const Error3 = new ClientError("\u975E\u6CD5\u53C2\u6570\uFF0C\u53EF\u80FD\u4E3A\u6076\u610Fsql\u6CE8\u5165");
      return Error3;
    }
    const options = [this[BASEENITY].name, key, val];
    return new Promise((resolve) => {
      this[Conn].query(
        `select * from ?? where ?? = ?`,
        options,
        function(err, res) {
          if (err) {
            const Error3 = new DataBaseError(
              "\u6570\u636E\u5E93\u9519\u8BEF,\u4E5F\u8BB8\u914D\u7F6E\u9879\u662F\u975E\u6CD5\u7684",
              err
            );
            resolve(Error3);
          }
          resolve(res);
        }
      );
    });
  }
  async delOneBy(val) {
    const key = ref.get("key", this[BASEENITY].prototype);
    const options = [this[BASEENITY].name, key, val];
    return new Promise((resolve, reject) => {
      this[Conn].query(
        `DELETE FROM ?? WHERE ?? = ?`,
        options,
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async countBy(val) {
    let countSql = `select count(*) as total from ?? where `;
    const jonitSql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      this[Conn].query(
        countSql + jonitSql,
        [this[BASEENITY].name],
        function(err, res) {
          if (err) {
            reject(err);
          }
          const data = res[0];
          resolve(data);
        }
      );
    });
  }
  async getBy(val) {
    const sql = this[Conn].escape(val).replaceAll(",", " and ");
    return new Promise((resolve, reject) => {
      this[Conn].query(
        "select * from ?? where " + sql,
        [this[BASEENITY].name],
        function(err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
  async save(val) {
    const filterUndefined = JSON.parse(JSON.stringify(val));
    let opt = [this[BASEENITY].name, filterUndefined];
    return new Promise((resolve, reject) => {
      this[Conn].query(`insert into ??  SET ? `, opt, function(err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  async getMany(sql, options) {
    return new Promise((resolve, reject) => {
      this[Conn].query(sql, options, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
};

// lib/orm/enity.ts
var Enity = (dbname) => {
  return function(target) {
    const targetInst = new target();
    targetInst[RunConfig](target, dbname);
    ref.def(target.name, targetInst, target.prototype);
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
  sql = "select";
  Enity = "";
  andsql = "";
  orsql = "";
  likesql = "";
  setEnity(Enity2) {
    if (typeof Enity2 === "function") {
      this.Enity = Enity2.name;
    } else {
      this.Enity = Enity2;
    }
    this.sql = "select * from " + this.Enity + " ";
    return this;
  }
  setColumn(keys) {
    let columns = "";
    this.sql = "";
    keys.forEach((el, index) => {
      if (index != keys.length - 1) {
        columns += "" + el + ",";
      } else {
        columns += "" + el + " ";
      }
    });
    this.sql = "select " + columns + "from " + this.Enity;
    return this;
  }
  and(options, value) {
    if (value) {
      if (!this.andsql && !this.likesql) {
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
      if (!this.orsql && !this.likesql) {
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
  like(key, value, andor) {
    if (!this.likesql && !this.andsql && !this.orsql) {
      this.likesql += " where ";
    } else {
      this.likesql = "";
      this.likesql += " " + andor + " ";
    }
    this.likesql += key + ' like "%' + value + '%" ';
    this.sql += this.likesql;
    return this;
  }
  pagination(options, value) {
    let paginationsql = " limit ";
    if (value) {
      paginationsql += options + "," + value;
    }
    if (typeof options == "object") {
      paginationsql += options.page + "," + options.size;
    }
    this.sql += paginationsql;
    return this;
  }
  getSql() {
    return this.sql;
  }
};
var del = class {
  sql = "select";
  Enity = "";
  andsql = "";
  orsql = "";
  setEnity(Enity2) {
    if (typeof Enity2 === "function") {
      this.Enity = Enity2.name;
    } else {
      this.Enity = Enity2;
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
  setEnity(Enity2) {
    if (typeof Enity2 === "function") {
      this.Enity = Enity2.name;
    } else {
      this.Enity = Enity2;
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
  setEnity(Enity2) {
    if (typeof Enity2 === "function") {
      this.Enity = Enity2.name;
    } else {
      this.Enity = Enity2;
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

// lib/store/cache.ts
var CreateCache = (cacheName) => {
  return function(target, _propertyKey, descriptor) {
    const val = descriptor.value;
    ref.def(cacheName, val, target.constructor.prototype);
  };
};
var UseCache = (cacheName) => {
  return async function(target, propertyKey) {
    var _a;
    let OberInst = ref.get(
      "Observer" /* Observer */,
      OberServer.prototype
    );
    const CommonClass = (_a = OberInst.get("Config" /* Config */)) == null ? void 0 : _a.value;
    const CacheInst = ref.get(cacheName, CommonClass.prototype);
    target.constructor.prototype[propertyKey] = CacheInst;
    CacheInst().then((res) => {
      target.constructor.prototype[propertyKey] = res;
    });
  };
};
var UseDataBase = (dbName) => {
  return async function(target, propertyKey) {
    var _a;
    let OberInst = ref.get(
      "Observer" /* Observer */,
      OberServer.prototype
    );
    const CommonClass = (_a = OberInst.get("Config" /* Config */)) == null ? void 0 : _a.value;
    const DbInst = ref.get(dbName, CommonClass.prototype);
    target.constructor.prototype[propertyKey] = DbInst;
    DbInst.then((res) => {
      target.constructor.prototype[propertyKey] = res;
    });
  };
};
function getCachekey(type, table, options) {
  if (type == "list") {
    if (options.key && options.page && options.size) {
      return `list&table:${table}&key:${options.key}&page:${options.page}&size:${options.size}`;
    }
    if (!options.key && options.page && options.size) {
      return `list&table:${table}&key:null&page:${options.page}&size:${options.size}`;
    }
    if (options.key && !options.page && !options.size) {
      return `list&table:${table}&key:${options.key}&page:1&size:10`;
    }
    if (!options.key && !options.page && !options.size) {
      return `list&table:${table}&key:null&page:1&size:10`;
    }
  }
  if (type == "get") {
    return `get&table:${table}&${options.key}:${options.value}`;
  }
  if (type == "update") {
    return `get&table:${table}&${options.key}:${options.value}`;
  }
  return "";
}

// lib/ioc/class.ts
var express = __toESM(require("express"));
var HandleController = class {
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

// lib/oper/curd.ts
var Curd = (CurdUrl, Enity2, store) => {
  return function(_target, _propertyKey, _descriptor) {
    var _a;
    let OberInst = ref.get(
      "Observer" /* Observer */,
      OberServer.prototype
    );
    const CommonClass = (_a = OberInst.get("Config" /* Config */)) == null ? void 0 : _a.value;
    const coon = ref.get(store[0], CommonClass.prototype);
    const client = ref.get(store[1], CommonClass.prototype);
    const url = createCurdUrl(CurdUrl);
    async function getListRet(req, res) {
      const options = req.query;
      const ListSql = createListSql(Enity2, options);
      const cacheKey = getCachekey("list", Enity2.name, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      const data = await LinkRedis.hGet(Enity2.name, cacheKey);
      if (data) {
        const _data = JSON.parse(data);
        _data.code = 10 /* CACHE */;
        _data.message = "cache" /* CACHE */;
        res.json(_data);
      } else {
        new Promise(async (resolve, reject) => {
          const _conn = await coon;
          await _conn.query(ListSql, async function(err, res2) {
            if (err) {
              reject(err);
            } else {
              const data2 = {
                data: res2[0],
                total: res2[1][0].total,
                code: 0 /* SUCCESS */,
                message: "success" /* SUCCESS */
              };
              resolve(data2);
            }
          });
        }).then(async (ret) => {
          await LinkRedis.hSet(Enity2.name, cacheKey, JSON.stringify(data));
          await LinkRedis.expire(Enity2.name, 120);
          res.json(ret);
        }).catch((err) => {
          res.json({
            code: -1 /* ERROR */,
            message: -1 /* ERROR */,
            data: err
          });
        });
      }
    }
    async function getGetRet(req, res) {
      const options = req.query;
      const GetSql = createGetSql(Enity2, options);
      const key = ref.get("key", Enity2.prototype);
      options.key = key;
      options.value = options[key];
      const cacheKey = getCachekey("get", Enity2.name, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      const data = await LinkRedis.hGet(Enity2.name, cacheKey);
      if (data) {
        const _data = JSON.parse(data);
        _data.code = 10 /* CACHE */;
        _data.message = "cache" /* CACHE */;
        res.json(_data);
      } else {
        new Promise(async (resolve, reject) => {
          const _conn = await coon;
          _conn.query(GetSql, function(err, res2) {
            if (err) {
              reject(err);
            } else {
              const data2 = {
                data: res2[0],
                total: res2[1][0].total,
                code: 0 /* SUCCESS */,
                message: 0 /* SUCCESS */
              };
              LinkRedis.hSet(Enity2.name, cacheKey, JSON.stringify(data2));
              resolve(data2);
            }
          });
        }).then((ret) => {
          res.json(ret);
        }).catch((err) => {
          console.log("\u51FA\u73B0\u9519\u8BEF");
          console.log(err);
          res.json({
            code: -1 /* ERROR */,
            message: -1 /* ERROR */,
            data: err
          });
        });
      }
    }
    async function getDelRet(req, res) {
      const options = req.query;
      const DelSql = createDelSql(Enity2, options);
      const key = ref.get("key", Enity2.prototype);
      options.key = key;
      options.value = options[key];
      const LinkRedis = await client();
      LinkRedis.connect();
      const cacheKey = getCachekey("get", Enity2.name, options);
      new Promise(async (resolve, reject) => {
        const _conn = await coon;
        _conn.query(DelSql, function(err, res2) {
          if (err) {
            reject(err);
          } else {
            if (res2.affectedRows > 0) {
              const data = {
                affect: res2.affectedRows,
                code: 0 /* SUCCESS */,
                msg: "success" /* SUCCESS */
              };
              LinkRedis.hDel(Enity2.name, cacheKey);
              resolve(data);
            } else {
              const data = {
                affect: res2.affectedRows,
                code: -1 /* ERROR */,
                msg: "error" /* ERROR */
              };
              resolve(data);
            }
          }
        });
      }).then((ret) => {
        res.json(ret);
      });
    }
    async function getAddRet(req, res) {
      const options = req.body;
      const UpdateSql = createAddSql(Enity2, options);
      const key = ref.get("key", Enity2.prototype);
      options.key = key;
      options.value = options[key];
      const cacheKey = getCachekey("update", Enity2.name, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      new Promise(async (resolve, reject) => {
        const _conn = await coon;
        _conn.query(UpdateSql, function(err, res2) {
          if (err) {
            reject(err);
          } else {
            LinkRedis.hDel(Enity2.name, cacheKey);
            resolve(res2);
          }
        });
      }).then((ret) => {
        res.json(ret);
      });
    }
    async function getUpdateRet(req, res) {
      const options = req.body;
      const ListSql = createUpdateSql(Enity2, options);
      const LinkRedis = await client();
      LinkRedis.connect();
      new Promise(async (resolve, reject) => {
        const _conn = await coon;
        _conn.query(ListSql, function(err, res2) {
          if (err) {
            reject(err);
          } else {
            resolve(res2);
          }
        });
      }).then(async (ret) => {
        const keys = await LinkRedis.hKeys(Enity2.name);
        keys.forEach((el) => {
          LinkRedis.hDel(Enity2.name, el);
        });
        res.json(ret);
      });
    }
    SerivceMap.set(url.get.get, {
      fn: getGetRet,
      method: "Get"
    });
    SerivceMap.set(url.get.list, {
      fn: getListRet,
      method: "Get"
    });
    SerivceMap.set(url.get.del, {
      fn: getDelRet,
      method: "Get"
    });
    SerivceMap.set(url.post.modify, {
      fn: getUpdateRet,
      method: "Post"
    });
    SerivceMap.set(url.post.add, {
      fn: getAddRet,
      method: "Post"
    });
  };
};
function createCurdUrl(CurdUrl) {
  return {
    get: {
      list: `${CurdUrl}/list`,
      del: `${CurdUrl}/del`,
      get: `${CurdUrl}/get`
    },
    post: {
      modify: `${CurdUrl}/update`,
      add: `${CurdUrl}/add`
    }
  };
}
function createListSql(Enity2, options) {
  const keyword = ref.get("keyword", Enity2.prototype);
  if (options.keyword && options.page && options.size) {
    return `
      select SQL_CALC_FOUND_ROWS * from ${Enity2.name} where ${keyword} like 
     '%${options.keyword}%' limit ${options.page - 1},${options.size};
      SELECT FOUND_ROWS() as total;
    `;
  }
  if (options.page && options.size) {
    const sql2 = `
      select SQL_CALC_FOUND_ROWS * from ${Enity2.name} limit 
      ${options.page - 1},${options.size} ;
      SELECT FOUND_ROWS() as total;
    `;
    return sql2;
  }
  if (options.keyword && !options.page && !options.size) {
    const sql2 = `
      select  SQL_CALC_FOUND_ROWS * from ${Enity2.name} 
      where ${keyword} like '%${options.keyword}%' limit 0,10 ;
      SELECT FOUND_ROWS() as total;
    `;
    return sql2;
  }
  const sql = `SELECT  * from ${Enity2.name} limit 0,10 ; SELECT FOUND_ROWS() as total;`;
  console.log("sql", sql);
  return sql;
}
function createGetSql(Enity2, options) {
  const key = ref.get("key", Enity2.prototype);
  const sql = `select SQL_CALC_FOUND_ROWS * from ${Enity2.name} where ${key} = ${options[key]};SELECT FOUND_ROWS() as total;`;
  console.log("sql", sql);
  return sql;
}
function createDelSql(Enity2, options) {
  const key = ref.get("key", Enity2.prototype);
  return `DELETE  from ${Enity2.name} where ${key} = ${options[key]}`;
}
function createAddSql(Enity2, options) {
  let fields = EnityTable.get(Enity2.name);
  if (!fields) {
    fields = Object.getOwnPropertyNames(new Enity2());
    EnityTable.set(Enity2.name, fields);
  }
  const AutoCreate2 = ref.get("AutoCreate", Enity2.prototype);
  const opt = fields.filter((el) => {
    if (AutoCreate2.indexOf(el) == -1 && el != "BaseEnity" && el !== "conn") {
      return true;
    } else {
      return false;
    }
  });
  const val = opt.map((el) => {
    return options[el];
  });
  console.log("val", val);
  const sql = `insert into ${Enity2.name}(${opt.toString()}) values  (${val.toString()})`;
  console.log("sql", sql);
  return sql;
}
function createUpdateSql(Enity2, options) {
  let fields = EnityTable.get(Enity2.name);
  if (!fields) {
    fields = Object.getOwnPropertyNames(new Enity2());
    EnityTable.set(Enity2.name, fields);
  }
  const key = ref.get("key", Enity2.prototype);
  const AutoCreate2 = ref.get("AutoCreate", Enity2.prototype);
  const opt = fields.filter((el) => {
    if (AutoCreate2.indexOf(el) == -1 && el != "BaseEnity" && el !== "conn") {
      return true;
    } else {
      return false;
    }
  });
  const val = opt.map((el) => {
    return {
      [el]: options[el]
    };
  });
  const keySqlVal = `${key} = ${options[key]}`;
  const sqlVal = val.reduce((pre, item, index) => {
    const itemName = Object.getOwnPropertyNames(item);
    const itemValue = item[itemName];
    let sql2;
    if (index == val.length - 1) {
      sql2 = `${itemName} = ${itemValue}`;
    } else {
      sql2 = `${itemName} = ${itemValue},`;
    }
    return pre + sql2;
  }, "");
  const sql = `Update ${Enity2.name} Set ${sqlVal} WHERE ${keySqlVal}`;
  console.log("sql", sql);
  return sql;
}

// lib/method/server.ts
var import_express = __toESM(require("express"));
var import_os = require("os");
var import_cluster = __toESM(require("cluster"));
function defineAdoNodeOptions(options) {
  return options;
}
var AdoNodeServer = class {
  static run(options) {
    if (options.cluster) {
      let workers = {};
      if (import_cluster.default.isPrimary) {
        import_cluster.default.on("exit", (worker, _code, _signal) => {
          console.log(`\u5DE5\u4F5C\u8FDB\u7A0B ${worker.process.pid} \u5DF2\u9000\u51FA`);
          delete workers[worker.process.pid];
          worker = import_cluster.default.fork();
          workers[worker.process.pid] = worker;
        });
        for (let i = 0; i < (0, import_os.cpus)().length; i++) {
          let worker = import_cluster.default.fork();
          workers[worker.process.pid] = worker;
        }
      } else {
        this.runServer(options);
      }
    } else {
      this.runServer(options);
    }
  }
  static runServer(options) {
    const app = (0, import_express.default)();
    if (options.globalPipes && options.globalPipes.length && options instanceof Array) {
      options.globalPipes.forEach((pipe) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    app.use(import_express.default.json());
    const { port, staticDist, controller, base } = options;
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    app.use(import_express.default.static(staticDist));
    app.set("port", options.port);
    app.listen(port, () => {
      console.log(
        `create server at  http://localhost:${port} Worker ${process.pid} started`
      );
    });
  }
  static runSSRServer(options, callBack) {
    const app = (0, import_express.default)();
    if (options.globalPipes && options.globalPipes.length && options instanceof Array) {
      options.globalPipes.forEach((pipe) => {
        const inst = new pipe();
        app.use("*", inst.run);
      });
    }
    app.use(import_express.default.json());
    const { controller, base } = options;
    controller.forEach((el) => {
      const router = ref.get(el);
      app.use(base, router);
    });
    callBack(app);
  }
};

// lib/method/method.ts
function useRunTimeInterceptor(Interceptor, time, options) {
  if (Interceptor) {
    if (Interceptor[time]) {
      return Interceptor[time](options.req);
    }
  }
  return void 0;
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
        if (typeof hasQuery === "number" || typeof hasBody === "number" || typeof hasHeaders === "number" || typeof hasRequest == "number" || typeof hasResponse == "number") {
          let arg = [];
          arg[hasQuery] = req.query;
          arg[hasBody] = req.body;
          arg[hasHeaders] = req.headers;
          arg[hasRequest] = req;
          arg[hasResponse] = res;
          const ret = await target.constructor.prototype[propertyKey](...arg);
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
        } else {
          const ret = await target.constructor.prototype[propertyKey](req);
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

// lib/pipe/pipe.ts
var UsePipe = (fn) => {
  return function(target, propertyKey) {
    ref.def(propertyKey, fn, target.constructor.prototype, ":pipe");
  };
};
function validate(inst) {
  let errorfield = {};
  const Autocreate = ref.get(
    "AutoCreate" /* AutoCreate */,
    inst.__proto__
  );
  const Filter = Object.getOwnPropertyNames(inst).filter(
    (el) => Autocreate.indexOf(el) == -1
  );
  const isError = Filter.some((el) => {
    const func = ref.get(el, inst.__proto__);
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

// lib/store/config.ts
var Config = (target) => {
  let OberInst = ref.get("Observer" /* Observer */, OberServer.prototype);
  if (!OberInst) {
    OberInst = new OberServer();
    ref.def("Observer" /* Observer */, OberInst, OberServer.prototype);
  }
  OberInst.set("Config" /* Config */, target);
};
var AdoNodeConfig = (ConfigClass) => {
  return function() {
    const config_inst = new ConfigClass();
    let OberInst = ref.get(
      "Observer" /* Observer */,
      OberServer.prototype
    );
    if (!OberInst) {
      OberInst = new OberServer();
      ref.def("Observer" /* Observer */, OberInst, OberServer.prototype);
    }
    OberInst.set("Config_Inst" /* Config_INST */, config_inst);
  };
};
var useConfig = () => {
  var _a;
  let OberInst = ref.get("Observer" /* Observer */, OberServer.prototype);
  return (_a = OberInst.get("Config_Inst" /* Config_INST */)) == null ? void 0 : _a.value;
};

// lib/store/db.ts
var CreateDb = (dbname) => {
  return function(target, _propertyKey, descriptor) {
    const val = descriptor.value();
    ref.def(dbname, val, target.constructor.prototype);
  };
};

// lib/store/mapper.ts
var Connect = (dbname) => {
  return function(target) {
    var _a;
    const OberInst = ref.get(
      "Observer" /* Observer */,
      OberServer.prototype
    );
    const CommonClass = (_a = OberInst.get("Config" /* Config */)) == null ? void 0 : _a.value;
    const connInst = ref.get(dbname, CommonClass.prototype);
    ref.def("coon", connInst, target.prototype);
  };
};
var Mapper = () => {
  return function(target) {
    ref.def(target, target.prototype);
  };
};
var Select = (sql) => {
  return function(target, _propertyKey, descriptor) {
    descriptor.value = async function(options) {
      const coon = await ref.get(
        "coon",
        target.constructor.prototype
      );
      const res = await new Promise((resolve, reject) => {
        coon.query(sql, options, function(err, res2) {
          if (err) {
            reject(err);
          } else {
            resolve(res2);
          }
        });
      });
      return res;
    };
  };
};
var Update = Select;
var Delete = Select;
var Insert = Select;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdoNodeConfig,
  AdoNodeServer,
  AdoOrmBaseEnity,
  AutoCreate,
  Body,
  CODE,
  CONSTANT,
  ClientError,
  Collect,
  Config,
  Connect,
  Controller,
  CreateCache,
  CreateDb,
  Curd,
  DataBaseError,
  Delete,
  Enity,
  EnityTable,
  Error,
  FieldError,
  GenereateRouter,
  Get,
  HandleController,
  Headers,
  Inject,
  Insert,
  IsEmail,
  IsNumber,
  IsOptional,
  Key,
  Keyword,
  MESSAGE,
  Mapper,
  OberServer,
  Post,
  Query,
  Req,
  Res,
  Select,
  SerivceMap,
  TypesError,
  Update,
  UseCache,
  UseControllerInterceptor,
  UseDataBase,
  UseInterceptor,
  UsePipe,
  cfjs,
  defineAdoNodeOptions,
  del,
  getCachekey,
  getStrCount,
  query,
  ref,
  save,
  update,
  useCffn,
  useConfig,
  useRunCf,
  validate
});
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
