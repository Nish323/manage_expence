import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Index = (props) => {
    
    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            
            <div className="p-12">
                <h1>Home</h1>
                <Link href="/home/create">Create</Link><br/>
                <Link href="/home/expenses">Check</Link>
            </div>
            
        </Authenticated>
        );
}

export default Index;