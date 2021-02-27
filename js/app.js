class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  } 
  ///submit budget method
  submitBudgetForm(){
    const value=this.budgetInput.value;
    if(value==""||value<0){
      this.budgetFeedback.classList.add('showItem')
      this.budgetFeedback.innerHTML=`<p>Value cannot be empty or negative</p>`
      const self=this;
      setTimeout(function(){
        self.budgetFeedback.classList.remove('showItem')
      },4000)
    }else{
        this.budgetAmount.textContent=value;
        this.budgetInput.value=''
        this.showBalance()
 
    }
  }
  ///show balance
  showBalance(){
    const expense=this.totalExpense()
    const total= parseInt(this.budgetAmount.textContent)-expense
    this.balanceAmount.textContent=total
    if(total<0){
      this.balance.classList.remove('showGreen','showBlack')
      this.balance.classList.add('showRed')
     
    }else if(total==0){
    
        this.balance.classList.remove('showGreen','showRed')
        this.balance.classList.add('showBlack')
      
    }else{
      this.balance.classList.remove('showRed','showBlack')
      this.balance.classList.add('showGreen')
    
    }
    
  }
  //// submit Expense Form
  submitExpenseForm(){
   const expenseValue=this.expenseInput.value
   const amountValue=this.amountInput.value
   if(expenseValue===''|| amountValue===''||amountValue<0){
    this.expenseFeedback.classList.add('showItem')
    this.expenseFeedback.innerHTML=`<p>It can't be empty</p>`
    const self=this
    setTimeout(function(){
      self.expenseFeedback.classList.remove('showItem')
    },4000)
   }else{
     let amount= Number(amountValue)
     this.expenseInput.value=''
     this.amountInput.value=''
     let expense={
       id :this.itemID,
       title:expenseValue,
       amount:amount
     }
     this.itemID++;
     this.itemList.push(expense)
     this.addExpense(expense);
     this.showBalance()
     
    
   }

  }

  ///add expense
  addExpense(expense){
    const div =document.createElement('div')
    div.classList.add('expense')
    div.innerHTML=`        <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">-${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>`;
   this.expenseList.appendChild(div)
  }
  ////total expense
  totalExpense(){
   let total=0
   if(this.itemList.length>0){
    total=this.itemList.reduce((sum,item)=>sum+item['amount'],0)
   }
   this.expenseAmount.textContent=total
    return  total
  }
  //edit expense
  editExpense(item){
    ///elemeani id si ile sectim heralde
    let id=parseInt(item.dataset.id);
    ////elemannin asil parentini buldum anlamak icin 104.un satirin ustune bak
    let parent= item.parentElement.parentElement.parentElement;
    ///burada elemani domdan sildim
    this.expenseList.removeChild(parent)
    ///expense elementi degerleri icinde tutacak ki ben edite bastgimda elemanlari tutayims onra sonda geri formun icinde gosterebilrym
let expense=this.itemList.filter(item=>item['id']==id)
    this.expenseInput.value=expense[0]['title']
    this.amountInput.value=expense[0]['amount']

    ///remove item from the item list element
    this.itemList =this.itemList.filter(item=>item['id']!==id)
    this.showBalance()
  }
  ///delete expense
  deleteExpense(item){

  }


}

function showBudget(){
  const budgetForm=document.getElementById('budget-form');
const expenseForm=document.getElementById("expense-form");
const expenseList=document.getElementById("expense-list");

///new instance of Ui Class 
const ui= new UI();


//budget Form submit
budgetForm.addEventListener('submit',function(event){
event.preventDefault()
ui.submitBudgetForm()
})
//expense Form submit
expenseForm.addEventListener('submit',function(event){
 
  event.preventDefault()
  ui.submitExpenseForm()
  console.log()

})
//expense click
//////eventliste tikladigimda eventlistener calisacak
expenseList.addEventListener('click',function(event){
  //tikladigim yeri event.taget ile buluyrm ve parentinin classlisti checke diyrum
  if(event.target.parentElement.classList.contains('edit-icon')){
    ui.editExpense(event.target.parentElement)
  }else if(event.target.parentElement.classList.contains('delete-icon')){
    ui.deleteExpense(event.target.parentElement)
  }

})
}


