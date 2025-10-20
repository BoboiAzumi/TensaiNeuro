import { maketab } from "../utils/functional/maketab.js";
export class Tensor {
    _tensor;
    constructor(tensor) {
        this._tensor = tensor;
    }
    update(tensor) {
        this._tensor = tensor;
    }
    size() {
        const length = [];
        const dive = (tensor) => {
            if (Array.isArray(tensor)) {
                length.push(tensor.length);
                if (Array.isArray(tensor[0]) && tensor[0].length != 0) {
                    dive(tensor[0]);
                }
            }
        };
        dive(this._tensor);
        return length;
    }
    unsqueeze(dim = 0) {
        if (!Array.isArray(this._tensor)) {
            this._tensor = [this._tensor];
            return this;
        }
        if (dim < 0) {
            dim = this.size().length + (dim + 1);
        }
        const dive = (tensor, thisDim) => {
            if (thisDim != dim && Array.isArray(tensor)) {
                return tensor.map((v) => {
                    return dive(v, thisDim + 1);
                });
            }
            return [tensor];
        };
        this._tensor = dive(this._tensor, 0);
        return this;
    }
    squeeze(dim = 0) {
        if (!Array.isArray(this._tensor)) {
            this._tensor = [this._tensor];
            return this;
        }
        if (dim < 0) {
            dim = (this.size().length + dim) - 1;
        }
        const dimension = this.size().length;
        const dive = (tensor, thisDim) => {
            let newTensor = [];
            if (thisDim != dim && Array.isArray(tensor)) {
                if (thisDim === (dimension - 1)) {
                    tensor.map((v) => {
                        if (Array.isArray(v)) {
                            v.map((w) => {
                                newTensor = newTensor.concat(w);
                            });
                        }
                    });
                    console.log(newTensor);
                    return newTensor;
                }
                return tensor.map((v) => {
                    return dive(v, thisDim + 1);
                });
            }
            if (Array.isArray(tensor)) {
                tensor.map((v) => {
                    newTensor = newTensor.concat(v);
                });
                return newTensor;
            }
            return tensor;
        };
        this._tensor = dive(this._tensor, 0);
        return this;
    }
    print() {
        const dimension = this.size().length;
        function dive(tensor, dim = 0) {
            if (Array.isArray(tensor) && dim < dimension - 1) {
                console.log(`${maketab(dim)}[`);
                tensor.map((v) => {
                    return dive(v, dim + 1);
                });
                console.log(`${maketab(dim)}]`);
                return;
            }
            process.stdout.write(`${maketab(dim)}`);
            console.log(tensor);
        }
        dive(this._tensor, 0);
    }
    transpose(dim = 0) {
        const dimension = this.size().length;
        if (dim > dimension) {
            throw new Error("Out of dimension");
        }
        if (dim < 0) {
            dim = dimension + dim;
        }
        const dive = (tensor, thisDim = 0) => {
            if (dim != thisDim && Array.isArray(tensor)) {
                return tensor.map((v) => dive(v, thisDim + 1));
            }
            if (Array.isArray(tensor) && Array.isArray(tensor[0])) {
                const rows = tensor.length;
                const cols = tensor[0].length;
                const out = [];
                for (let i = 0; i < cols; i++) {
                    const newRow = [];
                    for (let j = 0; j < rows; j++) {
                        const row = tensor[j];
                        if (!Array.isArray(row)) {
                            throw new Error("Cannot transpose 1D matrix");
                        }
                        if (row[i] === undefined) {
                            throw new Error("Cannot transpose irregular matrix");
                        }
                        newRow.push(row[i]);
                    }
                    out.push(newRow);
                }
                return out;
            }
            throw new Error("Cannot transpose 1D matrix");
        };
        this._tensor = dive(this._tensor, dim);
        return this;
    }
    values() {
        return this._tensor;
    }
}
//# sourceMappingURL=tensor.js.map