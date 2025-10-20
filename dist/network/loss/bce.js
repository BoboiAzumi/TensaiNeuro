import { Tensor } from "../../modules/tensor.js";
import { clip } from "../../utils/functional/clip.js";
export class BCELoss {
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
            v.values().map((w, j) => {
                const target = (this.T[i]?.values())[j];
                sum += ((target * Math.log(clip(w))) + ((1 - target) * Math.log(1 - (clip(w)))));
            });
            sumBatch += sum / v.values().length;
        });
        return -(sumBatch / this.Y.length);
    }
    dLoss() {
        return this.Y.map((v, i) => {
            return new Tensor(v.values().map((w, j) => {
                const target = (this.T[i]?.values())[j];
                const dlossVal = ((target / (clip(w)))
                    -
                        ((1 - target) / (1 - (clip(w)))));
                return -(dlossVal / this.Y.length);
            }));
        });
    }
}
//# sourceMappingURL=bce.js.map