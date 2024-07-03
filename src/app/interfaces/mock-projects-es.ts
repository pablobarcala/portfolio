import { Project } from "./Project";
import { STACK } from "./mock-stack";

export const PROJECTSes: Project[] = [
    {
        id: 0,
        name: "ANBAR",
        description: "Proyecto freelance de E-commerce para venta de productos de decoración, para cliente \"ANBAR\".",
        img: "anbar.png",
        stack: [
            STACK[0],
            STACK[2],
            STACK[4],
            STACK[14]
        ]
    },
    {
        id: 1,
        name: "Tip Calculator",
        description: "App simple para calcular la propina por persona además del monto total a pagar, desarrollado con HTML, CSS y Javascript. Desafío de Frontend Mentor.",
        img: "tip-calculator.png",
        stack: [
            STACK[9],
            STACK[10],
            STACK[5],
            STACK[12]
        ],
        code: "https://github.com/pablobarcala/Tip-Calculator",
        url: "https://pablobarcala.github.io/Tip-Calculator/"
    },
    {
        id: 2,
        name: "Finanzas personales",
        description: "App simple para anotar gastos diarios, desarrollada con React, Axios, JSON Server y Styled Components para los estilos.",
        img: "finanzas.png",
        stack: [
            STACK[1],
            STACK[5],
            STACK[21]
        ],
        code: "https://github.com/pablobarcala/finanzas-personales"
    }
]