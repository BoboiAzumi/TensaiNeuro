import { Tensor } from "../../modules/tensor.js";
import type { TensorType } from "../../types/tensor-type.js";

export function tensorMulHadamard(a: TensorType, b: TensorType){
    const tensorA: Tensor = new Tensor(a)
    const tensorB: Tensor = new Tensor(b)

    if(tensorA.size().length != 2 || tensorB.size().length != 2){
        throw new Error(`Error dimension: Expected 2D tensor`)
    }

    if(tensorA.size().length != tensorB.size().length){
        throw new Error(`Error dimension: Expected A have same dimension with B`)
    }

    return new Tensor((tensorA.values() as TensorType[]).map((v, i) => {
        return (v as TensorType[]).map((w, j) => {
            return (w as number) * (((tensorB.values() as TensorType[])[i] as number[])[j] as number)
        })
    }))
}