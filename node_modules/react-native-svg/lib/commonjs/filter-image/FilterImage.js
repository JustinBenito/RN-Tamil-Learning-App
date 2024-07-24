"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterImage = void 0;
var _reactNative = require("react-native");
var _index = require("../index");
var _extractImage = require("./extractImage");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const getFilters = filters => {
  return filters === null || filters === void 0 ? void 0 : filters.map((filter, index) => {
    const {
      name,
      ...filterProps
    } = filter;
    switch (name) {
      case 'colorMatrix':
        return /*#__PURE__*/React.createElement(_index.FeColorMatrix, _extends({
          key: `${filter}-${index}`
        }, filterProps));
      default:
        return null;
    }
  });
};
const FilterImage = props => {
  const {
    source,
    style,
    ...imageProps
  } = props;
  const src = _reactNative.Image.resolveAssetSource(source);
  const styles = _reactNative.StyleSheet.flatten(style);
  const width = props.width || (styles === null || styles === void 0 ? void 0 : styles.width) || src.width;
  const height = props.height || (styles === null || styles === void 0 ? void 0 : styles.height) || src.height;
  const preserveAspectRatio = (0, _extractImage.extractResizeMode)(props.resizeMode);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles, {
      width,
      height,
      overflow: 'hidden'
    }]
  }, /*#__PURE__*/React.createElement(_index.Svg, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(_index.Filter, {
    id: `filter`
  }, getFilters(props.filters)), /*#__PURE__*/React.createElement(_index.Image, _extends({}, imageProps, {
    href: props.src || props.source,
    width: "100%",
    height: "100%",
    preserveAspectRatio: preserveAspectRatio,
    filter: props.filters && 'url(#filter)'
  }))));
};
exports.FilterImage = FilterImage;
//# sourceMappingURL=FilterImage.js.map