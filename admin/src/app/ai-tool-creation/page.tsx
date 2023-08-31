import React from 'react';
import {listAiToolCategory} from "@/common/constants/ai-tool-categories";

function Page() {

    return (
        <div className={"flex h-full w-full justify-center flex-col p-5 gap-y-5"}>
            <h1 className={"text-2xl font-bold"}>Add a new ai tool</h1>
            <input type="text" placeholder={"Name"} className={"border-black rounded-lg border-1 py-2 px-1"}/>
            <textarea placeholder={"Description"} className={"border-black rounded-lg border-1 py-2 px-1"}/>
            <input type="url" placeholder={"website url"} className={"border-black rounded-lg border-1 py-2 px-1"}/>
            <input type="file" placeholder={"image"}/>
            <select className={"border-black rounded-lg border-1 py-2 px-1"}>
                <option disabled={true} value={"choose a category"}>choose a category</option>
                {
                    Object.keys(listAiToolCategory).map((option) => {
                        return <option value={option}>{option}</option>
                    })
                }
            </select>
            <select className={"border-black rounded-lg border-1 py-2 px-1"}>
                <option disabled={true} value={"choose a princing"}>choose a pricing</option>
                <option value={"free"}>free</option>
                <option value={"paid"}>paid</option>
                <option value={"free_plan"}>freemium</option>
            </select>
            <button className={"bg-amber-100 py-3"}>Submit</button>
        </div>
    );
}

export default Page;