import type { Tensor } from "../../modules/tensor.js";
export declare class BatchLoader {
    x: Tensor[];
    y: Tensor[];
    batch: number;
    index: number;
    constructor(x: Tensor[], y: Tensor[], batch: number);
    hasNext(): boolean;
    next(): {
        x: Tensor[];
        y: Tensor[];
    };
}
//# sourceMappingURL=batch-loader.d.ts.map