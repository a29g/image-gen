"use client";

import { useState } from "react";
import useSWR from "swr"
import fetchSuggestionFromChatGpt from "../utils/fetchSuggestionFromChatGpt";
const Prompt = () => {

    const [input, setInput] = useState("")
    const { data, error, isLoading } = useSWR('/api/suggestion', fetchSuggestionFromChatGpt, {
        revalidateOnFocus: false,
    })
    return (
        <div className="m-10">
            <form className="flex flex-col lg:flex-row">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter in the Pormpt..."
                    className="flex-1 p-4 border-solid border-green-400 border-2 rounded-lg "
                />
                <button type="submit"
                    className={`p-4 font-bold ${input ? "bg-green-300 rounded-md transition-colors duration-200" : " text-gray-500 bg-slate-200  cursor-not-allowed border-2  rounded-md"}`}
                >Generate</button>
                <button type="button" className="p-4 bg-green-500  text-white duration-200 font-bold  rounded-md">Use Suggestion</button>
                <button type="button" className="p-4 bg-green-700  text-white  duration-200 font-bold  rounded-md">New Suggestion </button>
            </form>
        </div>
    );
};

export default Prompt;
