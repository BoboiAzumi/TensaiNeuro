import { Tensor } from "../../modules/tensor.js";
import type { ActivationFunction } from "../../types/activation-type.js";
import type { TensorType } from "../../types/tensor-type.js";

export class Sigmoid implements ActivationFunction {
    func(x: Tensor): Tensor {
        return new Tensor(
            (x.values() as TensorType[])
                .map(
                    (v) => 1 / (1 + Math.exp(-v)
                )
            )
        );
    }

    d(x: Tensor): Tensor {
        const sigmoid = this.func(x);
        return new Tensor(
            (sigmoid.values() as TensorType[])
                .map(
                    (v, i) => (v as number) * (1 - (v as number))
                )
            );
    }
}
