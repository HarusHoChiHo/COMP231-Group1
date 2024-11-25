import {id} from "postcss-selector-parser";

interface IUser {
    id: string; username: string;
}

export class User implements IUser {
    id: string; username: string;
    
    constructor(id: string, username: string) {
        this.id = id; 
        this.username = username;
    }
}