import { Tensor } from "../../modules/tensor.js";
export class MSELoss {
    Y;
    T;
    constructor() {
        this.Y = [];
        this.T = [];
        return this;
    }
    set(Y, T) {
        this.Y = Y;
        this.T = T;
        return this;
    }
    get() {
        let sumBatch = 0;
        this.Y.map((v, i) => {
            let sum = 0;
            v.values().map((v, j) => {
                const target = (this.T[i]?.values())[j];
                sum += Math.pow(target - v, 2);
            });
            sumBatch += sum;
        });
        return sumBatch / (this.Y.length * this.Y[0]?.size()[0]);
    }
    dLoss() {
        return this.Y.map((v, i) => {
            return new Tensor(v.values().map((w, j) => {
                const target = (this.T[i]?.values())[j];
                return (w - target) * (2 / (this.Y.length * this.Y[0]?.size()[0]));
            }));
        });
    }
}
//# sourceMappingURL=mse.js.map