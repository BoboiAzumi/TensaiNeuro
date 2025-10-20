import { Tensor } from "../../modules/tensor.js";
export function tensorMulHadamard(a, b) {
    const tensorA = new Tensor(a);
    const tensorB = new Tensor(b);
    if (tensorA.size().length != 2 || tensorB.size().length != 2) {
        throw new Error(`Error dimension: Expected 2D tensor`);
    }
    if (tensorA.size().length != tensorB.size().length) {
        throw new Error(`Error dimension: Expected A have same dimension with B`);
    }
    return new Tensor(tensorA.values().map((v, i) => {
        return v.map((w, j) => {
            return w * tensorB.values()[i][j];
        });
    }));
}
//# sourceMappingURL=tensor-mul-hadamard.js.map