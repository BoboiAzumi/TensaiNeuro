import { Tensor } from "../../modules/tensor.js";
export function tensorVecAdd(a, b) {
    const tensorA = new Tensor(a).transpose();
    const tensorB = new Tensor(b);
    if (tensorA.size().length != 2 || tensorB.size().length != 1) {
        throw new Error("Expected tensor A have 2D and B have 1D");
    }
    if (tensorA.size()[1] != tensorB.size()[0]) {
        throw new Error(`Error dimension expected ${tensorB.size()[0]} have same ${tensorA.size()[1]}`);
    }
    return new Tensor(tensorA.values().map((v) => {
        return v.map((w, i) => {
            if (tensorB.values()) {
                return w + tensorB.values()[i];
            }
            throw new Error("B is undefined");
        });
    }));
}
//# sourceMappingURL=tensor-vec-add.js.map