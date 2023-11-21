import * as React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Select, FormControl, InputLabel, Box, MenuItem, Button } from '@mui/material';

const Create = (props) => {
    const { categories } = props;
    const { data, setData, post } = useForm({
        amount: "",
        description: "",  // Corrected typo in description
        expense_at: "",
        category_id: categories[0].id,
        user_id: props.user_id
    })

    const handleSendExpenses = (e) => {
        e.preventDefault();
        post("/home/expenses");
    }

    return (
        <Authenticated auth={props.auth} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create
            </h2>
        }>

            <div className="p-8">
                <form onSubmit={handleSendExpenses} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-600">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            placeholder="1500"
                            onChange={(e) => setData("amount", e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <span className="text-red-600">{props.errors.amount}</span>
                    </div>

                    <div className="mb-4">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    value={data.category_id}
                                    label="Category"
                                    onChange={(e) => setData("category_id", e.target.value)}
                                    className="mt-1"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            id="description"
                            placeholder="ごはん"
                            onChange={(e) => setData("description", e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        ></textarea>
                        <span className="text-red-600">{props.errors.description}</span>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="expense_at" className="block text-sm font-medium text-gray-600">Date</label>
                        <input
                            type="date"
                            id="expense_at"
                            onChange={(e) => setData("expense_at", e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <span className="text-red-600">{props.errors.expense_at}</span>
                    </div>

                    <Button
                        type="submit"
                        className="p-2 bg-purple-300 hover:bg-purple-400 rounded-md text-white"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </Authenticated>
    );
}

export default Create;
