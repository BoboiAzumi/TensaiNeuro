import { Tensor } from "../../modules/tensor.js";

export function tensorZeros2d(rows: number, cols: number){
    const data = Array.from({ length: rows }, () => 
        new Array(cols).fill(0)
    );
    return new Tensor(data);
}