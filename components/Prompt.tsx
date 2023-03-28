"use client";

import { useState } from "react";
import useSWR from "swr"
import fetchSuggestionFromChatGpt from "../utils/fetchSuggestionFromChatGpt";
const Prompt = () => {

    const [input, setInput] = useState("")
    const { data: suggestion, isLoading, mutate, isValidating } = useSWR('/api/suggestion', fetchSuggestionFromChatGpt, {
        revalidateOnFocus: false,
    })
    const loading = isLoading || isValidating
    console.log(suggestion)
    return (
        <div className="m-10">
            <form className="flex flex-col lg:flex-row">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={(loading && "Getting your freshly baked suggestion...") || (suggestion || "Enter in the Pormpt...")}
                    className="flex-1 p-4 border-solid border-green-400 border-2 rounded-lg "
                />
                <button type="submit"
                    className={`p-4 font-bold ${input ? "bg-green-300 rounded-md transition-colors duration-200" : " text-gray-500 bg-slate-200  cursor-not-allowed border-2  rounded-md"}`}
                >Generate</button>
                <button type="button" className="p-4 bg-green-500  text-white duration-200 font-bold  rounded-md">Use Suggestion</button>
                <button type="button" className="p-4 bg-green-700  text-white  duration-200 font-bold  rounded-md" onClick={mutate}>New Suggestion </button>
            </form>

            {
                input && (
                    <p className="italic pt-2 font-light ">Suggestion: {" "}
                        <span className="text-green-400">{loading ? "ChatGpt is Cooking..." : suggestion}</span>
                    </p>

                )
            }
        </div>
    );
};

export default Prompt;
