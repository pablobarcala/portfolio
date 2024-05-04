import { Project } from "./Project";
import { STACK } from "./mock-stack";

export const PROJECTS: Project[] = [
    {
        id: 0,
        name: "ANBAR",
        description: "Proyecto freelance de E-commerce para venta de productos de decoración, para cliente \"ANBAR\".",
        img: "anbar.png",
        stack: [
            STACK[0],
            STACK[2],
            STACK[4]
        ],
        code: "google.com",
        url: "google.com"
    },
    {
        id: 1,
        name: "ANBAR",
        description: "Proyecto freelance de E-commerce para venta de productos de decoración, para cliente \"ANBAR\".",
        img: "anbar.png",
        stack: [
            STACK[0],
            STACK[2],
            STACK[4]
        ],
        code: "google.com",
        url: "google.com"
    }
]