import {User} from "@/lib/models/User";
import {id} from "postcss-selector-parser";

interface IBlog{
    id: string;
    title: string;
    content: string;
    publishDate: string;
    author: User;
}

export class Blog implements IBlog{
    id: string;
    title: string;
    content: string;
    publishDate: string;
    author: User;


    constructor(id: string, title: string, content: string, publishDate: string, author: User) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.author = author;
    }
}
