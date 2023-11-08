import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react'

const Index = (props) => {
    const { expenses } = props; 
    const user_id = props.auth.user.id;
    
    const userExpenses = expenses.filter(expense => expense.user_id == user_id);
    
    const handleDeleteExpense = (id) => {
        router.delete(`/home/expenses/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
    return (
    <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            
            <div className="p-12">
                <h1>Expense</h1>
                
                { userExpenses.map((expense) => (
                    <div key={expense.id}>
                        <p>
                          User ID: {expense.user_id}<br/>
                          Category ID: {expense.category_id}<br/>
                          Description: {expense.description}<br/>
                          Amount: {expense.amount}<br/>
                          Created At: {expense.created_at}<br/>
                          Updated At: {expense.updated_at}<br/>
                          Expense At: {expense.expense_at}<br/>
                          expense ID: {expense.id}
                        </p>
                        <Link href={`/home/expenses/${expense.id}`}>Edit</Link><br/>
                        <button className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() => handleDeleteExpense(expense.id)}>delete</button>

                    </div>
                )) }
                <br/>
                <Link href="/home/create">Create</Link><br/>
                <Link href="/home">Home</Link>
            </div>
            
            
        </Authenticated>
        );
}

export default Index;