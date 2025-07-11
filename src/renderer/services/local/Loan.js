import Payment from "./Payment"



class Loan{


    constructor({
        id=null,
        label= "Prestamo",
        description="",
        client_id ="",
        amount="",
        firstPaymentDate="",
        total_amount="",
        interest_amount ="",
        status="active" ,
        type="",
        term ="daily",
        interest_rate =30,
        disbursement_date ="",
        user_id="",
        purpose="",
        interest_type="",
        paid_amount="",
        left_amount ="",
        installments=1
    }){


        this.id=id
        this.label=label
        this.description=description
        this.client_id =client_id 
        this.amount=amount
        this.total_amount=total_amount
        this.interest_amount =interest_amount 
        this.status=status 
        this.type=type
        this.first_payment_date=firstPaymentDate,
        this.term =term 
        this.interest_rate =interest_rate 
        this.disbursement_date =disbursement_date 
        this.user_id=user_id
        this.purpose=purpose
        this.interest_type=interest_type
        this.paid_amount=paid_amount
        this.left_amount =left_amount 
        this.installments=installments
    }


    async setLabel(){
        
        try {
             const loans = await window.electron.database.select("loans",{
                selecct:"id",
                where:"client_id=?",
                
             },[this.client_id])

             this.label = "Prestamo "+(loans.length+1)
        } catch (error) {
            console.log(error)
        }
    }

    async insert(){

        try {
            
            await this.setLabel()
            this.interest_amount =Math.round(this.amount*this.interest_rate/100)
            this.total_amount = this.amount+this.interest_amount

             //TODO: save user in the database
           const result = await window.electron.database.insert('loans', 
                ['label','description','type','amount','interest_amount','total_amount','paid_amount','client_id',
                'interest_rate','status','term','disbursement_date','left_amount','first_payment_date','user_id','purpose','interest_type'], 
                [
                this.label,this.description,this.type,this.amount,this.interest_amount,this.total_amount,0,this.client_id,
                this.interest_rate,this.status,this.term,this.disbursement_date,this.total_amount,this.first_payment_date,this.user_id,  this.purpose,this.interest_type
                ]) 
            
            
            

        } catch (error) {
            
            console.log(error)
            
            return {
                error:error.message
            }
        }

         

        
    }

    calculatePaymentsDate = (payDate, payment_interval, sunday) => {
  //nsole.log("payDate:----------------------------->",payDate)
  if (payment_interval === "daily") {
    if (sunday) {
      if (payDate.getDay() == 6) {
        payDate.setDate(payDate.getDate() + 1);
      }
    }
        payDate.setDate(payDate.getDate() + 1);
    } else if (payment_interval === "weekly") {
        payDate.setDate(payDate.getDate() + 7);
    } else if (payment_interval === "monthly") {
        payDate.setDate(payDate.getDate() + 30);
    } else if (payment_interval === "fortnightly") {
        payDate.setDate(payDate.getDate() + 15);
    }

    const anio1 = payDate.getFullYear();
    const mes1 = String(payDate.getMonth() + 1).padStart(2, "0"); // Mes (base 0) + 1, con cero inicial
    const dia1 = String(payDate.getDate()).padStart(2, "0"); // Día con cero inicial

    const ndate = `${anio1}-${mes1}-${dia1}`;
    //nsole.log("ndate:----------------------------->",ndate)
    return ndate;
};

    async generatePayments(){

         try {
    const payments = [];

    const payDate = new Date(generate_payments_date + "T00:00:00");

    for (let i = 0; i < installment_number; i++) {
      let ndate;
      if (payment_interval === "custom") {
        ndate = loan.dates[i];
      } else {
        ndate =
          i == 0
            ? generate_payments_date
            : calculatePaymentsDate(payDate, payment_interval, sunday);
      }

      const payment = await window.database.models.Payments.createPayment({
        label: `Pago ${i + 1}`,
        loan_id: id,
        amount: Math.floor(total_amount / installment_number),
        gain: Math.floor(gain / installment_number),
        payment_date: ndate,
        status: "pending",
        net_amount: Math.floor(amount / installment_number),
      });

      payments.push(payment);
    }

    return payments;
    //return data
  } catch (error) {
    console.log("error:----------------------------->", error);
    return [];
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
        installments:this.installments,
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


export default Loan;