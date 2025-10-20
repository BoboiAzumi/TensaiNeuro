import { Tensor } from "../../modules/tensor.js";
export function tensorPow1d(tensor, pow) {
    return new Tensor(tensor.map((v) => {
        return Math.pow(v, pow);
    }));
}
//# sourceMappingURL=tensor-pow-1d.js.map