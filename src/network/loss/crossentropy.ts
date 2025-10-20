import { Tensor } from "../../modules/tensor.js";
import type { LossFunction } from "../../types/loss-type.js";
import type { TensorType } from "../../types/tensor-type.js";
import { clip } from "../../utils/functional/clip.js";

export class CrossEntropyLoss implements LossFunction {
    Y: Tensor[];
    T: Tensor[];

    constructor(){
        this.T = []
        this.Y = []

        return this
    }
    
    set(Y: Tensor[], T: Tensor[]): LossFunction {
        this.Y = Y
        this.T = T

        return this
    }

    get(){
        let sumBatch = 0
        this.Y.map((v, i) => {
            let sum = 0;
            (v.values() as TensorType[]).map((w, j) => {
                const target = (this.T[i]?.values() as TensorType[])[j] as number;
                sum += (target * Math.log(clip(w as number)))
            })
            sumBatch += -sum
        })

        return sumBatch / this.Y.length
    }

    dLoss(): Tensor[] {
        return this.Y.map((v, i) => {
            return new Tensor((v.values() as TensorType[]).map((w, j) => {
                const Ti = (this.T[i]?.values() as TensorType[])[j] as number
                
                return Ti == 0 ? 0 : -(Ti / clip(w as number))
            }))
        })
    }

    // dLoss(): Tensor {
    //     // return this.Y.map((v, i) => -this.T[i] / v);
    //     return this.Y.map((v, i) => v - this.T[i])
    // }
}