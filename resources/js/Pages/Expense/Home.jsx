import * as React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Index = (props) => {
    const { expenses } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedExpense, setSelectedExpense] = React.useState(null);

    const expenseEvents = expenses.map((expense) => ({
        id: expense.id,
        title: `$${expense.amount}`,
        category_id: expense.category_id,
        description: expense.description,
        date: expense.expense_at,
    }));

    const handleEventClick = (event) => {
        // クリックしたイベントのid
        const eventId = parseInt(event.event.id, 10); // 文字列から数値への変換
    
        console.log('eventId:', eventId); // デバッグ情報をコンソールに出力
    
        // イベントidと一致するexpensesのデータを取得
        const clickedExpense = expenses.find((expense) => {
            console.log('expense.id:', expense.id); // デバッグ情報をコンソールに出力
            return expense.id === eventId;
        });
    
        console.log('clickedExpense:', clickedExpense); // デバッグ情報をコンソールに出力
    
        setSelectedExpense(clickedExpense);
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
                            <Typography sx={{ p: 2 }}>金額: {`$${selectedExpense.amount}`}</Typography>
                            <Typography sx={{ p: 2 }}>カテゴリー: {selectedExpense.category_id}</Typography>
                            <Typography sx={{ p: 2 }}>説明: {selectedExpense.description}</Typography>
                            <Typography sx={{ p: 2 }}>日付: {selectedExpense.expense_at}</Typography>
                        </div>
                    )}
                </Popover>
            </div>
        </Authenticated>
    );
}

export default Index;

