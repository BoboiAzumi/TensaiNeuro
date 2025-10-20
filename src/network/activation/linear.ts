import { Tensor } from "../../modules/tensor.js"
import type { ActivationFunction } from "../../types/activation-type.js"
import type { TensorType } from "../../types/tensor-type.js"

export class Linear implements ActivationFunction {
    func(x: Tensor): Tensor {
        return x
    }

    d(x: Tensor): Tensor {
        return new Tensor((x.values() as TensorType[]).map((v) => {
            return 1
        }))
    }
}