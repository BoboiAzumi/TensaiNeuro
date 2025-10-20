import type { Tensor } from "../modules/tensor.js";
export interface Optimizer {
    setupNnParam(params: object): void;
    setupOptimParam(params: object): void;
    updateMat(key: string, w: Tensor, grad: Tensor, lr: number): Tensor;
    updateVec(key: string, b: Tensor, vec: Tensor, lr: number): Tensor;
    step(): void;
}
//# sourceMappingURL=optimizer-type.d.ts.map