import { Tensor } from "../../modules/tensor.js";
export function tensorPow2d(tensor, pow) {
    return new Tensor(tensor.map((v) => {
        return v.map((w) => {
            return Math.pow(w, pow);
        });
    }));
}
//# sourceMappingURL=tensor-pow-2d.js.map