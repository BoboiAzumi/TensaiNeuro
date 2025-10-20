import { Tensor } from "../../modules/tensor.js";
import type { LossFunction } from "../../types/loss-type.js";
export declare class MSELoss implements LossFunction {
    Y: Tensor[];
    T: Tensor[];
    constructor();
    set(Y: Tensor[], T: Tensor[]): LossFunction;
    get(): number;
    dLoss(): Tensor[];
}
//# sourceMappingURL=mse.d.ts.map