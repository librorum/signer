#!/usr/bin/env node
let stellar_base = require('stellar-base');

if(process.argv.length == 3) {
    generateKeyPair();
    process.exit();
}

if(process.argv.length < 5) {
    showUsage();
    process.exit();
}

let type = process.argv[2];
if('sign' == type) {
    sign(process.argv[3], process.argv[4]);
} 
else if('verify' == type) {
    verify(process.argv[3], process.argv[4]);
}
else {
    showUsage();
}

function showUsage() {
    console.log('signer sign $PRIVATE_KEY $DATA');
    console.log('signer verify $PUBLIC_KEY $SIGNATURE');
}

// for example
// Private : SCFFKCL6OGLRUX7I4B2UVDHVNFGZCWNFSSLM7UWNO6XB64YYDGBK6PLE
// Public : GD7PI7NL2MA6RSP2ZPP26TGKSLJYEDCE4H4UR4ZMKWQOYSTTXZG42SXN
// Signature : CED308BE013B95030752DD223F960DEC02735201F4E238274959ABA09C36D3542E01A0CBD2A342E349DD934A8D51564A08A8ADF9D92487E4D3362D83E9C6890D49206C6F766520424F5341474F5241
function generateKeyPair() {
    let keypair = stellar_base.Keypair.random();
    // let keypair = tweetnacl.box.keyPair();
    // console.log(keypair);
    console.log('Private : ' + keypair.secret());
    console.log('Public : ' + keypair.publicKey());
}

function sign(private_key, data) { 
    // console.log('sign with private key: ' + private_key + " data : " + data);
    let keyPair = stellar_base.Keypair.fromSecret(private_key);
    let signature = keyPair.sign(data);
    let dataBuffer = Buffer.from(data);
    console.log('Signature: ' + signature.toString('hex') + dataBuffer.toString('hex'));
    // console.log(stellar_base.StrKey.encodeEd25519SecretSeed());
}

function verify(public_key, signatureAndData) { 
    let signatureHex = signatureAndData.substring(0, 128);
    let dataHex = signatureAndData.substring(128);
    // console.log(" signatureHex : " + signatureHex);
    // console.log(" dataHex : " + dataHex);
    let signature = Buffer.from(signatureHex, 'hex');
    let data = Buffer.from(dataHex, 'hex');
    let keypair = stellar_base.Keypair.fromPublicKey(public_key);
    let result = keypair.verify(data, signature);
    if(result) {
        console.log('Verification succeeded ' + data.toString('utf-8'));
    } else {
        console.log('Verification failed ' + data.toString('utf-8'));
    }
}

