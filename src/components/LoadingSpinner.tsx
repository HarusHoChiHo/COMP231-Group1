"use client"
import {Spinner} from "@nextui-org/react";

export default function LoadingSpinner() {
    return (
        <div className={"w-dvw h-dvh flex flex-col items-center justify-center"}>
            <Spinner size={"lg"} content={"Loading..."} color={"primary"}/>
        </div>
    )
}