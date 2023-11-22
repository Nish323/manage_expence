import * as React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from '@inertiajs/react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const Index = (props) => {
  const { categories } = props;
  const user_id = props.auth.user.id;

  const handleDeleteCategory = (id) => {
    router.delete(`/home/categories/${id}`, {
      onBefore: () => confirm("本当に削除しますか？"),
    });
  };

 return (
    <Authenticated auth={props.auth} header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Index
      </h2>
    }>

      <div className="p-12">
        <h1>Expense</h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.weight}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell><Button><Link href={`/home/category/${category.id}`}>Edit</Link></Button></TableCell>
                <TableCell><Button variant="contained" onClick={() => handleDeleteCategory(category.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <Button><Link href={`/home/category/create`}>Create</Link></Button>
      </div>

    </Authenticated>
  );
}

export default Index;