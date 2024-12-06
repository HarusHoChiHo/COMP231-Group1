import {Blog} from "@/lib/models/Blog";

interface IComment {
    id: string | null;
    content: string;
    publishDate: string;
}


export class Comments implements IComment{
    id: string | null;
    content: string;
    publishDate: string;
    blogId: string;
    
    constructor(id: string | null, content: string, publishDate: string, blogId: string) {
        this.id = id;
        this.content = content;
        this.publishDate = publishDate;
        this.blogId = blogId;
    }
}