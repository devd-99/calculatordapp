use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatorapp {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String ) -> Result<()> {

        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    // pub fn add(ctx: Contact<Addition>, num1: i64, num2: i64) -<

}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub systems_program: Program<'info, System>
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64  
}