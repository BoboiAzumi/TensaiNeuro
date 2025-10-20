import type { Tensor } from "../../modules/tensor.js";

export class BatchLoader {
    x: Tensor[];
    y: Tensor[];
    batch: number
    index: number = -1

    constructor(x: Tensor[], y: Tensor[], batch: number){
        this.x = x
        this.y = y
        this.batch = batch
    }

    hasNext(){
        if(this.x.length - ((this.index + 2) * this.batch) + this.batch < this.batch){
            return false
        }
        return true
    }

    next(){
        this.index += 1
        return {
            x: this.x.slice(this.index * this.batch, (this.index * this.batch) + this.batch),
            y: this.y.slice(this.index * this.batch, (this.index * this.batch) + this.batch)
        }
    }
}