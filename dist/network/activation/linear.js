import { Tensor } from "../../modules/tensor.js";
export class Linear {
    func(x) {
        return x;
    }
    d(x) {
        return new Tensor(x.values().map((v) => {
            return 1;
        }));
    }
}
//# sourceMappingURL=linear.js.map