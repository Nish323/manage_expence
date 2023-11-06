import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Create = (props) => {
    const {data, setData} = useForm({
        amount: "",
        discrioption: "",
        expence_at: "",
        category_id: ""
    })

    console.log(data);

    return (
            <Authenticated auth={props.auth} header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create
                    </h2>
                }>

                <div className="p-12">

                    <form>
                        <div>
                            <h2>費用</h2>
                            <input type="text" placeholder="1500" onChange={(e) => setData("amount", e.target.value)}/>
                        </div>
                        
                        <div>
                        <h2>カテゴリー</h2>
                            <input type="text" placeholder="1" onChange={(e) => setData("category_id", e.target.value)}/>
                        </div>   

                        <div>
                            <h2>詳細説明</h2>
                            <textarea placeholder="ごはん" onChange={(e) => setData("discription", e.target.value)}></textarea>
                        </div>
                        
                        <div>
                        <h2>日時</h2>
                            <input type="text" placeholder="2023-11-05" onChange={(e) => setData("expence_at", e.target.value)}/>
                        </div>   
                    </form>

                    <Link href="/expence">戻る</Link>
                </div>

            </Authenticated>
            );
    }

export default Create;