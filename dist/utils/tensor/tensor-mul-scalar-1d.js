import { Tensor } from "../../modules/tensor.js";
export function tensorMulScalar1d(a, scalar) {
    const tensorA = new Tensor(a);
    if (tensorA.size().length != 1) {
        throw new Error("Expected 2d tensor");
    }
    return new Tensor(tensorA.values().map((v, i) => {
        return v * scalar;
    }));
}
//# sourceMappingURL=tensor-mul-scalar-1d.js.map