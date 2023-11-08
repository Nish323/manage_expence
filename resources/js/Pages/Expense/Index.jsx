import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react'

const Index = (props) => {
    const { expenses } = props; 
    const user_id = props.auth.user.id;
    
    const userExpenses = expenses.filter(expense => expense.user_id == user_id);
    
    const handleDeleteExpense = (id) => {
        router.delete(`/home/expenses`, {
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
                
                { userExpenses.map((userExpenses) => (
                    <div key={userExpenses.id}>
                        <p>
                          User ID: {userExpenses.user_id}<br/>
                          Category ID: {userExpenses.category_id}<br/>
                          Description: {userExpenses.description}<br/>
                          Amount: {userExpenses.amount}<br/>
                          Created At: {userExpenses.created_at}<br/>
                          Updated At: {userExpenses.updated_at}<br/>
                          Expense At: {userExpenses.expense_at}<br/>
                          expense ID: {userExpenses.id}
                        </p>
                        <Link href={`/home/expenses/${userExpenses.id}`}>Edit</Link><br/>
                        <button className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() => handleDeleteExpense(userExpenses.id)}>delete</button>

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