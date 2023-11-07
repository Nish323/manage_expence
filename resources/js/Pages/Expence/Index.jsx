import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Index = (props) => {
    const { expences } = props; 
    const user_id = props.auth.user.id;
    
    const userExpences = expences.filter(expence => expence.user_id == user_id);
    
    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            
            <div className="p-12">
                <h1>Expence</h1>
                
                { userExpences.map((expence) => (
                    <div key={expence.id}>
                        <p>
                          User ID: {expence.user_id}<br/>
                          Category ID: {expence.category_id}<br/>
                          Description: {expence.discription}<br/>
                          Amount: {expence.amount}<br/>
                          Created At: {expence.created_at}<br/>
                          Deleted At: {expence.updated_at}<br/>
                          Expense At: {expence.expence_at}<br/>
                        </p>
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