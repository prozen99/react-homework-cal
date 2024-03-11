import React from 'react';
import "./ExpenseForm.css";
import {MdSend} from "react-icons/md";

const ExpenseForm = ({edit, handleCharge, charge, handleAmount,amount, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor="charge">지출 항목</label>
                    <input type="text"
                           className='form-control'
                           id='charge'
                           name='charge'
                           value={charge}
                           placeholder='예) 렌트비'
                           onChange={handleCharge}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="charge">비용</label>
                    <input type="number"
                           className='form-control'
                           id='amount'
                           name='amount'
                           placeholder='예) 100'
                           onChange={handleAmount}
                           value={amount}
                    />
                </div>
            </div>
            <button type='submit' className='btn'>
                {edit?"수정":"제출"}
                <MdSend className="btn-icon"></MdSend>
            </button>
        </form>
    );
}

export default ExpenseForm;