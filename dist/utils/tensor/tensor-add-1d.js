import { Tensor } from "../../modules/tensor.js";
export function tensorAdd1d(a, b) {
    const tensorA = new Tensor(a);
    const tensorB = new Tensor(b);
    if (tensorA.size().length != 1 || tensorB.size().length != 1) {
        throw new Error("Expected 1d tensor");
    }
    return new Tensor(tensorA.values().map((v, i) => {
        return v + tensorB.values()[i];
    }));
}
//# sourceMappingURL=tensor-add-1d.js.map