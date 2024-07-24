function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Image as RNImage, StyleSheet, View } from 'react-native';
import { FeColorMatrix, Filter, Image, Svg } from '../index';
import { extractResizeMode } from './extractImage';
const getFilters = filters => {
  return filters === null || filters === void 0 ? void 0 : filters.map((filter, index) => {
    const {
      name,
      ...filterProps
    } = filter;
    switch (name) {
      case 'colorMatrix':
        return /*#__PURE__*/React.createElement(FeColorMatrix, _extends({
          key: `${filter}-${index}`
        }, filterProps));
      default:
        return null;
    }
  });
};
export const FilterImage = props => {
  const {
    source,
    style,
    ...imageProps
  } = props;
  const src = RNImage.resolveAssetSource(source);
  const styles = StyleSheet.flatten(style);
  const width = props.width || (styles === null || styles === void 0 ? void 0 : styles.width) || src.width;
  const height = props.height || (styles === null || styles === void 0 ? void 0 : styles.height) || src.height;
  const preserveAspectRatio = extractResizeMode(props.resizeMode);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles, {
      width,
      height,
      overflow: 'hidden'
    }]
  }, /*#__PURE__*/React.createElement(Svg, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(Filter, {
    id: `filter`
  }, getFilters(props.filters)), /*#__PURE__*/React.createElement(Image, _extends({}, imageProps, {
    href: props.src || props.source,
    width: "100%",
    height: "100%",
    preserveAspectRatio: preserveAspectRatio,
    filter: props.filters && 'url(#filter)'
  }))));
};
//# sourceMappingURL=FilterImage.js.map