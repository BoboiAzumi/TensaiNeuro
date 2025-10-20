import { Tensor } from "../../modules/tensor.js";
import type { Optimizer } from "../../types/optimizer-type.js";
export declare class ADAM implements Optimizer {
    beta1: number;
    beta2: number;
    epsilon: number;
    nnparam: {
        [key: string]: Tensor;
    };
    t: number;
    constructor();
    setupNnParam(params: {
        [key: string]: Tensor;
    }): void;
    setupOptimParam(params: {
        beta1: number;
        beta2: number;
        epsilon: number;
    }): void;
    updateMat(key: string, w0: Tensor, grad: Tensor, lr: number): Tensor;
    updateVec(key: string, b: Tensor, grad: Tensor, lr: number): Tensor;
    step(): void;
}
//# sourceMappingURL=adam.d.ts.map