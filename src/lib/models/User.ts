import {id} from "postcss-selector-parser";

interface IUser {
    id: string;
}

export class User implements IUser {
    id: string;
    
    constructor(id: string) {
        this.id = id;
    }
}