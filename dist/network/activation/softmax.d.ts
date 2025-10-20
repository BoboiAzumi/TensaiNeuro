import { Tensor } from "../../modules/tensor.js";
import type { ActivationFunction } from "../../types/activation-type.js";
export declare class Softmax implements ActivationFunction {
    func(x: Tensor): Tensor;
    d(x: Tensor[], dLoss: Tensor[]): Tensor[];
}
//# sourceMappingURL=softmax.d.ts.map