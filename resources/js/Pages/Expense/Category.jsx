import * as React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

const Index = (props) => {
  const { categories } = props;
  const user_id = props.auth.user.id;

  const handleDeleteCategory = (id) => {
    router.delete(`/home/categories/${id}`, {
      onBefore: () => confirm("本当に削除しますか？"),
    });
  };

  return (
    <Authenticated
      auth={props.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Index</h2>}
    >
      <div className="p-12">
        <h1 className="text-3xl font-bold mb-6">Expense Categories</h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Category Name</TableCell>
              <TableCell className="font-semibold">Weight</TableCell>
              <TableCell className="font-semibold">Description</TableCell>
              <TableCell className="font-semibold">Edit</TableCell>
              <TableCell className="font-semibold">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.weight}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Link href={`/home/category/${category.id}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDeleteCategory(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className="mt-6"
        >
          <Link href={`/home/category/create`}>Create</Link>
        </Button>
      </div>
    </Authenticated>
  );
};

export default Index;
