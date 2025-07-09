



class Loan{


    constructor({
        id=null,
        label= "",
        description="",
        client_id ="",
        amount="",
        firstPaymentDate="",
        total_amount="",
        interest_amount ="",
        status="" ,
        type="",
        term ="",
        interest_rate ="",
        disbursement_date ="",
        user_id="",
        purpose="",
        interest_type="",
        paid_amount="",
        left_amount ="",
    }){


        this.id=id,
        this.label=label,
        this.description=description,
        this.client_id =client_id ,
        this.amount=amount,
        this.total_amount=total_amount,
        this.interest_amount =interest_amount ,
        this.status=status ,
        this.type=type,
        this.first_payment_date=firstPaymentDate,
        this.term =term ,
        this.interest_rate =interest_rate ,
        this.disbursement_date =disbursement_date ,
        this.user_id=user_id,
        this.purpose=purpose,
        this.interest_type=interest_type,
        this.paid_amount=paid_amount,
        this.left_amount =left_amount 
    }



    async insert({}){

        try {
            
            const interest_amount = this.amount*this.interest_rate/100
            const total_amount = amount+interest_amount

             //TODO: save user in the database
            const result = await window.electron.database.insert('loans', 
                ['label','amount','interest_amount','total_amount','paid_amount','client_id',
                'interest_rate','status','term','disbursement_date','left_amount','first_payment_date'], 
                [
                this.label,this.amount,interest_amount,total_amount,0,this.client_id,
                this.interest_rate,this.status,this.term,this.disbursement_date,this.left_amount,this.first_payment_date
                ])


        } catch (error) {
            
            console.log(error)
            
            return {
                error:error.message
            }
        }

         

        
    }


    loanToObject(){

        return {
        id:this.id,
        label:this.label,
        descriptio:descriptionhis.t,
        client_id:this.client_id ,
        amoun:this.amount,
        total_amoun:this.total_amount,
        interest_amount:this.interest_amount ,
        statu:this.status ,
        typ:this.type,
        term:this.term ,
        first_payment_date:this.first_payment_date,
        interest_rate:this.interest_rate ,
        disbursement_date :this.disbursement_date ,
        user_id:this.user_id,
        purpose:this.purpose,
        interest_type:this.interest_type,
        paid_amount:this.paid_amount,
        left_amount :this.left_amount
        }
    }


}