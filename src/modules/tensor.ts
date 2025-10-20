import type { TensorType } from "../types/tensor-type.js";
import { maketab } from "../utils/functional/maketab.js";

export class Tensor {
    _tensor: TensorType;
    constructor(tensor: TensorType){
        this._tensor = tensor;
    }

    update(tensor: TensorType){
        this._tensor = tensor;
    }

    size(): number[] {
        const length: number[] = [];
        const dive = (tensor: TensorType) => {
            if(Array.isArray(tensor)){
                length.push(tensor.length);

                if(Array.isArray(tensor[0]) && tensor[0].length != 0){
                    dive(tensor[0])
                }
            }
        }

        dive(this._tensor)

        return length
    }

    unsqueeze(dim: number = 0){
        if(!Array.isArray(this._tensor)){
            this._tensor = [this._tensor]
            return this
        }

        if(dim < 0) {
            dim = this.size().length + (dim + 1)
        }
        
        const dive = (tensor: TensorType, thisDim: number): TensorType => {
            if(thisDim != dim && Array.isArray(tensor)){
                return tensor.map((v) => {
                    return dive(v, thisDim + 1);
                }) as TensorType
            }
            return [tensor] as TensorType;
        }

        this._tensor = dive(this._tensor, 0);

        return this;
    }

    squeeze(dim: number = 0){
        if(!Array.isArray(this._tensor)){
            this._tensor = [this._tensor]
            return this
        }

        if(dim < 0) {
            dim = (this.size().length + dim) - 1
        }

        const dimension = this.size().length

        const dive = (tensor: TensorType, thisDim: number): TensorType => {
            let newTensor: TensorType = []
            if(thisDim != dim && Array.isArray(tensor)){
                if(thisDim === (dimension - 1)){
                    tensor.map((v) => {
                        if(Array.isArray(v)){
                            v.map((w) => {
                                newTensor = (newTensor as TensorType[]).concat(w)
                            })
                        }
                    })
                    console.log(newTensor)
                    return newTensor
                }

                return tensor.map((v) => {
                    return dive(v, thisDim + 1);
                }) as TensorType
            }
            
            if(Array.isArray(tensor)){
                tensor.map((v) => {
                    newTensor = (newTensor as TensorType[]).concat(v)
                })
                return newTensor
            }

            return tensor;
        }

        this._tensor = dive(this._tensor, 0);

        return this;
    }

    print(){
        const dimension = this.size().length
        function dive(tensor: TensorType, dim: number = 0){
            if(Array.isArray(tensor) && dim < dimension - 1){
                console.log(`${maketab(dim)}[`)
                tensor.map((v) => {
                    return dive(v, dim+1)
                })
                console.log(`${maketab(dim)}]`)
                return
            }
            process.stdout.write(`${maketab(dim)}`)
            console.log(tensor)
        }

        dive(this._tensor, 0)
    }

    transpose(dim: number = 0): Tensor {
        const dimension = this.size().length

        if(dim > dimension){
            throw new Error("Out of dimension")
        }

        if(dim < 0) {
            dim = dimension + dim
        }

        const dive = (tensor: TensorType, thisDim: number = 0): TensorType => {
            if(dim != thisDim && Array.isArray(tensor)){
                return tensor.map((v) => dive(v, thisDim + 1))
            }

            if(Array.isArray(tensor) && Array.isArray(tensor[0])){
                const rows = tensor.length;
                const cols = (tensor[0] as TensorType[]).length;
                
                const out: TensorType[] = [];
                for (let i = 0; i < cols; i++) {
                    const newRow: TensorType[] = [];
                    for (let j = 0; j < rows; j++) {
                        const row = tensor[j];
                        if (!Array.isArray(row)) {
                            throw new Error("Cannot transpose 1D matrix");
                        }
                        if (row[i] === undefined) {
                            throw new Error("Cannot transpose irregular matrix");
                        }
                        newRow.push(row[i] as TensorType);
                    }
                    out.push(newRow as TensorType);
                }
                return out as TensorType;
            }

            throw new Error("Cannot transpose 1D matrix")
        }

        this._tensor = dive(this._tensor, dim)

        return this
    }

    values(){
        return this._tensor
    }
}