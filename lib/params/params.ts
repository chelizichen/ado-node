import { ref } from "../ioc";
function Query(): ParameterDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    ref.def(
      propertyKey as string,
      parameterIndex,
      target.constructor.prototype,
      ":query"
    );
  };
}

function Body() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    ref.def(
      propertyKey as string,
      parameterIndex,
      target.constructor.prototype,
      ":body"
    );
  };
}

function Headers() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    ref.def(
      propertyKey as string,
      parameterIndex,
      target.constructor.prototype,
      ":headers"
    );
  };
}

function Req() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    ref.def(
      propertyKey as string,
      parameterIndex,
      target.constructor.prototype,
      ":request"
    );
  };
}

function Res() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    ref.def(
      propertyKey as string,
      parameterIndex,
      target.constructor.prototype,
      ":response"
    );
  };
}

function Params() {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    ref.def(
      propertyKey as string,
      parameterIndex,
      target.constructor.prototype,
      ":params"
    );
  };
}

export { Query, Body, Headers, Req, Res, Params };
