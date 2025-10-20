import { Tensor } from "../../modules/tensor.js";
export function tensorMulOuter(a, b) {
    const tensorA = new Tensor(a);
    const tensorB = new Tensor(b);
    if (tensorA.size().length != 1 || tensorB.size().length != 1) {
        throw new Error("Required 1D Tensor");
    }
    return new Tensor(tensorA.values().map((v) => {
        return tensorB.values().map((w) => {
            return v * w;
        });
    }));
}
//# sourceMappingURL=tensor-mul-outer.js.map