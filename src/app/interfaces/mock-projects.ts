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
        code: "https://github.com/pablobarcala/anbar-front"
    },
    {
        id: 1,
        name: "Tip Calculator",
        description: "Simple app para calcular la propina por persona además del monto total a pagar, desarrollado con HTML, CSS y Javascript. Desafío de Frontend Mentor.",
        img: "tip-calculator.png",
        stack: [
            STACK[5]
        ],
        code: "https://github.com/pablobarcala/Tip-Calculator",
        url: "https://pablobarcala.github.io/Tip-Calculator/"
    }
]