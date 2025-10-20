import { Tensor } from "../../modules/tensor.js";
export function tensorAdd2d(a, b) {
    const tensorA = new Tensor(a);
    const tensorB = new Tensor(b);
    if (tensorA.size().length != 2 || tensorB.size().length != 2) {
        throw new Error("Expected 2d tensor");
    }
    return new Tensor(tensorA.values().map((v, i) => {
        return v.map((w, j) => {
            return w + tensorB.values()[i][j];
        });
    }));
}
//# sourceMappingURL=tensor-add-2d.js.map