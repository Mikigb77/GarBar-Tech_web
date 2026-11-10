import brand from "./brand.json";

export const locales = ["en", "es", "ca"] as const;
export type Locale = (typeof locales)[number];
export type Section = "home" | "legal" | "privacy" | "terms";

export const company = {
  brand: brand.name,
  name: "GARBAR, IN-TEC, S.L.",
  taxId: "B56760374",
  address: "Carrer Sant Antoni Mª Claret, 24, 3ª planta, 08037 Barcelona, España",
  register: "Registre Mercantil de Barcelona · Tom 49105 · Foli 130 · Full 607875 · Inscripció 1",
  email: "info@garbar.tech",
};

export const siteUrl = (
  process.env.SITE_URL || "https://garbar-intec.tech-garbar.chatgpt.site"
).replace(/\/$/, "");
export const indexSite = process.env.INDEX_SITE === "true";
export const hostingProvider = process.env.HOSTING_PROVIDER || "sites";

export function taskflowUrl(locale: Locale) {
  const path = locale === "en" ? "/?lang=en" : `/${locale}/`;
  return `https://taskflow.garbar.tech${path}`;
}

export function lucidSagaUrl(locale: Locale) {
  return `https://lucidsaga.garbar.tech/${locale}`;
}

const en = {
  meta: "GarBar is a Barcelona technology company building its own apps: TaskFlow, which turns what you say into tasks on your calendar, and Lucid Saga, an endless AI story that remembers you.",
  skip: "Skip to content",
  nav: {
    about: "Company",
    projects: "Products",
    contact: "Say hello",
    menu: "Menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Technology company · Barcelona",
    first: "Tools for your day.",
    second: "Worlds for your",
    accent: "imagination.",
    body: "We’re GarBar. We build our own apps with AI and a lot of care for design. One turns what you say into a plan. The other turns a single line into a story that never ends.",
    cta: "See what we’re building",
    secondary: "Say hello",
    scroll: "Scroll",
    demo: {
      label: "Two of our ideas, at work",
      say: "You say",
      act: "You do",
      taskflow: {
        input: "Tomorrow, call the dentist and buy bread.",
        output: "Tomorrow",
        tasks: ["Call the dentist", "Buy bread"],
      },
      lucid: {
        input: "I raise my palm and turn his staff toward the well.",
        output: "The Last Outer Disciple",
        story:
          "Your qi answers late, but it answers. The staff glances off your palm and strikes the stone lip of the well. Steam bursts up between you.",
      },
    },
  },
  marquee: [
    "Voice into plans",
    "One line into a whole world",
    "AI with a purpose",
    "Designed in Barcelona",
    "English · Español · Català",
  ],
  about: {
    label: "The company",
    statement:
      "GarBar takes ideas from a first question to an app in your hand. Software, AI and design share one table, for the things you need to do and the worlds you’ve yet to imagine.",
    facts: [
      { value: "02", label: "products of our own, in development" },
      { value: "03", label: "languages in each one: English, Spanish and Catalan" },
      { value: "BCN", label: "where every idea is designed and built" },
    ],
  },
  projects: {
    label: "Our products",
    title: "Two products.",
    accent: "One curiosity.",
    intro: "One helps you get through the day. The other takes you somewhere else entirely.",
    development: "In development",
    coming: "Coming soon to Android",
    visit: "Explore",
    features: "A closer look",
    taskflow: {
      category: "For the everyday",
      title: "Say it, and it’s on ",
      titleAccent: "your calendar.",
      body: "Tap one button and say what you need to do, even several things at once. TaskFlow puts each one on its day and can remind you beforehand.",
      features: [
        { text: "Say several things at once" },
        { text: "Your day on one calendar" },
        { text: "Your meetings become notes", pro: true },
        { text: "Notes, checklists and files" },
        { text: "Your tasks, even offline" },
      ],
      quote: "“Tomorrow, call the dentist and buy bread.”",
      imageAlt:
        "TaskFlow on an Android phone: tomorrow’s calendar with two tasks, Call the dentist and Buy bread, and the Add a task button.",
      app: {
        week: "Your week",
        weekdays: ["M", "T", "W", "T", "F", "S", "S"],
        day: "Tomorrow",
        event: { title: "A fresh start", detail: "Review this week’s plans" },
        tasks: ["Call the dentist", "Buy bread"],
        added: "2 things to add",
        addTask: "Add a task",
        tabs: ["Calendar", "Tasks", "Notes", "Settings"],
      },
    },
    lucid: {
      category: "For the imagination",
      title: "The story that remembers.",
      body: "An endless AI story game. Pick a world or dream up your own in one line, then type, tap or say what you do. The storyteller writes what happens next, draws the moments that matter and reads them aloud.",
      features: [
        "Choose a world or create your own",
        "Shape the story through your actions",
        "Discover illustrated scenes and narration",
      ],
      worlds: "Start from one of 23 worlds",
      imageAlt:
        "A traveller stepping toward a glowing golden gateway in a dark forest, from Lucid Saga.",
    },
  },
  approach: {
    label: "How we work",
    title: "Technology with",
    accent: "a reason to exist.",
    items: [
      {
        title: "Start with people.",
        body: "An idea matters when it means something to someone. We start with an experience worth making better.",
      },
      {
        title: "Stay curious.",
        body: "Practical tools and imagined worlds belong in the same conversation. Different questions lead to different possibilities.",
      },
      {
        title: "Care about the details.",
        body: "The way a product feels is part of what it does. We give design and engineering a seat at the same table.",
      },
    ],
  },
  contact: {
    label: "Say hello",
    first: "Got a question,",
    second: "or an idea?",
    body: "About the company, our products, or just a conversation. We’d like to hear from you.",
    action: "Write to us",
    copy: "Copy email",
    copied: "Email copied",
    error: "Select and copy the email address above.",
    location: "Built with curiosity in Barcelona.",
  },
  footer: {
    statement: "Tools for your day.\nWorlds for your imagination.",
    company: "Company",
    products: "Products",
    information: "Information",
    legal: "Company details",
    privacy: "Privacy",
    terms: "Terms & conditions",
    rights: "All rights reserved.",
    back: "Back to top",
  },
  legal: {
    label: "Company information",
    title: "The company\nbehind the ideas.",
    intro: "The company responsible for this website and for the TaskFlow and Lucid Saga products.",
    name: "Registered company",
    tax: "Tax number (NIF)",
    address: "Registered address",
    register: "Commercial register",
    contact: "General enquiries",
    products: "About our products",
    productBody:
      "TaskFlow and Lucid Saga have their own websites, support contacts, terms and privacy information. Please refer to the relevant product website for information about its services.",
    home: "Back to the company",
  },
  notFound: {
    title: "That idea isn’t here.",
    body: "We couldn’t find this page. Head back to the company and explore what we’re building.",
    action: "Back to the company",
  },
};

type Copy = typeof en;
const es: Copy = {
  meta: "GarBar es una empresa tecnológica de Barcelona que crea sus propias apps: TaskFlow, que convierte lo que dices en tareas en tu calendario, y Lucid Saga, una historia infinita con IA que te recuerda.",
  skip: "Saltar al contenido",
  nav: {
    about: "Empresa",
    projects: "Productos",
    contact: "Escríbenos",
    menu: "Menú",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Empresa tecnológica · Barcelona",
    first: "Herramientas para tu día.",
    second: "Mundos para tu",
    accent: "imaginación.",
    body: "Somos GarBar. Creamos nuestras propias apps con IA y mucho cuidado por el diseño. Una convierte lo que dices en un plan. La otra convierte una sola frase en una historia que no termina nunca.",
    cta: "Mira lo que creamos",
    secondary: "Escríbenos",
    scroll: "Desliza",
    demo: {
      label: "Dos de nuestras ideas, en marcha",
      say: "Tú dices",
      act: "Tú haces",
      taskflow: {
        input: "Mañana, llamar al dentista y comprar pan.",
        output: "Mañana",
        tasks: ["Llamar al dentista", "Comprar pan"],
      },
      lucid: {
        input: "Alzo la palma y desvío su bastón hacia el pozo.",
        output: "El último discípulo externo",
        story:
          "Tu qi responde tarde, pero responde. El bastón resbala en tu palma y golpea el borde de piedra del pozo. El vapor estalla entre los dos.",
      },
    },
  },
  marquee: [
    "Tu voz, convertida en plan",
    "Una frase, un mundo entero",
    "IA con un propósito",
    "Diseñado en Barcelona",
    "English · Español · Català",
  ],
  about: {
    label: "La empresa",
    statement:
      "GarBar lleva las ideas desde la primera pregunta hasta una app en tu mano. Software, IA y diseño comparten mesa, para lo que tienes que hacer y para los mundos que aún no has imaginado.",
    facts: [
      { value: "02", label: "productos propios, en desarrollo" },
      { value: "03", label: "idiomas en cada uno: inglés, castellano y catalán" },
      { value: "BCN", label: "donde diseñamos y creamos cada idea" },
    ],
  },
  projects: {
    label: "Nuestros productos",
    title: "Dos productos.",
    accent: "Una misma curiosidad.",
    intro: "Uno te ayuda con tu día a día. El otro te lleva a otro lugar.",
    development: "En desarrollo",
    coming: "Próximamente en Android",
    visit: "Descubre",
    features: "Más de cerca",
    taskflow: {
      category: "Para el día a día",
      title: "Dilo y ya está en ",
      titleAccent: "tu calendario.",
      body: "Toca un botón y di lo que tienes que hacer, aunque sean varias cosas a la vez. TaskFlow pone cada una en su día y puede avisarte antes.",
      features: [
        { text: "Di varias cosas a la vez" },
        { text: "Tu día en un calendario" },
        { text: "Tus reuniones se convierten en notas", pro: true },
        { text: "Notas, listas de pasos y archivos" },
        { text: "Tus tareas, también sin conexión" },
      ],
      quote: "«Mañana, llamar al dentista y comprar pan»",
      imageAlt:
        "TaskFlow en un móvil Android: el calendario de mañana con dos tareas, Llamar al dentista y Comprar pan, y el botón Añadir tarea.",
      app: {
        week: "Tu semana",
        weekdays: ["L", "M", "X", "J", "V", "S", "D"],
        day: "Mañana",
        event: { title: "Un buen comienzo", detail: "Repasa los planes de la semana" },
        tasks: ["Llamar al dentista", "Comprar pan"],
        added: "2 cosas para añadir",
        addTask: "Añadir tarea",
        tabs: ["Calendario", "Tareas", "Notas", "Ajustes"],
      },
    },
    lucid: {
      category: "Para la imaginación",
      title: "La historia que lo recuerda todo.",
      body: "Un juego de historias infinitas con IA. Elige un mundo o invéntate el tuyo en una frase, y escribe, toca o di lo que haces. El narrador escribe lo que pasa después, dibuja los momentos importantes y te los lee en voz alta.",
      features: [
        "Elige un mundo o crea el tuyo",
        "Da forma a la historia con tus acciones",
        "Descubre escenas ilustradas y narradas",
      ],
      worlds: "Empieza en uno de sus 23 mundos",
      imageAlt:
        "Un viajero se acerca a un portal dorado en un bosque oscuro, una ilustración de Lucid Saga.",
    },
  },
  approach: {
    label: "Cómo trabajamos",
    title: "Tecnología con",
    accent: "razón de ser.",
    items: [
      {
        title: "Empezar por las personas.",
        body: "Una idea importa cuando significa algo para alguien. Partimos de una experiencia que merece mejorar.",
      },
      {
        title: "Mantener la curiosidad.",
        body: "Las herramientas prácticas y los mundos imaginarios caben en la misma conversación. Preguntas distintas abren posibilidades distintas.",
      },
      {
        title: "Cuidar los detalles.",
        body: "Cómo se siente un producto forma parte de lo que hace. Diseño e ingeniería se sientan en la misma mesa.",
      },
    ],
  },
  contact: {
    label: "Escríbenos",
    first: "¿Tienes una pregunta",
    second: "o una idea?",
    body: "Sobre la empresa, nuestros productos o simplemente para hablar. Nos encantará escucharte.",
    action: "Escríbenos",
    copy: "Copiar correo",
    copied: "Correo copiado",
    error: "Selecciona y copia el correo que aparece arriba.",
    location: "Creado con curiosidad en Barcelona.",
  },
  footer: {
    statement: "Herramientas para tu día.\nMundos para tu imaginación.",
    company: "Empresa",
    products: "Productos",
    information: "Información",
    legal: "Datos de la empresa",
    privacy: "Privacidad",
    terms: "Términos y condiciones",
    rights: "Todos los derechos reservados.",
    back: "Volver arriba",
  },
  legal: {
    label: "Información de la empresa",
    title: "La empresa\ndetrás de las ideas.",
    intro: "La empresa responsable de esta web y de los productos TaskFlow y Lucid Saga.",
    name: "Razón social",
    tax: "NIF",
    address: "Domicilio social",
    register: "Registro Mercantil",
    contact: "Consultas generales",
    products: "Sobre nuestros productos",
    productBody:
      "TaskFlow y Lucid Saga cuentan con sus propias webs, contactos de soporte, condiciones e información de privacidad. Consulta la web del producto correspondiente para conocer sus servicios.",
    home: "Volver a la empresa",
  },
  notFound: {
    title: "Esa idea no está aquí.",
    body: "No encontramos esta página. Vuelve a la empresa y descubre lo que estamos creando.",
    action: "Volver a la empresa",
  },
};

const ca: Copy = {
  meta: "GarBar és una empresa tecnològica de Barcelona que crea les seves pròpies apps: TaskFlow, que converteix el que dius en tasques al teu calendari, i Lucid Saga, una història infinita amb IA que et recorda.",
  skip: "Ves al contingut",
  nav: {
    about: "Empresa",
    projects: "Productes",
    contact: "Escriu-nos",
    menu: "Menú",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Empresa tecnològica · Barcelona",
    first: "Eines per al teu dia.",
    second: "Mons per a la teva",
    accent: "imaginació.",
    body: "Som GarBar. Creem les nostres pròpies apps amb IA i molta cura pel disseny. Una converteix el que dius en un pla. L’altra converteix una sola frase en una història que no s’acaba mai.",
    cta: "Mira què creem",
    secondary: "Escriu-nos",
    scroll: "Llisca",
    demo: {
      label: "Dues de les nostres idees, en marxa",
      say: "Tu dius",
      act: "Tu fas",
      taskflow: {
        input: "Demà, trucar al dentista i comprar pa.",
        output: "Demà",
        tasks: ["Trucar al dentista", "Comprar pa"],
      },
      lucid: {
        input: "Alço el palmell i desvio el seu bastó cap al pou.",
        output: "L’últim deixeble extern",
        story:
          "El teu qi respon tard, però respon. El bastó llisca pel teu palmell i colpeja la vora de pedra del pou. El vapor esclata entre tots dos.",
      },
    },
  },
  marquee: [
    "La teva veu, convertida en pla",
    "Una frase, un món sencer",
    "IA amb un propòsit",
    "Dissenyat a Barcelona",
    "English · Español · Català",
  ],
  about: {
    label: "L’empresa",
    statement:
      "GarBar porta les idees des de la primera pregunta fins a una app a la teva mà. Programari, IA i disseny comparteixen taula, per a tot el que has de fer i per als mons que encara no has imaginat.",
    facts: [
      { value: "02", label: "productes propis, en desenvolupament" },
      { value: "03", label: "idiomes en cadascun: anglès, castellà i català" },
      { value: "BCN", label: "on dissenyem i creem cada idea" },
    ],
  },
  projects: {
    label: "Els nostres productes",
    title: "Dos productes.",
    accent: "Una mateixa curiositat.",
    intro: "Un t’ajuda amb el dia a dia. L’altre t’endu a un altre lloc.",
    development: "En desenvolupament",
    coming: "Aviat a Android",
    visit: "Descobreix",
    features: "Més de prop",
    taskflow: {
      category: "Per al dia a dia",
      title: "Digues-ho i ja és al ",
      titleAccent: "teu calendari.",
      body: "Toca un botó i digues el que has de fer, encara que siguin diverses coses alhora. TaskFlow posa cadascuna al seu dia i et pot avisar abans.",
      features: [
        { text: "Digues diverses coses alhora" },
        { text: "El teu dia en un calendari" },
        { text: "Les teves reunions es converteixen en notes", pro: true },
        { text: "Notes, llistes de passos i fitxers" },
        { text: "Les tasques, també sense connexió" },
      ],
      quote: "«Demà, trucar al dentista i comprar pa»",
      imageAlt:
        "TaskFlow en un mòbil Android: el calendari de demà amb dues tasques, Trucar al dentista i Comprar pa, i el botó Afegeix una tasca.",
      app: {
        week: "La teva setmana",
        weekdays: ["dl", "dt", "dc", "dj", "dv", "ds", "dg"],
        day: "Demà",
        event: { title: "Un bon començament", detail: "Repassa els plans de la setmana" },
        tasks: ["Trucar al dentista", "Comprar pa"],
        added: "2 coses per afegir",
        addTask: "Afegeix una tasca",
        tabs: ["Calendari", "Tasques", "Notes", "Configuració"],
      },
    },
    lucid: {
      category: "Per a la imaginació",
      title: "La història que ho recorda tot.",
      body: "Un joc d’històries infinites amb IA. Tria un món o inventa’t el teu en una frase, i escriu, toca o digues què fas. El narrador escriu què passa després, dibuixa els moments importants i te’ls llegeix en veu alta.",
      features: [
        "Tria un món o crea el teu",
        "Dona forma a la història amb les teves accions",
        "Descobreix escenes il·lustrades i narrades",
      ],
      worlds: "Comença en un dels seus 23 mons",
      imageAlt:
        "Un viatger s’acosta a un portal daurat en un bosc fosc, una il·lustració de Lucid Saga.",
    },
  },
  approach: {
    label: "Com treballem",
    title: "Tecnologia amb",
    accent: "raó de ser.",
    items: [
      {
        title: "Començar per les persones.",
        body: "Una idea importa quan significa alguna cosa per a algú. Partim d’una experiència que val la pena millorar.",
      },
      {
        title: "Mantenir la curiositat.",
        body: "Les eines pràctiques i els mons imaginaris caben en una mateixa conversa. Preguntes diferents obren possibilitats diferents.",
      },
      {
        title: "Cuidar els detalls.",
        body: "Com se sent un producte forma part del que fa. Disseny i enginyeria seuen a la mateixa taula.",
      },
    ],
  },
  contact: {
    label: "Escriu-nos",
    first: "Tens una pregunta",
    second: "o una idea?",
    body: "Sobre l’empresa, els nostres productes o simplement per parlar. Ens agradarà escoltar-te.",
    action: "Escriu-nos",
    copy: "Copia el correu",
    copied: "Correu copiat",
    error: "Selecciona i copia el correu que apareix a sobre.",
    location: "Creat amb curiositat a Barcelona.",
  },
  footer: {
    statement: "Eines per al teu dia.\nMons per a la teva imaginació.",
    company: "Empresa",
    products: "Productes",
    information: "Informació",
    legal: "Dades de l’empresa",
    privacy: "Privacitat",
    terms: "Termes i condicions",
    rights: "Tots els drets reservats.",
    back: "Torna a dalt",
  },
  legal: {
    label: "Informació de l’empresa",
    title: "L’empresa\ndarrere de les idees.",
    intro: "L’empresa responsable d’aquest web i dels productes TaskFlow i Lucid Saga.",
    name: "Raó social",
    tax: "NIF",
    address: "Domicili social",
    register: "Registre Mercantil",
    contact: "Consultes generals",
    products: "Sobre els nostres productes",
    productBody:
      "TaskFlow i Lucid Saga tenen els seus propis webs, contactes de suport, condicions i informació de privacitat. Consulta el web del producte corresponent per conèixer els seus serveis.",
    home: "Torna a l’empresa",
  },
  notFound: {
    title: "Aquesta idea no és aquí.",
    body: "No hem trobat aquesta pàgina. Torna a l’empresa i descobreix què estem creant.",
    action: "Torna a l’empresa",
  },
};

export const copy: Record<Locale, Copy> = { en, es, ca };

export function routeInfo(path: string[] = []): { locale: Locale; section: Section } | null {
  if (!path.length) return { locale: "en", section: "home" };
  const locale = path[0] as Locale;
  if (!locales.includes(locale) || path.length > 2) return null;
  const section = path[1] || "home";
  if (section !== "home" && section !== "legal" && section !== "privacy" && section !== "terms")
    return null;
  return { locale, section };
}

export function pagePath(locale: Locale, section: Section = "home") {
  return `/${locale}/${section === "home" ? "" : `${section}/`}`;
}
