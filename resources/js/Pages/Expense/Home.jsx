import * as React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Index = (props) => {
    const { expenses, categories } = props; // categoriesも受け取る
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedExpense, setSelectedExpense] = React.useState(null);

    const expenseEvents = expenses.map((expense) => ({
        id: expense.id,
        title: `￥${expense.amount}`,
        category_id: expense.category_id,
        description: expense.description,
        date: expense.expense_at,
    }));

    const handleEventClick = (event) => {
        // クリックしたイベントのid
        const eventId = parseInt(event.event.id, 10);

        // イベントidと一致するexpensesのデータを取得
        const clickedExpense = expenses.find((expense) => expense.id === eventId);

        // カテゴリーidと一致するcategoriesのデータを取得
        const category = categories.find((category) => category.id === clickedExpense.category_id);

        setSelectedExpense({ ...clickedExpense, category }); // カテゴリー情報もselectedExpenseに含める
        setAnchorEl(event.el);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedExpense(null);
    };

    return (
        <Authenticated auth={props.auth} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                ホーム
            </h2>
        }>
            <div className="p-12">
                <h1>ホーム</h1>

                {/* FullCalendar コンポーネント */}
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={expenseEvents}
                    eventClick={handleEventClick}
                />

                {/* Popover */}
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {selectedExpense && (
                        <div>
                            <Typography sx={{ p: 2 }}>金額: {`￥${selectedExpense.amount}`}</Typography>
                            <Typography sx={{ p: 2 }}>カテゴリー: {selectedExpense.category.name}</Typography>
                            <Typography sx={{ p: 2 }}>説明: {selectedExpense.description}</Typography>
                        </div>
                    )}
                </Popover>
            </div>
        </Authenticated>
    );
}

export default Index;


