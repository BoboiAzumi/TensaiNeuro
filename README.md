
# TensaiNeuro.js

[![npm version](https://img.shields.io/npm/v/project-name.svg)](https://www.npmjs.com/package/project-name)

>Library Neural Network sederhana yang dibangun dengan Typescript

## 🧩 Tentang

TensaiNeuro.js adalah library neural network kecil dan ringan yang ditulis dengan TypeScript untuk penggunaan pendidikan dan eksperimen. Library ini menyediakan utilitas tensor 1D/2D sederhana, modul fully-connected (FC), berbagai fungsi aktivasi, inisialisasi bobot, loss functions, dan optimizer (SGD, ADAM). Cocok untuk memahami dasar backpropagation dan membangun contoh regresi/binary classification.

## ✨ Fitur utama

- Modul FC (fully-connected) sederhana dan tipe Tensor ringan
- Fungsi aktivasi: Linear, ReLU, Sigmoid, Softmax, Tanh
- Inisialisasi bobot: He, Xavier, Random, Zero
- Loss: Binary Cross-Entropy (BCE), Cross-Entropy, Mean Squared Error (MSE)
- Optimizer: SGD, ADAM

## Instalasi

```bash
npm install tensaineuro
```

## 🚀 Penggunaan singkat

Menggunakan gaya Torch like

```ts
import { ADAM, DenseLayer, Linear, MSELoss, ReLU, Tensor } from "tensaineuro"

// Simulasi dataset (input dengan 2 fitur)
const x = [
    [0.1, 0.2],
    [0.2, 0.3],
    [0.3, 0.4],
    [0.4, 0.5]
]

// Simulasi dataset (output dengan 1 fitur)
const y = [
    [0.3],
    [0.4],
    [0.5],
    [0.6]
]

// Mendefenisikan layer
const layer1 = new DenseLayer(2, 4, new ReLU(), new ADAM())
const layer2 = new DenseLayer(4, 1, new Linear(), new ADAM())

// Mendefenisikan fungsi loss
const loss = new MSELoss()

// learning rate
const lr = 0.01

// Melatih jaringan syaraf tiruan
for(let i = 0; i < 1000; i++){
    // Input dengan batch size penuh
    const out1 = layer1.forward([...x.map((v) => new Tensor(v))])
    const out2 = layer2.forward(out1)

    // Hitung loss
    loss.set(
        out2,
        [...y.map((v) => new Tensor(v))]
    )

    // Tampilkan loss per epochs
    console.log(`Loss : ${loss.get()}`)

    // Backpropagation
    const backward = layer2.backward(loss.dLoss())
    layer1.backward(backward)

    // Update layer
    layer2.update(lr)
    layer1.update(lr)
}

// Testing
const out1 = layer1.forward([...x.map((v) => new Tensor(v))])
const out2 = layer2.forward(out1)

// Tampilkan hasil
out2.map((v) => v.print())
```

Menggunakan gaya Module
```ts
import { BCELoss, FCModule, Tensor } from "tensaineuro"

// Simulasi dataset (input dengan 2 fitur)
const x = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

// Simulasi dataset (output dengan 1 fitur)
const y = [
    [0],
    [1],
    [1],
    [0]
]

// Defenisi fungsi loss Binary Crossentropy
const loss = new BCELoss()
// Membuat model
const model = new FCModule(
    2, // Input Shape = 2
    "adam", // Optimizer = "adam" | "sgd"
    [   
        // Layer 1
        { units: 16, activationFunction: "relu"},
        // Layer 2 (output shape = 1)  
        { units: 1, activationFunction: "sigmoid"} 
    ]
)

// Mengatur fungsi perhitungan loss
// Kustomisasi bagian ini
model.setLossCalcFunction((predicted: Tensor[], actual: Tensor[]) => {
    loss.set(predicted, actual)
    return {
        dLoss: loss.dLoss(),
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
pred.output?.map((v) => {
    v.print()
})
```
## Klasifikasi Multi kelas
```ts
import { CrossEntropyLoss, FCModule, Softmax, Tensor, TensorType } from "tensaineuro"

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
```

## Kontribusi

Kontribusi sangat disambut. Beberapa panduan singkat:

1. Fork repository
2. Tambah fitur atau perbaiki bug di branch baru
3. Tambah/ubah test (jika ada) dan pastikan build TypeScript lulus
4. Buat pull request dengan deskripsi perubahan

Untuk pengembangan lokal, gunakan `npm run dev` untuk menjalankan file TypeScript cepat menggunakan `tsx`, dan `npm run build` untuk menghasilkan output produksi.

## Lisensi

Distribusi di bawah Lisensi MIT.
```
MIT License

Copyright (c) 2025 Naufal Azmi / BoboiAzumi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```