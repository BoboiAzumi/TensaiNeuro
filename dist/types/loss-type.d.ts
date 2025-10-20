import type { Tensor } from "../modules/tensor.js";
export interface LossFunction {
    set(Y: Tensor[], T: Tensor[]): void;
    get(): number;
    dLoss(): Tensor[];
}
//# sourceMappingURL=loss-type.d.ts.map