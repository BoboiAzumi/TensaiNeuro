import { Tensor } from "../../modules/tensor.js";
export function tensorDivScalar2d(a, scalar) {
    const tensorA = new Tensor(a);
    if (tensorA.size().length != 2) {
        throw new Error("Expected 2d tensor");
    }
    return new Tensor(tensorA.values().map((v, i) => {
        return v.map((w, j) => {
            return w / scalar;
        });
    }));
}
//# sourceMappingURL=tensor-div-scalar-2d.js.map