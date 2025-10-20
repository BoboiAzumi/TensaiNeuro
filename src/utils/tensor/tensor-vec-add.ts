import { Tensor } from "../../modules/tensor.js";
import type { TensorType } from "../../types/tensor-type.js";

export function tensorVecAdd(a: TensorType, b: TensorType){
    const tensorA: Tensor = new Tensor(a).transpose()
    const tensorB: Tensor = new Tensor(b)

    if(tensorA.size().length != 2 || tensorB.size().length != 1){
        throw new Error("Expected tensor A have 2D and B have 1D")
    }

    if(tensorA.size()[1] != tensorB.size()[0]){
        throw new Error(`Error dimension expected ${tensorB.size()[0]} have same ${tensorA.size()[1]}`)
    }

    return new Tensor((tensorA.values() as TensorType[]).map((v) => {
        return (v as TensorType[]).map((w, i) => {
            if(tensorB.values()){
                return (w as number) + ((tensorB.values() as TensorType[])[i] as number)
            }
            throw new Error("B is undefined")
        })
    }))
}