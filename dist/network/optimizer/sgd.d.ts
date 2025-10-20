import { Tensor } from "../../modules/tensor.js";
import type { Optimizer } from "../../types/optimizer-type.js";
export declare class SGD implements Optimizer {
    setupNnParam(params: object): void;
    setupOptimParam(params: object): void;
    updateMat(key: string, w0: Tensor, grad: Tensor, lr: number): Tensor;
    updateVec(key: string, b: Tensor, grad: Tensor, lr: number): Tensor;
    step(): void;
}
//# sourceMappingURL=sgd.d.ts.map