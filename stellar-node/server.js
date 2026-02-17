const express = require('express');
const StellarSdk = require('stellar-sdk');
const cors = require('cors');

const app = express();
app.use(cors());

// --- 1. CONFIGURATION ---
// Connect to REAL STELLAR MAINNET
const SERVER_URL = 'https://horizon.stellar.org';
const server = new StellarSdk.Server(SERVER_URL);

// YOUR LOBSTR VAULT (Where the money is now)
const VAULT_ADDRESS = "GC76ACQYDSHBVFKO5FIGP6HOQSHHPC6DGR3MC7P5FWMURN6RTH5COMXC";

// THE ASSET DEFINITION (Issued by Distributor)
const CVT_CODE = "CVT";
const CVT_ISSUER = "GBHIZCC5DPDPNWVMY6IC4LRU7TKYVFCYRRZBWYAQEBANYHKL7S25OH4DW";

app.get('/status', async (req, res) => {
    try {
        // 1. Fetch the Real Account Data from Mainnet
        const account = await server.loadAccount(VAULT_ADDRESS);
        
        // 2. Find XLM Balance
        let xlmBalance = "0.00";
        account.balances.forEach(b => {
            if (b.asset_type === 'native') {
                xlmBalance = b.balance;
            }
        });

        // 3. Find CVT Balance
        let cvtBalance = "0.00";
        account.balances.forEach(b => {
            if (b.asset_code === CVT_CODE && b.asset_issuer === CVT_ISSUER) {
                cvtBalance = b.balance;
            }
        });

        console.log(`Synced Vault: ${xlmBalance} XLM | ${cvtBalance} CVT`);

        res.json({
            status: "SYNCED (Mainnet)",
            xlm_balance: xlmBalance,
            cvt_balance: cvtBalance,
            network: "Public Global"
        });

    } catch (error) {
        console.error("Stellar Sync Error:", error.message);
        // Fallback if network is slow
        res.json({ 
            status: "Network Delay", 
            xlm_balance: "---", 
            cvt_balance: "---" 
        });
    }
});

const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fortress Vault Monitor running on port ${PORT}`);
});
