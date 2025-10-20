import { Tensor } from "../../modules/tensor.js"
import type { TensorType } from "../../types/tensor-type.js"

export function tensorDivScalar1d(tensor: TensorType, scalar: number){
    return new Tensor((tensor as TensorType[]).map((v) => {
        return (v as number) / scalar
    }))
}