"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr"
import fetchSuggestionFromChatGpt from "../utils/fetchSuggestionFromChatGpt";
import fetchImages from "../utils/fetchImages";
import { toast } from "react-hot-toast";


const Prompt = () => {

    const [input, setInput] = useState("")
    const { data: suggestion, isLoading, mutate, isValidating } = useSWR('/api/suggestion', fetchSuggestionFromChatGpt, {
        revalidateOnFocus: false,
    })
    const loading = isLoading || isValidating


    const submitPrompt = async (useSuggestion?: boolean) => {
        const inputPrompt = input;
        setInput("")

        const sentPrompt = useSuggestion ? suggestion : inputPrompt

        const notificationPromptShort = sentPrompt.slice(0, 20);

        const notification = toast.loading(
            `DALL·E is creating: ${notificationPromptShort}...`
        );

        const res = await fetch("/api/generateImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: sentPrompt })
        })

        const data = await res.json();

        if (data.error) {
            toast.error(data.error);
        } else {
            toast.success(`Your Art has been Generated!`, {
                id: notification,
            });
        }

        updateImages()
    }

    const { mutate: updateImages } = useSWR("images", fetchImages, {
        revalidateOnFocus: false,
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await submitPrompt();
    }

    return (
        <div className="m-10">
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={(loading && "Getting your freshly baked suggestion...") || (suggestion || "Enter in the Pormpt...")}
                    className="flex-1 p-4 border-solid border-green-400 border-2 rounded-lg "
                />
                <button type="submit"
                    className={`p-4 font-bold ${input ? "bg-green-300 rounded-md transition-colors duration-200" : " text-gray-500 bg-slate-200  cursor-not-allowed border-2  rounded-md"}`}
                >Generate</button>
                <button type="button" className="p-4 bg-green-500  text-white duration-200 font-bold  rounded-md"
                    onClick={() => submitPrompt(true)}
                >Use Suggestion</button>
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
