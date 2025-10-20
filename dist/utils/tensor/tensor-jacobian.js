import { Tensor } from "../../modules/tensor.js";
export function tensorJacobian(tensor) {
    const tensorInput = new Tensor(tensor);
    if (tensorInput.size().length != 1) {
        throw new Error("Expected 1d tensor");
    }
    return new Tensor(tensorInput.values().map((v, i) => {
        return tensorInput.values().map((w, j) => {
            if (i == j) {
                return v * (1 - v);
            }
            else {
                return -(v * w);
            }
        });
    }));
}
//# sourceMappingURL=tensor-jacobian.js.map