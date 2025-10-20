import { Tensor } from "../../modules/tensor.js";
import type { ActivationFunction } from "../../types/activation-type.js";
export declare class Tanh implements ActivationFunction {
    func(x: Tensor): Tensor;
    d(x: Tensor): Tensor;
}
//# sourceMappingURL=tanh.d.ts.map