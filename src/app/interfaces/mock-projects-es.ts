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
        name: "Lista de tareas",
        description: "App simple para anotar tareas y marcarlas como completadas o no, desarrollada con React, React Router, Redux y Tailwind CSS. Además usando localstorage para guardar la información del usuario",
        img: "tasks.png",
        stack: [
            STACK[1],
            STACK[5],
            STACK[23],
            STACK[22]
        ],
        code: "https://github.com/pablobarcala/tasks-react",
        url: "https://tasks-react-a5d6e.web.app/"
    }
]