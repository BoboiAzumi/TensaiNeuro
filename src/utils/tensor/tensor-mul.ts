import { Tensor } from "../../modules/tensor.js";
import type { TensorType } from "../../types/tensor-type.js";

export function tensorMul(a: TensorType, b: TensorType){
    const tensorA: Tensor = new Tensor(a)
    const tensorB: Tensor = new Tensor(b).transpose()

    if(tensorA.size().length != 2 || tensorB.size().length != 2){
        throw new Error(`Error dimension: Expected 2D tensor`)
    }

    if(tensorA.size().length != tensorB.size().length){
        throw new Error(`Error dimension: Expected A have same dimension with B`)
    }

    return new Tensor((tensorA.values() as TensorType[]).map((v) => {
        return (tensorB.values() as TensorType[]).map((w) => {
            let sum: number = 0;
            if((v as TensorType[]).length != (w as TensorType[]).length){
                throw new Error(`Error dimension: Expected A have same dimension with B`)
            }
            (v as TensorType[]).map((x, i) => {
                sum += (x as number) * ((w as TensorType[])[i] as number)
            })
            return sum
        })
    }))
}