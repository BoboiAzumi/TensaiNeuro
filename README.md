
# TensaiNeuro.js

[![npm version](https://img.shields.io/npm/v/project-name.svg)](https://www.npmjs.com/package/project-name)
[![Build Status](https://img.shields.io/github/actions/workflow/status/BoboiAzumi/TensaiNeuro/ci.yml)](https://github.com/BoboiAzumi/TensaiNeuro/actions)

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

```

Menggunakan gaya Module
```ts

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