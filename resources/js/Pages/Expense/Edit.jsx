import * as React from "react";
import { Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Select, FormControl, InputLabel, Box, MenuItem, Button } from "@mui/material";

const Edit = (props) => {
  const { expense, categories } = props;
  const { data, setData, put } = useForm({
    amount: expense.amount,
    description: expense.description,
    expense_at: expense.expense_at,
    category_id: expense.category_id,
    user_id: props.user_id,
  });

  const handleSendExpenses = (e) => {
    e.preventDefault();
    put(`/home/expenses/${expense.id}`);
  };

  return (
    <Authenticated
      auth={props.auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Expense Edit
        </h2>
      }
    >
      <div className="p-8">
        <form onSubmit={handleSendExpenses} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              placeholder="1500"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <span className="text-red-600">{props.errors.amount}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
            </label>
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
            <span className="text-red-600">{props.errors.category_id}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="おやつ"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
            <span className="text-red-600">{props.errors.description}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="expense_at"
              className="block text-sm font-medium text-gray-600"
            >
              Date
            </label>
            <input
              type="date"
              value={data.expense_at}
              onChange={(e) => setData("expense_at", e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <span className="text-red-600">{props.errors.expense_at}</span>
          </div>

          <Button
            type="submit"
            className="p-2 bg-purple-300 hover:bg-purple-400 rounded-md text-white"
          >
            Edit
          </Button>
        </form>
      </div>
    </Authenticated>
  );
};

export default Edit;
