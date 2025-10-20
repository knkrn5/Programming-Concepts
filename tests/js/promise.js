import axios from "axios";
import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Message } from "../pages/aiDebate/AiDebatePage";
import { saveMessages } from "./indexedDb";

interface DebateRequestProps {
    API_URL: string;
    userInput: string;
    messages: Message[];
    debateId: string;
    debateTitle: string;
    currentAssistantMessage: string;
    setIsFetching: Dispatch<SetStateAction<boolean>>;
    setCurrentAssistantMessage: Dispatch<SetStateAction<string>>;
    setMessages: Dispatch<SetStateAction<Message[]>>;
    abortControllerRef: RefObject<AbortController | null>;
}

// const API_URL = import.meta.env.VITE_API_URL
// console.log(API_URL)

export async function debateRequest({ API_URL, userInput, messages, debateId, debateTitle, setIsFetching, setCurrentAssistantMessage, setMessages, abortControllerRef }: DebateRequestProps) {

    // Add user message
    const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userInput.trim(),
        timestamp: new Date(),
    };

    let baseHistory = [...messages, userMessage];
    await saveMessages(debateId, {
        messages: baseHistory,
        debateTitle: debateTitle,
        chatId: debateId,
    });
    setMessages((prev) => [...prev, userMessage]);
    setIsFetching(true);
    setCurrentAssistantMessage("");

    const controller = new AbortController();
    abortControllerRef.current = controller;
    let fullResponse = "";

    fetch(`${API_URL}/aichats/aichat-res-manu`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question: userInput,
            model: "google/gemma-3-1b-it",
            chat_history: messages,
            persona: "default",
        }),
        signal: controller.signal,
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder("utf-8");

            async function readStream(): Promise<void> {
                if (!reader) {
                    setIsFetching(false);
                    setCurrentAssistantMessage("");
                    return;
                }
                while (!controller.signal.aborted) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split("/n");
                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const message = line.replace(/^data: /, "");

                            // Check for special messages
                            // if (message === "[STREAM_CANCELLED]") {
                            //   stopStreaming();
                            //   return Promise.resolve();
                            // }
                            // if (message.startsWith("[ERROR:")) {
                            //   console.error("Stream error:", message);
                            //   continue;
                            // }

                            fullResponse += message;
                            // console.log(fullResponse)
                            setCurrentAssistantMessage(fullResponse);
                        }
                    }
                }
                if (fullResponse.trim() && !controller.signal.aborted) {
                    const assistantMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: fullResponse.trim(),
                        timestamp: new Date(),
                    };
                    baseHistory = [...baseHistory, assistantMessage];
                    void saveMessages(debateId, { messages: baseHistory, debateTitle: debateTitle, chatId: debateId });
                    setMessages((prev) => [...prev, assistantMessage]);
                }
                setIsFetching(false);
                setCurrentAssistantMessage("");
                abortControllerRef.current = null;
                return Promise.resolve();
            }

            await readStream();
        })
        .catch((error) => {
            console.log(error.name);
            if (error.name === "AbortError") {
                console.log("Fetch aborted by user");

                if (fullResponse.trim()) {
                    const assistantMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: fullResponse.trim(),
                        timestamp: new Date(),
                    };

                    setMessages((prev) => {
                        const updated = [...prev, assistantMessage];
                        void saveMessages(debateId, {
                            messages: updated,
                            debateTitle: debateTitle,
                            chatId: debateId,
                        });
                        return updated;
                    });
                }

            } else if (axios.isAxiosError(error)) {
                console.error("Axios error fetching AI response:", error.message);
            } else {
                console.error("Error fetching AI response:", error);
            }
        })
        .finally(() => {
            setIsFetching(false);
            setCurrentAssistantMessage("");
            abortControllerRef.current = null;
        });
}


export const stopStreaming = (abortControllerRef: RefObject<AbortController | null>, setIsFetching: Dispatch<SetStateAction<boolean>>, setCurrentAssistantMessage: Dispatch<SetStateAction<string>>) => {
    console.log("Stopping stream...");

    // Cancel the fetch request
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }

    // Save current partial response as a message
    // if (currentAssistantMessage.trim()) {
    //     const assistantMessage: Message = {
    //         id: (Date.now() + 1).toString(),
    //         role: "assistant",
    //         content: currentAssistantMessage.trim(),
    //         timestamp: new Date(),
    //     };

    //     setMessages((prev) => {
    //         const updated = [...prev, assistantMessage];
    //         void saveMessages(debateId, {
    //             messages: updated,
    //             debateTitle: debateTitle,
    //             chatId: debateId!,
    //         });
    //         return updated;
    //     });
    // }

    // Reset states
    setIsFetching(false);
    setCurrentAssistantMessage("");
    abortControllerRef.current = null;
}