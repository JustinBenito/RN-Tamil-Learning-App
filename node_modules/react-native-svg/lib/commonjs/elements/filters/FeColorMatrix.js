"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _FeColorMatrixNativeComponent = _interopRequireDefault(require("../../fabric/FeColorMatrixNativeComponent"));
var _extractFilter = require("../../lib/extract/extractFilter");
var _FilterPrimitive = _interopRequireDefault(require("./FilterPrimitive"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class FeColorMatrix extends _FilterPrimitive.default {
  static displayName = 'FeColorMatrix';
  static defaultProps = {
    ...this.defaultPrimitiveProps,
    type: 'matrix',
    values: ''
  };
  render() {
    return /*#__PURE__*/React.createElement(_FeColorMatrixNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractFilter.extractFilter)(this.props), (0, _extractFilter.extractFeColorMatrix)(this.props)));
  }
}
exports.default = FeColorMatrix;
//# sourceMappingURL=FeColorMatrix.js.map