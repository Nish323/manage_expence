import * as React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from "chart.js/auto";

Chart.register(ArcElement);

const Index = (props) => {
  const { expenses, CmonthTotals, categories } = props;
  const user_id = props.auth.user.id;

  const currentMonth = new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);

  const userExpenses = expenses.filter(expense => expense.user_id == user_id);

  // 月ごとにフィルタリングする部分を変更
  const useCmonthTotals = CmonthTotals.filter(CmonthTotal => CmonthTotal.month === selectedMonth);
  const sortedUserExpenses = userExpenses
    .filter(expense => new Date(expense.expense_at).getMonth() + 1 === selectedMonth)
    .sort((a, b) => new Date(a.expense_at) - new Date(b.expense_at));

  const handleDeleteExpense = (id) => {
    router.delete(`/home/expenses/${id}`, {
      onBefore: () => confirm("本当に削除しますか？"),
    });
  };

  const getCategoryNameById = (categoryId, categories) => {
    if (!categories) {
      return '';
    }
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const ExpenseData = {
    labels: useCmonthTotals.map(entry => getCategoryNameById(entry.category_id, categories)),
    datasets: [
      {
        label: '支出',
        data: useCmonthTotals.map(entry => entry.expense_total),
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
    labels: useCmonthTotals.map(entry => getCategoryNameById(entry.category_id, categories)),
    datasets: [
      {
        label: '支出',
        data: useCmonthTotals.map(entry => entry.weight_total),
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

  const incrementMonth = () => {
    setSelectedMonth(prevMonth => prevMonth + 1);
  };

  const decrementMonth = () => {
    setSelectedMonth(prevMonth => prevMonth - 1);
  };

 return (
    <Authenticated auth={props.auth} header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Index
      </h2>
    }>

      <div className="p-12">
        <h1>Expense</h1>

        <div>
          <Button onClick={decrementMonth}>{'<'}</Button>
          <span> {selectedMonth} 月 </span>
          <Button onClick={incrementMonth}>{'>'}</Button>
        </div>

        <div style={{ maxWidth: "300px", margin: "20px auto" }}>
          <Pie data={ExpenseData} options={chartOptions} components={{ Arc: { element: ArcElement } }} />
        </div>

        <div style={{ maxWidth: "300px", margin: "20px auto" }}>
          <Pie data={WeightData} options={chartOptions} components={{ Arc: { element: ArcElement } }} />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expense At</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUserExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.expense_at}</TableCell>
                <TableCell>{getCategoryNameById(expense.category_id, categories)}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell><Button><Link href={`/home/expenses/${expense.id}`}>Edit</Link></Button></TableCell>
                <TableCell><Button variant="contained" onClick={() => handleDeleteExpense(expense.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </Authenticated>
  );
}

export default Index;