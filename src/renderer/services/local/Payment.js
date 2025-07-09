



class Payment{


    constructor({
        id="",
        loan_id="",
        amount="",
        total_amount="",
        interest_amount="",
        paid_amount="",
        left_amount="",
        late_days="",
        payment_date="",
        status="",
        payment_method="",
        notes="",
        created_at="",
        updated_at="",
        user_id="",

}){


        this.id=id,
        this.loan_id=loan_id,
        this.amount=amount,
        this.total_amount=total_amount,
        this.interest_amount=interest_amount,
        this.paid_amount=paid_amount,
        this.left_amount=left_amount,
        this.late_days=late_days,
        this.payment_date=payment_date,
        this.status=status,
        this.payment_method=payment_method,
        this.notes=notes,
        this.created_at=created_at,
        this.updated_at=updated_at,
        this.user_id=user_id
        
    }



    async insert({}){

        try {
            
            const interest_amount = this.amount*this.interest_rate/100
            const total_amount = amount+interest_amount

             //TODO: save user in the database
            const result = await window.electron.database.insert('loans', 
                ['label','amount','interest_amount','total_amount','paid_amount',
                'interest_rate','status','term','disbursement_date','left_amount','first_payment_date'], 
                [
                this.label,this.amount,interest_amount,total_amount,0,
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