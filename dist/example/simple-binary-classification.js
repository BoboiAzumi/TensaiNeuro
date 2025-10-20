import { FCModule } from "../modules/fc-module.js";
import { Tensor } from "../modules/tensor.js";
import { BCELoss } from "../network/loss/bce.js";
const x = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
const y = [
    [0],
    [1],
    [1],
    [0]
];
const loss = new BCELoss();
const model = new FCModule(2, // Input Shape
"adam", // Optimizer
[
    { units: 16, activationFunction: "relu" }, // Layer 1
    { units: 1, activationFunction: "sigmoid" } // Layer 2 (output shape = 1)
]);
model.setLossCalcFunction((predicted, actual) => {
    loss.set(predicted, actual);
    return {
        dLoss: loss.dLoss(),
        loss: loss.get()
    };
});
model.fit(x, y, 100, 0.01, 1);
model.predict(x.map((v) => new Tensor(v))).output.map((v) => v.print());
//# sourceMappingURL=simple-binary-classification.js.map