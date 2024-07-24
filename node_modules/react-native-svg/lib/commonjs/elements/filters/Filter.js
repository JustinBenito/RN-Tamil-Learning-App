"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _FilterNativeComponent = _interopRequireDefault(require("../../fabric/FilterNativeComponent"));
var _Shape = _interopRequireDefault(require("../Shape"));
var _warnOnce = _interopRequireDefault(require("warn-once"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Filter extends _Shape.default {
  static displayName = 'Filter';
  static defaultProps = {
    x: '-10%',
    y: '-10%',
    width: '120%',
    height: '120%',
    filterUnits: 'objectBoundingBox'
    // primitiveUnits: 'userSpaceOnUse',
  };

  render() {
    const {
      id,
      x,
      y,
      width,
      height,
      filterUnits,
      primitiveUnits
    } = this.props;
    (0, _warnOnce.default)(!!primitiveUnits, "WARNING: Filter's `primitiveUnits` prop is not supported yet");
    const filterProps = {
      name: id,
      x,
      y,
      width,
      height,
      filterUnits: filterUnits || 'objectBoundingBox'
    };
    return /*#__PURE__*/React.createElement(_FilterNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, filterProps), this.props.children);
  }
}
exports.default = Filter;
//# sourceMappingURL=Filter.js.map