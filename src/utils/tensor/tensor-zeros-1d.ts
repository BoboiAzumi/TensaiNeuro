import { Tensor } from "../../modules/tensor.js";

export function tensorZeros1d(size: number){
    return new Tensor(
        new Array(size).fill(0)
    )
}