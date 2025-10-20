import { Tensor } from "../../modules/tensor.js";
import type { LossFunction } from "../../types/loss-type.js";
import type { TensorType } from "../../types/tensor-type.js";

export class MSELoss implements LossFunction {
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

    get(){
        let sumBatch = 0
        this.Y.map((v, i) => {
            let sum = 0;
            (v.values() as TensorType[]).map((v, j) => {
                const target = (this.T[i]?.values() as TensorType[])[j] as number;
                sum += Math.pow(target - (v as number), 2)
            })
            sumBatch += sum
        })
        return sumBatch / (this.Y.length * (this.Y[0]?.size()[0] as number))
    }

    dLoss(): Tensor[] {
        return this.Y.map((v, i) => {
            return new Tensor((v.values() as TensorType[]).map((w, j) => {
                const target = (this.T[i]?.values() as TensorType[])[j] as number;
                return ((w as number) - target) * (2 / (this.Y.length * (this.Y[0]?.size()[0] as number)))
            }))
        })
    }
}