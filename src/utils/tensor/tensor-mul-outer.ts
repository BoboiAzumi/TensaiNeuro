import { Tensor } from "../../modules/tensor.js"
import type { TensorType } from "../../types/tensor-type.js"

export function tensorMulOuter(a: TensorType, b: TensorType): Tensor {
    const tensorA = new Tensor(a)
    const tensorB = new Tensor(b)

    if(tensorA.size().length != 1 || tensorB.size().length != 1){
        throw new Error("Required 1D Tensor")
    }

    return new Tensor((tensorA.values() as TensorType[]).map((v) => {
        return (tensorB.values() as TensorType[]).map((w) => {
            return (v as number) * (w as number)
        })
    }))
}