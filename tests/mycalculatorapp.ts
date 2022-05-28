import { AnchorProvider } from "@project-serum/anchor"

const assert = require('assert')
const anchor = require('@project-serum/anchor')
// const { pathToFileURL } = require('url');
// const { isTypedArray } = require('util/types');
const {SystemProgram} = anchor.web3

describe('mycalculatorapp', ()=> {

    // abstraction of connection to solana network
    const provider = anchor.AnchorProvider.local()
    anchor.setProvider(provider)

    //generating credentials for a web3 Account
    const calculator = anchor.web3.Keypair.generate()

    const program = anchor.workspace.Mycalculatorapp

    it('Creates a calculator', async() => {
        await program.rpc.create("Welcome to Solana", {
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

    it('Checks sum of Addition function', async()=> {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result == 5)
    })
    
    it('Checks sum of Subtraction function', async()=> {
        await program.rpc.subtract(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result == -1)
    })

    it('Checks sum of Multiplication function', async()=> {
        await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result == 6)
    })

    it('Checks sum of Division function', async()=> {
        await program.rpc.divide(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result == 0)
        assert.ok(account.remainder == 2)
    })
})