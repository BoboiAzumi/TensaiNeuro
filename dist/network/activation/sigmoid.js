import { Tensor } from "../../modules/tensor.js";
export class Sigmoid {
    func(x) {
        return new Tensor(x.values()
            .map((v) => 1 / (1 + Math.exp(-v))));
    }
    d(x) {
        const sigmoid = this.func(x);
        return new Tensor(sigmoid.values()
            .map((v, i) => v * (1 - v)));
    }
}
//# sourceMappingURL=sigmoid.js.map