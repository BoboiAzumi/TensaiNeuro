import { FCModule } from "../modules/fc-module.js"
import { Tensor } from "../modules/tensor.js"
import { Softmax } from "../network/activation/softmax.js"
import { CrossEntropyLoss } from "../network/loss/crossentropy.js"
import type { TensorType } from "../types/tensor-type.js"

// Simulasi dataset (input dengan 2 fitur)
const x = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

// Simulasi dataset (output dengan 2 fitur)
const y = [
    [0, 1],
    [1, 0],
    [1, 0],
    [0, 1]
]

// Defenisi fungsi loss Crossentropy
const loss = new CrossEntropyLoss()
// Defenisi fungsi softmax
const softmax = new Softmax()
const model = new FCModule(
    2, // Input Shape = 2
    "adam", // Optimizer = "adam" | "sgd"
    [   
        // Layer 1
        { units: 16, activationFunction: "relu"},
        // Layer 2 (output shape = 1)  
        { units: 2, activationFunction: "linear"} 
    ]
)

model.setLossCalcFunction((predicted: Tensor[], actual: Tensor[]) => {
    // Konversi logits ke softmax
    const logitsToSoftmax = predicted.map((v) => softmax.func(v))

    loss.set(logitsToSoftmax, actual)
    return {
        dLoss: softmax.d(logitsToSoftmax, loss.dLoss()),
        loss: loss.get()
    }
})

// Training
// input, target, epochs, learning rate, batch size
model.fit(x, y, 500, 0.01, 1);

// Testing
const datatest = x.map((v) => new Tensor(v));
const pred = model.predict(datatest);

// Tampilkan Hasil
console.log("Actual : ")
new Tensor(y).print()
console.log("Predict : ")
new Tensor(pred.output?.map((v) => {
    return softmax.func(v).values()
}) as TensorType).print()