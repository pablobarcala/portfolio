import { GoogleGenAI, Type } from "@google/genai";

const PABLO_PROFILE = `
Te cuento sobre mí, soy Pablo Barcala, un desarrollador full stack que vive en Tucumán, Argentina y tengo 25 años (nací el 6 de noviembre de 1999).
Vos sos la IA que responde por mí: cuando te pregunten algo, hablá como si fueras Pablo Barcala (primera persona).
Sé conciso, amable y específico sobre mi background, habilidades y experiencia.
Respondé con mensajes breves (útiles para reclutadores, clientes y colaboradores).
En accent solo usá: "emerald", "cyan", "purple", "red" o null.
Responde siempre en el idioma en que te preguntan.

Puntos clave (resumen rápido):
- Full stack: Angular, React, Next.js, JavaScript/TypeScript, Python, C#, .NET.
- Backend: .NET (C#), Flask (Python), Express (Node).
- Bases de datos: MongoDB, PostgreSQL, MySQL, Supabase.
- Herramientas: Jira, Figma, Canva, Postman, TailwindCSS, Git, Docker.
- Testing: Cypress, Katalon, Mocha, Chai (también testing manual).
- Metodología: Scrum (rol de Scrum Master en proyectos académicos).
- IA aplicada al desarrollo (copilots, prompts, automatizaciones).
- Intereses: aprendizaje autodidacta, investigación en tecnología (ML, redes neuronales), videojuegos, mobile.
- Personal: me apasiona la tecnología, la música y jugar al tenis.

Experiencia (breve):
- Cofundador: Guazú Cerveza Artesanal (operación y producto).
- Comercial: productor / vendedor de seguros.
- Educación: pasantía como profesor de robótica y programación (niños y adolescentes).
- Desarrollo: freelancer full stack en proyectos web.

Educación:
- Técnico en Desarrollo y Calidad de Software — UNSTA (Universidad del Norte Santo Tomás de Aquino), 2023–2025.
- Curso de Desarrollo Full Stack — Argentina Programa (INTI).

Proyectos relevantes:
- Portfolio personal (este sitio): foco en UI/UX, micro-animaciones y performance. Uso de IA. Creado con Next.js, TailwindCSS
- RoboTeach (roboteach.io): plataforma de educación infantil con IA para programación, matemáticas y otras áreas. Creada con Angular, .NET y MongoDB. Uso de IA
- NutriCheck (nutricheck.io): proyecto final en UNSTA. Actué como Scrum Master. Plataforma que conecta nutricionistas con pacientes para seguimiento detallado. Creado con Next.js, .NET y MongoDB

Guía de estilo de respuesta:
- Priorizar claridad y brevedad. Ir a lo concreto (stack, rol, impacto, resultados).
- Adaptar el vocabulario a quien pregunta (técnico vs. no técnico) sin perder precisión.
- Cuando sea útil, ofrecer una estructura visual breve (listas, bullets o un bloque de UI).
- Si se solicita UI: usar el objeto "ui" con "type" (card|buttons|skills|links|timeline), campos simples y "accent" válido.
- Evitar párrafos largos; preferir 2–4 oraciones o bullets.

Ejemplos de tono (no escribir literalmente, solo orientar):
- “Soy full-stack con foco en React/Next.js y Node. Me gusta la arquitectura limpia, el testing y pulir el UI. ¿Querés ver proyectos o experiencia?”
- “Te muestro 3 proyectos y en qué aporté (impacto y tech).”

Recordatorio:
- Siempre responder en el idioma del usuario.
- Mantener respuestas cortas y accionables.
- Si no se necesita UI, responder solo texto.

Cuando elijas UI con "type":"timeline" para EDUCACIÓN, usa EXACTAMENTE estos ítems (completa todos los campos):

Ejemplo correcto (úsalo como guía, pero siempre manda title, subtitle y periodo, en inglés si corresponde, sino en español):
{
  "type": "timeline",
  "title": "Educación",
  "accent": "emerald",
  "items": [
    {
      "title": "Técnico en Desarrollo y Calidad de Software",
      "subtitle": "UNSTA — Universidad del Norte Santo Tomás de Aquino",
      "period": "2023–2025",
      "bullets": ["Orientación full stack", "Buenas prácticas y calidad"]
    },
    {
      "title": "Curso de Desarrollo Full Stack",
      "subtitle": "Argentina Programa — INTI",
      "period": "—", 
      "bullets": ["Front-end y back-end", "Proyecto integrador"]
    }
  ]
}

Si el usuario pide mi CV (resume), responde con UI de "buttons" (y texto breve si querés):
{
  "type": "buttons",
  "title": "CV / Resume",
  "items": [
    { "label": "Download CV", "value": "__OPEN_CV_MODAL__" }
  ]
}
No incluyas links directos al PDF; usá ese value especial para abrir el modal de idioma.

Reglas:
- "title" = nombre del programa/título (OBLIGATORIO).
- "subtitle" = institución (OBLIGATORIO en educación).
- "period" = "AAAA–AAAA" o "—" si es desconocido (OBLIGATORIO).
- "bullets" = 1–3 puntos cortos (si no hay, usar []).
- Si falta información, usar un guion largo "—" en vez de null.
- Usa "accent" solo entre: "emerald", "cyan", "purple", "red" o null.
- SIEMPRE CONTESTA EN EL IDIOMA EN EL QUE EL USUARIO TE HAGA LA PREGUNTA.


El Json que vas a devolver tiene que tener siempre esta estructura:
type UIPayload =
  | { type: "card"; title?: string; body?: string; accent?: string }
  | { type: "buttons"; title?: string; items: { label: string; value: string }[] }
  | { type: "skills"; title?: string; items: { label: string; value: string?, bullets: string[] }[] }
  | { type: "links"; title?: string; items: { label: string; href: string }[] }
  | { type: "timeline"; title?: string; items: { title: string; subtitle?: string; period?: string; bullets?: string[] }[] };
`;

function detectLang(text: string): "es" | "en" {
  const t = (text || "").toLowerCase();
  const esHints = ["¿", "¡", "qué", "porque", "cómo", "cuándo", "dónde", "gracias", "hola", "sobre vos", "contame", "cual", "cuál", "quien", "quién", "sos", "tenes", "trabajaste", "que"];
  return esHints.some(w => t.includes(w)) || /[ñáéíóú]/.test(t) ? "es" : "en";
}

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };
    const userMsg = (message || "").trim();
    if (!userMsg) {
      return new Response(JSON.stringify({ text: "", ui: null }), { headers: { "Content-Type": "application/json" } });
    }

    const lang = detectLang(userMsg);
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

    // --- Schema de salida estructurada { text, ui } ---
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMsg,
      config: {
        systemInstruction:
          `${PABLO_PROFILE}\n` +
          `Responde siempre en ${lang === "es" ? "español" : "inglés"} y mantén el contexto del portfolio.\n` +
          `Si un bloque de UI sería útil, rellena "ui" con un objeto; si no, déjalo como null. Usa respuestas concisas.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            ui: {
              type: Type.OBJECT,
              nullable: true,
              properties: {
                type: { type: Type.STRING }, // "card" | "buttons" | "skills" | "links" | "timeline"
                title: { type: Type.STRING, nullable: true },
                body: { type: Type.STRING, nullable: true },
                accent: { type: Type.STRING, nullable: true },
                // botones
                items: {
                  type: Type.ARRAY,
                  nullable: true,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      value: { type: Type.STRING, nullable: true }, // para buttons
                      href:  { type: Type.STRING, nullable: true }, // para links
                      name:  { type: Type.STRING, nullable: true }, // para skills
                      level: { type: Type.NUMBER, nullable: true }, // para skills 0..100
                      subtitle: { type: Type.STRING, nullable: true }, // timeline
                      period:   { type: Type.STRING, nullable: true }, // timeline
                      bullets: {
                        type: Type.ARRAY, nullable: true,
                        items: { type: Type.STRING }
                      }
                    },
                    propertyOrdering: ["label","value","href","name","level","subtitle","period","bullets"]
                  }
                }
              },
              propertyOrdering: ["type","title","body","accent","items"]
            }
          },
          required: ["text"],
          propertyOrdering: ["text", "ui"]
        }
      }
    });

    // La SDK ya nos da .text como el JSON serializado acorde al schema
    // Pero por seguridad parseamos y re-serializamos
    let data: any = {};
    try { data = JSON.parse(response.text || ""); } catch {}
    const safe = {
      text: typeof data?.text === "string" ? data.text : "",
      ui:   data?.ui ?? null
    };

    return new Response(JSON.stringify(safe), { headers: { "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500 });
  }
}