import { Tensor } from "../../modules/tensor.js"
import type { TensorType } from "../../types/tensor-type.js"

export function tensorPow1d(tensor: TensorType, pow: number){
    return new Tensor((tensor as TensorType[]).map((v) => {
        return Math.pow((v as number), pow)
    }))
}