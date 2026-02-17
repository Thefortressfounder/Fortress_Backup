const StellarSdk = require('@stellar/stellar-sdk');
const express = require('express');
const app = express();
app.use(express.json());

const SECRET_KEY = process.env.STELLAR_SECRET_KEY;
const isPublic = process.env.STELLAR_NETWORK === 'PUBLIC';
const HORIZON_URL = isPublic ? 'https://horizon.stellar.org' : 'https://horizon-testnet.stellar.org';
const NETWORK = isPublic ? StellarSdk.Networks.PUBLIC : StellarSdk.Networks.TESTNET;

const sourceKeypair = StellarSdk.Keypair.fromSecret(SECRET_KEY);
const server = new StellarSdk.Horizon.Server(HORIZON_URL);

let SYSTEM_LOCKED = false;

// KILL-SWITCH ENDPOINTS
app.post('/admin/lockdown', (req, res) => {
    if (req.headers['x-admin-secret'] !== process.env.FORTRESS_ADMIN_SECRET) return res.sendStatus(403);
    SYSTEM_LOCKED = true;
    console.log("!!! EMERGENCY LOCKDOWN ACTIVATED !!!");
    res.json({ status: "LOCKED" });
});

app.post('/admin/unlock', (req, res) => {
    if (req.headers['x-admin-secret'] !== process.env.FORTRESS_ADMIN_SECRET) return res.sendStatus(403);
    SYSTEM_LOCKED = false;
    res.json({ status: "UNLOCKED" });
});

// MODIFIED FORGE (WITH LOCK CHECK)
app.post('/forge', async (req, res) => {
    if (SYSTEM_LOCKED) return res.status(503).json({ error: "System is in EMERGENCY LOCKDOWN" });
    
    const { batch } = req.body;
    try {
        const account = await server.loadAccount(sourceKeypair.publicKey());
        let transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: NETWORK,
        });

        batch.slice(0, 100).forEach(item => {
            transaction.addOperation(StellarSdk.Operation.payment({
                destination: item.destination,
                asset: new StellarSdk.Asset(process.env.CVT_ASSET_CODE, process.env.STELLAR_ISSUER_ID),
                amount: item.amount || "1.0",
            }));
        });

        const builtTx = transaction.setTimeout(30).build();
        builtTx.sign(sourceKeypair);
        await server.submitTransaction(builtTx);
        res.json({ status: "FORGED" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/balance', async (req, res) => {
    try {
        const account = await server.loadAccount(sourceKeypair.publicKey());
        const xlm = account.balances.find(b => b.asset_type === 'native');
        res.json({ balance: parseFloat(xlm.balance).toFixed(2), locked: SYSTEM_LOCKED });
    } catch (e) { res.json({ balance: "0.00", locked: SYSTEM_LOCKED }); }
});

app.listen(process.env.FORGE_PORT, () => console.log(`Secure Forge Online`));
