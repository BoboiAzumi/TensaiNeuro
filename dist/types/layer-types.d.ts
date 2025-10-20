import type { Tensor } from "../modules/tensor.js";
export interface Layer {
    forward(x: Tensor[]): Tensor[];
    backward(dloss: Tensor[]): Tensor[];
}
//# sourceMappingURL=layer-types.d.ts.map