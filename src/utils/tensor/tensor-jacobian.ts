import { Tensor } from "../../modules/tensor.js"
import type { TensorType } from "../../types/tensor-type.js"

export function tensorJacobian(tensor: TensorType){
    const tensorInput = new Tensor(tensor)

    if(tensorInput.size().length != 1){
        throw new Error("Expected 1d tensor")
    }

    return new Tensor((tensorInput.values() as TensorType[]).map((v, i) => {
        return (tensorInput.values() as TensorType[]).map((w, j) => {
            if(i == j) {
                return (v as number) * (1 - (v as number))
            }
            else{
                return -((v as number) * (w as number))
            }
        })
    }))
}