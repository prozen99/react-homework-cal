import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {useEffect, useState} from "react";
import Alert from "./components/Alert";

const App = () => {

    const [expenses, setExpenses] = useState([])

    const [charge, setCharge] = useState("")

    const [amount, setAmount] = useState(0)

    const [alert, setAlert] = useState({show: false})

    const [edit, setEdit] = useState(false)

    const [id, setId] = useState('')
    useEffect(()=>{

        setExpenses([
            {id: 1, charge: "간식비", amount: 1000},
            {id: 2, charge: "교통비", amount: 1500},
            {id: 3, charge: "식비", amount: 10000}
        ])
    },[])
    const handleClear = () => {
        setExpenses([])
    }
    
    const handleEdit = (id) => {
      const expense = expenses.find(item => item.id===id);
      const {charge, amount} = expense;
      setId(id);
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
    }

    const handleAlert = ({type, text}) => {
      setAlert({show: true, type, text});
      setTimeout(()=>{
          setAlert({show: false})
      }, 7000)
    }

    const handleCharge = (e) => {
        setCharge(e.target.value)
    }

    const handleAmount = (e) => {
        //타겟 밸류는 String로 가져옴
        // console.log(typeof e.target.value)
      setAmount(e.target.valueAsNumber)
    }

    const handleSubmit = (e) =>{
        //submit 타입 사용시 새로고침 되는 기본 동작을 막는 함수
        e.preventDefault()
        if(charge!==""&&amount >0){
            if(edit){
                const newExpenses = expenses.map(item => {
                    return item.id===id ? {...item, charge, amount} : item
                })
                setEdit(false)
                setExpenses(newExpenses)
                handleAlert({type : "success",text:"아이템이 수정되었습니다"})
            }else {
                const newExpense = {
                    id: crypto.randomUUID(),
                    charge,
                    amount
                }
                //불변성을 지켜주기 위해서 새로운 expenses를 생성
                const newExpenses = [...expenses, newExpense]
                setExpenses(newExpenses)

                handleAlert({type: "success", text: "아이템이 생성되었습니다"})
            }
            setCharge("")
            setAmount(0)
        }else{
            console.log("error")
            handleAlert({type:"danger",text:"charge는 빈값일 수 없으며, amount는 0보다 커야함"})

        }
    }


    const handleDelete = (id) => {
        const newExpenses = expenses.filter(expense =>
            expense.id !== id);
        setExpenses(newExpenses);
        handleAlert({type:"danger",text:"아이템이 잘 삭제되었습니다"})
    }

    return (
        <main className="main-container">
            {alert.show ?<Alert
                type={alert.type}
                text={alert.text}
            />: null}
            <h1>예산 계산기</h1>

            <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
                {/*Expense Form*/}
                <ExpenseForm
                    edit={edit}
                    handleSubmit = {handleSubmit}
                    handleCharge={handleCharge}
                    charge={charge}
                    handleAmount={handleAmount}
                    amount = {amount}
                />
            </div>

            <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
                {/*Expense Form*/}
                <ExpenseList
                    handleClear={handleClear}
                    expenses={expenses}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </div>

            <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
                <p style={{fontSize: '2rem'}}>
                    총 지출 :
                    <span>
                        {
                            expenses.reduce((acc,curV) =>{
                                return acc + curV.amount
                            },0)
                        }
                        원
                    </span>
                </p>
            </div>
        </main>
    )

}

export default App;