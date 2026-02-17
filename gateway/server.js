const express = require('express');
const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const bitcoin = require('bitcoinjs-lib');
const { ethers } = require('ethers');
const solana = require('@solana/web3.js');
const cors = require('cors');
const axios = require('axios'); // Required for fetching real prices

const app = express();
app.use(express.json());
app.use(cors());

// Initialize HD Wallet Tools
const bip32 = BIP32Factory(ecc);

// --- CONFIGURATION ---
const BTC_NETWORK = bitcoin.networks.testnet; 
const ETH_RPC = "https://rpc.ankr.com/eth_goerli";
const SOL_RPC = "https://api.devnet.solana.com";

// --- 1. WALLET GENERATION ENGINE ---
app.post('/api/wallet/create', async (req, res) => {
    try {
        const { mnemonic } = req.body;
        
        if (!bip39.validateMnemonic(mnemonic)) {
            return res.status(400).json({ error: "Invalid Mnemonic" });
        }

        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed);

        // A. BITCOIN
        const btcChild = root.derivePath("m/84'/1'/0'/0/0");
        const { address: btcAddress } = bitcoin.payments.p2wpkh({ 
            pubkey: btcChild.publicKey, 
            network: BTC_NETWORK 
        });

        // B. ETHEREUM
        const ethWallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
        const ethAddress = ethWallet.address;

        // C. SOLANA
        const solKeypair = solana.Keypair.generate(); 
        const solAddress = solKeypair.publicKey.toBase58();

        res.json({
            status: "success",
            assets: [
                { symbol: "BTC", address: btcAddress, network: "Testnet" },
                { symbol: "ETH", address: ethAddress, network: "Goerli" },
                { symbol: "SOL", address: solAddress, network: "Devnet" }
            ]
        });

    } catch (error) {
        console.error("Wallet Creation Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// --- 2. BALANCE CHECKER ENGINE ---
app.get('/api/balance/:chain/:address', async (req, res) => {
    const { chain, address } = req.params;
    try {
        let balance = 0.0;

        if (chain === 'ETH') {
            const provider = new ethers.JsonRpcProvider(ETH_RPC);
            const rawBalance = await provider.getBalance(address);
            balance = ethers.formatEther(rawBalance);
        }
        else if (chain === 'SOL') {
            const connection = new solana.Connection(SOL_RPC);
            const pubKey = new solana.PublicKey(address);
            const rawBalance = await connection.getBalance(pubKey);
            balance = rawBalance / 1000000000; 
        }
        
        res.json({ chain, address, balance: parseFloat(balance), status: "synced" });

    } catch (error) {
        console.error("Balance Check Error:", error);
        res.status(500).json({ error: "Failed to fetch balance" });
    }
});

// --- 3. REAL-TIME MARKET DATA ENGINE (Added for Production Grade) ---
app.get('/api/price/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        // Map symbols to CoinCap IDs
        const idMap = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'SOL': 'solana',
            'XLM': 'stellar',
            'DOGE': 'dogecoin',
            'BNB': 'binance-coin',
            'XRP': 'xrp',
            'ADA': 'cardano',
            'AVAX': 'avalanche-2',
            'DOT': 'polkadot',
            'MATIC': 'polygon',
            'LTC': 'litecoin',
            'TRX': 'tron',
            'LINK': 'chainlink',
            'BCH': 'bitcoin-cash',
            'UNI': 'uniswap',
            'NEAR': 'near-protocol',
            'SHIB': 'shiba-inu',
            'PEPE': 'pepe'
        };

        const id = idMap[symbol.toUpperCase()];
        if (!id) return res.json({ price_usd: 0.00, source: "Unknown" });

        const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
        const price = parseFloat(response.data.data.priceUsd);

        res.json({ 
            symbol: symbol.toUpperCase(), 
            price_usd: price,
            source: "CoinCap (Live)"
        });

    } catch (error) {
        console.error(`Price Fetch Error for ${symbol}:`, error.message);
        res.status(500).json({ price_usd: 0.00, source: "Error" });
    }
});

const PORT = 3003;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fortress Universal Gateway running on port ${PORT}`);
});
