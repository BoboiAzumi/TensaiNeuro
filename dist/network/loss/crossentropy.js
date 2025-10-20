import { Tensor } from "../../modules/tensor.js";
import { clip } from "../../utils/functional/clip.js";
export class CrossEntropyLoss {
    Y;
    T;
    constructor() {
        this.T = [];
        this.Y = [];
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
                sum += (target * Math.log(clip(w)));
            });
            sumBatch += -sum;
        });
        return sumBatch / this.Y.length;
    }
    dLoss() {
        return this.Y.map((v, i) => {
            return new Tensor(v.values().map((w, j) => {
                const Ti = (this.T[i]?.values())[j];
                return Ti == 0 ? 0 : -(Ti / clip(w));
            }));
        });
    }
}
//# sourceMappingURL=crossentropy.js.map