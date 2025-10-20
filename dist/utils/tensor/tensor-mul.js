import { Tensor } from "../../modules/tensor.js";
export function tensorMul(a, b) {
    const tensorA = new Tensor(a);
    const tensorB = new Tensor(b).transpose();
    if (tensorA.size().length != 2 || tensorB.size().length != 2) {
        throw new Error(`Error dimension: Expected 2D tensor`);
    }
    if (tensorA.size().length != tensorB.size().length) {
        throw new Error(`Error dimension: Expected A have same dimension with B`);
    }
    return new Tensor(tensorA.values().map((v) => {
        return tensorB.values().map((w) => {
            let sum = 0;
            if (v.length != w.length) {
                throw new Error(`Error dimension: Expected A have same dimension with B`);
            }
            v.map((x, i) => {
                sum += x * w[i];
            });
            return sum;
        });
    }));
}
//# sourceMappingURL=tensor-mul.js.map