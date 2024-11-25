"use client"

import {useRouter} from "next/navigation";
import {useAuth} from "@/app/AuthContext";


export default function WriteArticleButton() {

    const router = useRouter();
    const {token} = useAuth();

    const handleWriteArticle = () => {
        
        router.push("/pages/text_editor");
    }

    return (
        <button
            className={"fixed top-[88%] right-[5%] min-w-[40px] min-h-[40px] size-14 bg-white hover:text-[#B18560]/75 text-[#B18560] border-[#09886A] border-4 rounded-full shadow-lg focus:outline-none focus:ring-yellow-100 focus:ring-opacity-75 hover:drop-shadow-1xl hover:rotate-180 transform transition duration-700 ease-in-out"}
            onClick={handleWriteArticle}
            hidden={token === null}
            title={"Write Article"}
        >
            <span className={"text-5xl font-bold"}>+</span>
        </button>
    )
} 