import { Tensor } from "../../modules/tensor.js";
export function tensorSubScalar1d(tensor, scalar) {
    return new Tensor(tensor.map((v) => {
        return v / scalar;
    }));
}
//# sourceMappingURL=tensor-sub-scalar-1d.js.map