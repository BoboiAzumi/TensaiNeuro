import { Tensor } from "../../modules/tensor.js";
import { clip } from "../../utils/functional/clip.js";
export class Tanh {
    func(x) {
        return new Tensor(x.values().map((v) => {
            const ex = Math.pow(clip(v), Math.E);
            const emx = Math.pow(clip(v), -Math.E);
            return (ex - emx) / (ex + emx);
        }));
    }
    d(x) {
        const tanhVals = this.func(x);
        return new Tensor(tanhVals.values().map((v) => 1 - v * v));
    }
}
//# sourceMappingURL=tanh.js.map