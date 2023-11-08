import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Edit = (props) => {
    const {expence} = props;
    const {data, setData, put} = useForm({
        amount: expence.amount,
        discription: expence.discription,
        expence_at: expence.expence_at,
        category_id: expence.category_id,
        user_id: props.user_id
    })

    const handleSendExpences = (e) => {
        e.preventDefault();
        put(`/home/expences/${expence.id}`);
    }

    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit
                </h2>
                }>

            <div className="p-12">

                <form onSubmit={handleSendExpences}>
                    <div>
                        <h2>費用</h2>
                        <input type="text" placeholder="1500" value={data.amount} onChange={(e) => setData("amount", e.target.value)}/>
                        <span className="text-red-600">{props.errors.amount}</span>
                    </div>
                        
                    <div>
                    <h2>カテゴリー</h2>
                        <input type="text" placeholder="1" value={data.category_id} onChange={(e) => setData("category_id", e.target.value)}/>
                        <span className="text-red-600">{props.errors.category_id}</span>
                    </div>   
                    <div>
                        <h2>詳細説明</h2>
                        <textarea placeholder="おやつ" value={data.discription} onChange={(e) => setData("discription", e.target.value)}></textarea>
                        <span className="text-red-600">{props.errors.discription}</span>
                    </div>
                    
                    <div>
                    <h2>日時</h2>
                        <input type="text" placeholder="2023-11-05" value={data.expence_at} onChange={(e) => setData("expence_at", e.target.value)}/>
                        <span className="text-red-600">{props.errors.expence_at}</span>
                    </div>
                    
                     <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">edit</button>
                </form>
                
                <Link href="/home/expences">Check</Link><br/>

                <Link href="/home">Home</Link>
            </div>

        </Authenticated>
        );
}
export default Edit;
