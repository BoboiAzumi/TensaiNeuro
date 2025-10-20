import { Tensor } from "../../modules/tensor.js"
import type { TensorType } from "../../types/tensor-type.js"

export function tensorPow2d(tensor: TensorType, pow: number){
    return new Tensor((tensor as TensorType[]).map((v) => {
        return (v as TensorType[]).map((w) => {
            return Math.pow((w as number), pow)
        })
    }))
}