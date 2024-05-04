import { Stack } from "./Stack";

export interface Project {
    id?: number,
    name: string,
    description?: string,
    img: string,
    stack: Stack[],
    code?: string,
    url?: string
}