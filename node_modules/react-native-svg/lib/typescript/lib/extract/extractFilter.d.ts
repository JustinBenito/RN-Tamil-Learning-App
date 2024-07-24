import { FeColorMatrixProps as FeColorMatrixComponentProps } from '../../elements/filters/FeColorMatrix';
import { NativeProps as FeColorMatrixNativeProps } from '../../fabric/FeColorMatrixNativeComponent';
import { NumberProp } from './types';
interface FilterPrimitiveCommonProps {
    x?: NumberProp;
    y?: NumberProp;
    width?: NumberProp;
    height?: NumberProp;
    result?: string;
}
export declare const extractFilter: (props: FilterPrimitiveCommonProps) => FilterPrimitiveCommonProps;
export declare const extractFeColorMatrix: (props: FeColorMatrixComponentProps) => FeColorMatrixNativeProps;
export {};
//# sourceMappingURL=extractFilter.d.ts.map