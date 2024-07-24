function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import RNSVGFilter from '../../fabric/FilterNativeComponent';
import Shape from '../Shape';
import warnOnce from 'warn-once';
export default class Filter extends Shape {
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
    warnOnce(!!primitiveUnits, "WARNING: Filter's `primitiveUnits` prop is not supported yet");
    const filterProps = {
      name: id,
      x,
      y,
      width,
      height,
      filterUnits: filterUnits || 'objectBoundingBox'
    };
    return /*#__PURE__*/React.createElement(RNSVGFilter, _extends({
      ref: ref => this.refMethod(ref)
    }, filterProps), this.props.children);
  }
}
//# sourceMappingURL=Filter.js.map