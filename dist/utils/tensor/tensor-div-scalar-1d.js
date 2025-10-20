import { Tensor } from "../../modules/tensor.js";
export function tensorDivScalar1d(tensor, scalar) {
    return new Tensor(tensor.map((v) => {
        return v / scalar;
    }));
}
//# sourceMappingURL=tensor-div-scalar-1d.js.map