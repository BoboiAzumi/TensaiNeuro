import { FCModule } from "./modules/fc-module.js";
import { Tensor } from "./modules/tensor.js";
import { BCELoss } from "./network/loss/bce.js";
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
const model = new FCModule(2, "adam", [
    { units: 8, activationFunction: "relu" },
    { units: 1, activationFunction: "sigmoid" }
]);
model.setLossCalcFunction((predicted, actual) => {
    loss.set(predicted, actual);
    return {
        dLoss: loss.dLoss(),
        loss: loss.get()
    };
});
model.fit(x, y, 100, 0.01, 2);
model.predict(x.map((v) => new Tensor(v))).output.map((v) => v.print());
//# sourceMappingURL=test-module.js.map