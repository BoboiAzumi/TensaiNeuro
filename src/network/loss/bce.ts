import { Tensor } from "../../modules/tensor.js";
import type { LossFunction } from "../../types/loss-type.js";
import type { TensorType } from "../../types/tensor-type.js";
import { clip } from "../../utils/functional/clip.js";

export class BCELoss implements LossFunction {
    Y: Tensor[];
    T: Tensor[];

    constructor(){
        this.Y = []
        this.T = []

        return this
    }
    
    set(Y: Tensor[], T: Tensor[]): LossFunction {
        this.Y = Y
        this.T = T

        return this
    }

    get() {
        let sumBatch = 0;
        this.Y.map((v, i) => {
            let sum = 0;
            (v.values() as TensorType[]).map((w, j) => {
                const target = (this.T[i]?.values() as TensorType[])[j] as number;
                sum += (
                    (target * Math.log(clip(w as number))
                ) + (
                    (1 - target) * Math.log(1 - (clip(w as number)))
                ))
            })
            sumBatch += sum / (v.values() as TensorType[]).length
        })

        return -(sumBatch / this.Y.length)
    }

    dLoss(): Tensor[] {
        return this.Y.map((v, i) => {
            return new Tensor((v.values() as TensorType[]).map((w, j) => {
                const target = (this.T[i]?.values() as TensorType[])[j] as number;
                const dlossVal = (
                    (target / (clip(w as number))) 
                        - 
                    ((1 - target) / (1 - (clip(w as number))))
                )
                return - (dlossVal / this.Y.length)
            }))
        })
    }
}