import { Tensor } from "../../modules/tensor.js";
import type { TensorType } from "../../types/tensor-type.js";

export function tensorMulScalar1d(a: TensorType, scalar: number){
    const tensorA = new Tensor(a)

    if(tensorA.size().length != 1){
        throw new Error("Expected 2d tensor")
    }

    return new Tensor((tensorA.values() as TensorType[]).map((v, i) => {
        return (v as number) * scalar
    }))
}