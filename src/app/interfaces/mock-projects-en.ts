import { Project } from "./Project";
import { STACK } from "./mock-stack";

export const PROJECTSen: Project[] = [
    {
        id: 0,
        name: "ANBAR",
        description: "Freelance E-commerce project for decoration products. Client \"ANBAR\".",
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
        description: "Simple app to calculate tips per person and total amount, developed with HTML, CSS and Javascript. Frontend Mentor challenge.",
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
        name: "Tasks list",
        description: "Simple app to note tasks, developed with React, React Router, Redux and Tailwind CSS. Using localstorage to manage user data.",
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