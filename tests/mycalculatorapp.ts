const assert = require('assert')
const anchor = require('@project-serum/anchor');
const { pathToFileURL } = require('url');
const { isTypedArray } = require('util/types');
const {SystemProgram} = anchor.web3

describe('mycalculatorapp', ()=> {

    // abstraction of connection to solana network
    const provider = anchor.Provider.local();
    anchor.setProvider(provider);

    //generating credentials for a web3 Account
    const calculator = anchor.web3.Keypair.generate()

    const program = anchor.workspace.Mycalculatordapp

    it('Creates a calculator', async() => {
        await program.rpc.create("Welcome to solana", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            //need to pass since creating new calculator account
            signers: [calculator]
        }) 
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === 'Welcome to Solana')
    })


})