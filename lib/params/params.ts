import { ref } from "../core";
function Query() {
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

export { Query, Body, Headers };
