import { Tensor } from "../modules/tensor.js";
import { Linear } from "../network/activation/linear.js";
import { DenseLayer } from "../network/layer/dense-layer.js";
import { MSELoss } from "../network/loss/mse.js";
import { ADAM } from "../network/optimizer/adam.js";
const x = [
    [0.1, 0.2],
    [0.2, 0.3],
    [0.3, 0.4],
    [0.4, 0.5]
];
const y = [
    [0.3],
    [0.4],
    [0.5],
    [0.6]
];
const layer1 = new DenseLayer(2, 4, new Linear(), new ADAM());
const layer2 = new DenseLayer(4, 1, new Linear(), new ADAM());
const loss = new MSELoss();
const lr = 0.01;
for (let i = 0; i < 100; i++) {
    const out1 = layer1.forward([...x.map((v) => new Tensor(v))]);
    const out2 = layer2.forward(out1);
    loss.set(out2, [...y.map((v) => new Tensor(v))]);
    console.log(`Loss : ${loss.get()}`);
    const backward = layer2.backward(loss.dLoss());
    layer1.backward(backward);
    layer2.update(lr);
    layer1.update(lr);
}
const out1 = layer1.forward([...x.map((v) => new Tensor(v))]);
const out2 = layer2.forward(out1);
out2.map((v) => v.print());
//# sourceMappingURL=simple-regression.js.map