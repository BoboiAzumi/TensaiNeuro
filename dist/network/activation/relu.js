import { Tensor } from "../../modules/tensor.js";
export class ReLU {
    func(x) {
        return new Tensor(x.values().map((v) => {
            if (v >= 0) {
                return v;
            }
            else {
                return 0;
            }
        }));
    }
    d(x) {
        return new Tensor(x.values().map((v) => {
            if (v > 0) {
                return 1;
            }
            else {
                return 0;
            }
        }));
    }
}
//# sourceMappingURL=relu.js.map