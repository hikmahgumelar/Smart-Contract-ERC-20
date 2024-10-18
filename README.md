***Membuat token sendiri dengan hardhat di hemi network***

untuk pembuatan token pada dasarnya sama jadi untuk deploy token ERC-20 bisa di semua network yang support EVM.

yang dibutuhkan adalah 
- nodejs
- package hardhat


**Step-step pembuatan token**

1. Buat Direktori Proyek Buat folder di komputer lo dan beri nama TestToken. Folder ini akan jadi direktori proyek yang menyimpan semua elemen dan kode yang dibutuhkan untuk melakukan deploy token ERC-20.

2. Inisialisasi Proyek NPM Di dalam direktori TestToken, buka terminal dan inisialisasi proyek Node.js:

   $ npm init -y

3. Install Hardhat & Ethers.js Plugin Install Hardhat, plugin Ethers.js, dan library OpenZeppelin contracts:

   $ npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts

4. Buat Proyek Hardhat 
   4a. Di dalam proyek Node.js, mulai proyek Hardhat:
   
   $ npx hardhat init

   4b. Pilih opsi Create an empty hardhat.config.js.

5. Tambahkan Folder Di direktori root proyek, buat folder contracts dan scripts:

   $ mkdir contracts && mkdir scripts

6. Tulis Kontrak Token Di folder contracts, buat file bernama MyToken.sol. Ini adalah contoh dasar kontrak ERC-20:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
```
Kode ini mendefinisikan token ERC-20 sederhana dengan suplai awal dan fungsionalitas dasar ERC-20.

7. Compile Kontrak Jalankan perintah ini untuk meng-compile kontrak lo:

   $ npx hardhat compile
8. Amankan Private Key untuk Deployment 
   8a. Ekspor Private Key dari MetaMask:

      - Buka MetaMask, pilih ikon akun lo, dan buka Account Details
      - Pilih Show private key
      - Masukkan password, konfirmasi, dan unlock untuk melihat private key lo.
   
   8b. Install package dotenv:

       $ npm install dotenv
   8c. Buat file .env di direktori root proyek:

       $ touch .env
   8d. Buka file .env dengan CLI editor bisa menggunakan vscode, vim, nano dan lain-lain:

       nano .env
   8e. Tambahkan private key lo ke file .env:

       PRIVATE_KEY=private_key_yang_di_export
       
       Pastikan file ini nggak pernah dibagikan atau di-commit ke version control.

       Contoh isi file .gitignore:

       node_modules/
       .env
       artifacts/
       cache/
9. Konfigurasi Hardhat untuk Testnet 
   9a. Buka file hardhat.config.js di proyek lo.

   9b. Konfigurasi jaringan Hemi:

      Tambahkan modul yang dibutuhkan di bagian atas file config dan atur jaringan Hemi di dalam module.exports. Pastikan URL, Chain ID, dan private key lo sudah benar (private key harus disimpan di variabel environment untuk keamanan).

      Contoh konfigurasi:
```
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hemi: {
      url: "https://testnet.rpc.hemi.network/rpc",
      chainId: 743111,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
```

10. Tulis Skrip Deployment Di folder scripts, buat file bernama deploy.js untuk menulis skrip deploy kontrak:

```
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const initialSupply = ethers.utils.parseUnits("1000", "ether");

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(initialSupply);

    console.log("Token deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
```
Skrip ini akan melakukan deploy MyToken dengan suplai awal (sesuaikan sesuai kebutuhan).

11. Deploy Kontrak Jalankan perintah berikut untuk melakukan deploy kontrak ke jaringan Hemi:
    $ npx hardhat run scripts/deploy.js --network hemi
    Jika deploy berhasil, lo akan melihat pesan yang menunjukkan bahwa token berhasil di-deploy:

    ***Token deployed to: 0x5fc5c2265E4f77E63e82f7F10FE803d04Cc53D82***
    Untuk melihat detail kontrak yang telah di-deploy, masukkan alamat kontrak tersebut ke explorer Hemi Testnet. Di situ lo bisa lihat informasi mengenai transaksi dan status kontraknya.

atau untuk lebih jelasnya lo bisa ke url berikut https://docs.hemi.xyz/how-to-tutorials/tutorials/erc-20


Referensi: https://docs.hemi.xyz

