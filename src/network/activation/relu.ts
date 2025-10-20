import { Tensor } from "../../modules/tensor.js"
import type { ActivationFunction } from "../../types/activation-type.js"
import type { TensorType } from "../../types/tensor-type.js"

export class ReLU implements ActivationFunction {
    func(x: Tensor): Tensor {
        return new Tensor((x.values() as TensorType[]).map((v) => {
            if((v as number) >= 0) {
                return v
            }
            else{
                return 0
            }
        }))
    }

    d(x: Tensor): Tensor {
        return new Tensor((x.values() as TensorType[]).map((v) => {
            if((v as number) > 0){
                return 1
            }
            else{
                return 0
            }
        }))
    }
}