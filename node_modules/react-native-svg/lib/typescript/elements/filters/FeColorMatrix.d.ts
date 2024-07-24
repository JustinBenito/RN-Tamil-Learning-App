import * as React from 'react';
import { FilterColorMatrixType } from '../../lib/extract/types';
import FilterPrimitive from './FilterPrimitive';
export type FeColorMatrixProps = {
    in?: string;
    type?: FilterColorMatrixType;
    values?: number | Array<number> | string;
};
export default class FeColorMatrix extends FilterPrimitive<FeColorMatrixProps> {
    static displayName: string;
    static defaultProps: {
        type: string;
        values: string;
        x: string;
        y: string;
        width: string;
        height: string;
    };
    render(): React.JSX.Element;
}
//# sourceMappingURL=FeColorMatrix.d.ts.map