const spaceReg = /\s+/;
export const extractFilter = props => {
  const {
    x,
    y,
    width,
    height,
    result
  } = props;
  const extracted = {
    x,
    y,
    width,
    height,
    result
  };
  return extracted;
};
export const extractFeColorMatrix = props => {
  const extracted = {};
  if (props.in) {
    extracted.in1 = props.in;
  }
  if (props.values !== undefined) {
    if (Array.isArray(props.values)) {
      extracted.values = props.values;
    } else if (typeof props.values === 'number') {
      extracted.values = [props.values];
    } else if (typeof props.values === 'string') {
      extracted.values = props.values.split(spaceReg).map(parseFloat).filter(el => !isNaN(el));
    } else {
      console.warn('Invalid value for FeColorMatrix `values` prop');
    }
  }
  if (props.type) extracted.type = props.type;
  return extracted;
};
//# sourceMappingURL=extractFilter.js.map