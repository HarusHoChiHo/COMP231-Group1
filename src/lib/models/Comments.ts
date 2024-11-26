import {Blog} from "@/lib/models/Blog";

interface IComment {
    id: string | null;
    content: string;
    publishDate: string;
}

export class CommentsCreation implements IComment{
    id: string | null;
    content: string;
    publishDate: string;
    blogId: {id: string};

    constructor(id: string | null, content: string, publishDate: string, blogId: {id:string}) {
        this.id = id;
        this.content = content;
        this.publishDate = publishDate;
        this.blogId = blogId;
    }
}


export class Comments implements IComment{
    id: string | null;
    content: string;
    publishDate: string;
    blogId: Blog;
    
    constructor(id: string | null, content: string, publishDate: string, blogId: Blog) {
        this.id = id;
        this.content = content;
        this.publishDate = publishDate;
        this.blogId = blogId;
    }
}