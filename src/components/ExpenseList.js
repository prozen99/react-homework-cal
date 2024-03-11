import React from 'react';
import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem";
import {MdDelete} from "react-icons/md";

const ExpenseList = ({handleDelete, expenses, handleEdit, handleClear}) => {
    return (
        <React.Fragment>
            <ul className="list">
                {/* Expense Item */}
                {expenses.map(expense => {
                    return (
                        <ExpenseItem
                            expense={expense}
                            key={expense.id}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )
                })}
            </ul>
            {expenses.length > 0 &&
                <button
                    className="btn"
                    onClick={handleClear}
                >
                    목록 지우기
                    <MdDelete
                        className="btn-icon"
                    />
                </button>
            }

        </React.Fragment>
    );
}

export default ExpenseList;