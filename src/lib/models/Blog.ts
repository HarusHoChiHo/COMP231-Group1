interface IBlog{
    id: string | null;
    title: string;
    content: string;
    publishDate: string;
}

export class BlogCreation implements IBlog{
    id: null;
    title: string;
    content: string;
    publishDate: string;
    authorName: string;


    constructor(title: string, content: string, publishDate: string, authorName: string) {
        this.id = null;
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.authorName = authorName;
    }
}

export class Blog implements IBlog{
    id: string;
    title: string;
    content: string;
    publishDate: string;
    authorName: string;


    constructor(id: string, title: string, content: string, publishDate: string, authorName: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.authorName = authorName;
    }
}
