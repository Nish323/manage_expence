import * as React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react';
import { Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from "chart.js/auto";

Chart.register(ArcElement);

const Index = (props) => {
    const { expenses, CmonthTotals, categories } = props; 
    const user_id = props.auth.user.id;
    
    const userExpenses = expenses.filter(expense => expense.user_id == user_id);
    
    const useCmonthTotals = CmonthTotals.filter(CmonthTotal => CmonthTotal.month == 11);
    
    const handleDeleteExpense = (id) => {
        router.delete(`/home/expenses/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
    const getCategoryNameById = (categoryId, categories) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };
    
    const ExpenseData = {
        labels: useCmonthTotals.map(entry => getCategoryNameById(entry.category_id, categories)), // カテゴリーごとのラベル
        datasets: [
            {
                label: '支出',
                data: useCmonthTotals.map(entry => entry.expense_total), // 合計金額
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const WeightData = {
        labels: useCmonthTotals.map(entry => getCategoryNameById(entry.category_id, categories)), // カテゴリーごとのラベル
        datasets: [
            {
                label: '支出',
                data: useCmonthTotals.map(entry => entry.weight_total), // 合計金額
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderWidth: 1,
            },
        ],
    };
    
     const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };
    

    return (
    <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            
            <div className="p-12">
                <h1>Expense</h1>
                
            <div style={{ maxWidth: "300px", margin: "20px auto" }}>
              <Pie data={ExpenseData} options={chartOptions} components={{ Arc: { element: ArcElement } }} />
            </div>
            
            <div style={{ maxWidth: "300px", margin: "20px auto" }}>
              <Pie data={WeightData} options={chartOptions} components={{ Arc: { element: ArcElement } }} />
            </div>
                
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
                        <Button variant="contained" onClick={() => handleDeleteExpense(expense.id)}>delete</Button>

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