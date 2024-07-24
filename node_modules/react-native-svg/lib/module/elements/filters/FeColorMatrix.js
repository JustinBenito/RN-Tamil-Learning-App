function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import RNSVGFeColorMatrix from '../../fabric/FeColorMatrixNativeComponent';
import { extractFeColorMatrix, extractFilter } from '../../lib/extract/extractFilter';
import FilterPrimitive from './FilterPrimitive';
export default class FeColorMatrix extends FilterPrimitive {
  static displayName = 'FeColorMatrix';
  static defaultProps = {
    ...this.defaultPrimitiveProps,
    type: 'matrix',
    values: ''
  };
  render() {
    return /*#__PURE__*/React.createElement(RNSVGFeColorMatrix, _extends({
      ref: ref => this.refMethod(ref)
    }, extractFilter(this.props), extractFeColorMatrix(this.props)));
  }
}
//# sourceMappingURL=FeColorMatrix.js.map