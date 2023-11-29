import * as React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Index = (props) => {
    const { expenses, categories } = props; 
    const [anchorEl, setAnchorEl] = React.useState(null);i
    const [selectedExpense, setSelectedExpense] = React.useState(null);

    const getCategoryColor = (categoryId) => {
        // カテゴリーIDが1の時を基準にした色相の基準値
        const baseHue = 200; // 例えば、200度の青を基準に

        // カテゴリーIDごとに色相を計算
        const hue = (baseHue + (categoryId - 1) * 50) % 360; // 30度ずつ変化させる例

        // HSL形式からRGBに変換
        const rgbColor = `hsl(${hue}, 70%, 50%)`;

        return rgbColor;
    };

    const expenseEvents = expenses.map((expense) => {
        const eventColor = getCategoryColor(expense.category_id);

        return {
            id: expense.id,
            title: `￥${expense.amount}`,
            category_id: expense.category_id,
            description: expense.description,
            date: expense.expense_at,
            color: eventColor,
        };
    });

    const handleEventClick = (event) => {
        const eventId = parseInt(event.event.id, 10);
        const clickedExpense = expenses.find((expense) => expense.id === eventId);
        const category = categories.find((category) => category.id === clickedExpense.category_id);

        setSelectedExpense({ ...clickedExpense, category });
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
