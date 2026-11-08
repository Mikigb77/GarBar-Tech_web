export const locales = ["en", "es", "ca"] as const;
export type Locale = (typeof locales)[number];
export type Section = "home" | "legal" | "privacy";

export const company = {
  brand: "GARBAR IN-TEC",
  name: "GARBAR, IN-TEC, S.L.",
  taxId: "B56760374",
  address: "Carrer Sant Antoni Mª Claret, 24, 3ª planta, 08037 Barcelona, España",
  register: "Registre Mercantil de Barcelona · Tom 49105 · Foli 130 · Full 607875 · Inscripció 1",
  email: "main@garbar.tech",
};

export const siteUrl = (
  process.env.SITE_URL || "https://garbar-intec.tech-garbar.chatgpt.site"
).replace(/\/$/, "");
export const indexSite = process.env.INDEX_SITE === "true";

const en = {
  meta: "Independent thinking. Thoughtful technology. Meet GARBAR IN-TEC, the Barcelona company building TaskFlow and Lucid Saga.",
  skip: "Skip to content",
  nav: {
    about: "The company",
    projects: "Our products",
    contact: "Let’s talk",
    menu: "Menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Independent minds. Shared ambition.",
    first: "Good ideas.",
    second: "Built into life.",
    body: "We’re a technology company turning curiosity into digital products. For the things you need to do. And the worlds you’ve yet to imagine.",
    cta: "Discover our products",
    secondary: "Meet the company",
    location: "Barcelona, Spain",
    note: "Always curious. Always building.",
    studio: "A little everyday. A little extraordinary.",
  },
  about: {
    label: "The company",
    title: "Curiosity starts it.",
    accent: "Care makes it real.",
    lead: "We’re GARBAR IN-TEC. We bring software, artificial intelligence and thoughtful design together to make ideas useful.",
    body: "Some ideas help us make more of the everyday. Others open up entirely new worlds. We make room for both, developing our own products from the first question to the details that make them feel right.",
    note: "Independent thinking. Made in Barcelona.",
  },
  projects: {
    label: "Our products",
    title: "Different ideas.",
    accent: "Same drive.",
    intro: "Two products. Two very different possibilities. The same curiosity behind them.",
    development: "In development",
    coming: "Coming soon to Android",
    visit: "Explore the product",
    features: "A closer look",
    taskflow: {
      category: "A little more everyday flow",
      title: "A clearer day.\nA lighter mind.",
      body: "Say what you need to do. TaskFlow turns it into tasks on your calendar, helping you make a plan without breaking your train of thought.",
      tags: ["Productivity", "Mobile", "AI"],
      features: [
        "Speak several tasks in one go",
        "Keep notes, checklists and files together",
        "Check and add tasks, even offline",
      ],
      quote: "Tomorrow, call the dentist and buy bread.",
      imageAlt: "TaskFlow’s Android calendar showing two tasks: call the dentist and buy bread.",
    },
    lucid: {
      category: "A lot more possibility",
      title: "Your imagination.\nA world that answers.",
      body: "Step into an endless AI story that remembers your choices. Pick a world or dream up your own, then type, tap or say what happens next.",
      tags: ["Interactive stories", "Mobile", "AI"],
      features: [
        "Choose a world or create your own",
        "Shape the story through your actions",
        "Discover illustrated scenes and narration",
      ],
      quote: "Every choice leaves a story.",
      imageAlt:
        "A traveller stepping toward a glowing golden gateway in a dark forest, from Lucid Saga.",
    },
  },
  approach: {
    label: "How we think",
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
    label: "Get in touch",
    first: "Good things start",
    second: "with a hello.",
    body: "A question about the company, an interesting idea, or just a conversation. We’d like to hear from you.",
    action: "Write to us",
    copy: "Copy email",
    copied: "Email copied",
    error: "Select and copy the email address above.",
    location: "Built with curiosity in Barcelona.",
  },
  footer: {
    statement: "Independent thinking.\nThoughtful technology.",
    company: "Company",
    products: "Products",
    information: "Information",
    legal: "Company details",
    privacy: "Privacy",
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
  privacy: {
    label: "Privacy",
    title: "A simple website.\nA clear explanation.",
    intro:
      "This page explains the information handled when you visit the GARBAR IN-TEC company website. Each of our products has its own privacy policy.",
    sections: [
      {
        title: "Who is responsible",
        body: "GARBAR, IN-TEC, S.L. is responsible for this company website. Our company details are linked below. For privacy enquiries, write to main@garbar.tech.",
      },
      {
        title: "Visiting this website",
        body: "Our hosting services process technical connection information, such as IP addresses, requested pages and browser information, to deliver and protect the website. These company pages do not include advertising trackers, analytics scripts or a contact form, and do not set advertising or analytics cookies.",
      },
      {
        title: "When you email us",
        body: "If you choose to contact us, we receive your email address and the information you include. We use it to respond to your request and manage the resulting conversation. Please only send the information needed for your enquiry. We keep correspondence for as long as needed to handle it and meet any applicable obligations.",
      },
      {
        title: "Your privacy rights",
        body: "You can contact main@garbar.tech to ask about your personal data or exercise the rights that apply, including access, correction, deletion, objection, restriction and portability. You can also contact the Spanish Data Protection Agency (AEPD).",
      },
    ],
    authority: "Privacy rights at the AEPD",
    updated: "Updated 8 November 2026",
  },
  notFound: {
    title: "That idea isn’t here.",
    body: "We couldn’t find this page. Head back to the company and explore what we’re building.",
    action: "Back to the company",
  },
};

type Copy = typeof en;
const es: Copy = {
  meta: "Ideas propias. Tecnología con sentido. Descubre GARBAR IN-TEC, la empresa de Barcelona que desarrolla TaskFlow y Lucid Saga.",
  skip: "Saltar al contenido",
  nav: {
    about: "La empresa",
    projects: "Productos",
    contact: "Hablemos",
    menu: "Menú",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Ideas propias. Una ambición compartida.",
    first: "Buenas ideas.",
    second: "Hechas realidad.",
    body: "Somos una empresa tecnológica que convierte la curiosidad en productos digitales. Para todo lo que tienes que hacer. Y para los mundos que aún no has imaginado.",
    cta: "Descubre nuestros productos",
    secondary: "Conoce la empresa",
    location: "Barcelona, España",
    note: "Siempre curiosos. Siempre creando.",
    studio: "Un poco cotidiano. Un poco extraordinario.",
  },
  about: {
    label: "La empresa",
    title: "La curiosidad inicia.",
    accent: "El cuidado da forma.",
    lead: "Somos GARBAR IN-TEC. Unimos software, inteligencia artificial y diseño para convertir ideas en algo útil.",
    body: "Algunas ideas nos ayudan a disfrutar más del día a día. Otras abren mundos completamente nuevos. Damos espacio a ambas, desarrollando nuestros propios productos desde la primera pregunta hasta los detalles que marcan la diferencia.",
    note: "Ideas propias. Desde Barcelona.",
  },
  projects: {
    label: "Nuestros productos",
    title: "Ideas distintas.",
    accent: "El mismo impulso.",
    intro: "Dos productos. Dos posibilidades muy distintas. La misma curiosidad detrás de ambos.",
    development: "En desarrollo",
    coming: "Próximamente en Android",
    visit: "Explora el producto",
    features: "Más de cerca",
    taskflow: {
      category: "Un día a día más sencillo",
      title: "Un día más claro.\nUna mente más libre.",
      body: "Di lo que tienes que hacer. TaskFlow lo convierte en tareas en tu calendario, para que puedas organizarte sin perder el hilo.",
      tags: ["Productividad", "Móvil", "IA"],
      features: [
        "Dicta varias tareas de una vez",
        "Reúne notas, listas y archivos",
        "Consulta y añade tareas, incluso sin conexión",
      ],
      quote: "Mañana, llamar al dentista y comprar pan.",
      imageAlt:
        "El calendario Android de TaskFlow con dos tareas: llamar al dentista y comprar pan.",
    },
    lucid: {
      category: "Muchas más posibilidades",
      title: "Tu imaginación.\nUn mundo que responde.",
      body: "Entra en una historia infinita con IA que recuerda tus decisiones. Elige un mundo o inventa el tuyo, y escribe, toca o di qué ocurre después.",
      tags: ["Historias interactivas", "Móvil", "IA"],
      features: [
        "Elige un mundo o crea el tuyo",
        "Da forma a la historia con tus acciones",
        "Descubre escenas ilustradas y narradas",
      ],
      quote: "Cada decisión deja una historia.",
      imageAlt:
        "Un viajero se acerca a un portal dorado en un bosque oscuro, una ilustración de Lucid Saga.",
    },
  },
  approach: {
    label: "Cómo pensamos",
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
    label: "Contacto",
    first: "Las buenas ideas",
    second: "empiezan con un hola.",
    body: "Una pregunta sobre la empresa, una idea interesante o simplemente una conversación. Nos encantará escucharte.",
    action: "Escríbenos",
    copy: "Copiar correo",
    copied: "Correo copiado",
    error: "Selecciona y copia el correo que aparece arriba.",
    location: "Creado con curiosidad en Barcelona.",
  },
  footer: {
    statement: "Ideas propias.\nTecnología con sentido.",
    company: "Empresa",
    products: "Productos",
    information: "Información",
    legal: "Datos de la empresa",
    privacy: "Privacidad",
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
  privacy: {
    label: "Privacidad",
    title: "Una web sencilla.\nUna explicación clara.",
    intro:
      "Esta página explica la información que se trata cuando visitas la web corporativa de GARBAR IN-TEC. Cada producto tiene su propia política de privacidad.",
    sections: [
      {
        title: "Quién es responsable",
        body: "GARBAR, IN-TEC, S.L. es la responsable de esta web corporativa. Puedes consultar los datos de la empresa en el enlace inferior. Para consultas de privacidad, escribe a main@garbar.tech.",
      },
      {
        title: "Al visitar esta web",
        body: "Los servicios de alojamiento procesan información técnica de conexión, como direcciones IP, páginas solicitadas e información del navegador, para servir y proteger la web. Estas páginas corporativas no incluyen rastreadores publicitarios, scripts de analítica ni formularios de contacto, y no instalan cookies de publicidad o analítica.",
      },
      {
        title: "Cuando nos escribes",
        body: "Si decides contactarnos, recibimos tu dirección de correo y la información que incluyas. La utilizamos para responder a tu consulta y gestionar la conversación. Envía únicamente la información necesaria. Conservamos la correspondencia durante el tiempo necesario para atenderla y cumplir las obligaciones aplicables.",
      },
      {
        title: "Tus derechos de privacidad",
        body: "Puedes escribir a main@garbar.tech para preguntar por tus datos o ejercer los derechos que correspondan, incluidos acceso, rectificación, supresión, oposición, limitación y portabilidad. También puedes dirigirte a la Agencia Española de Protección de Datos (AEPD).",
      },
    ],
    authority: "Tus derechos en la AEPD",
    updated: "Actualizado el 8 de noviembre de 2026",
  },
  notFound: {
    title: "Esa idea no está aquí.",
    body: "No encontramos esta página. Vuelve a la empresa y descubre lo que estamos creando.",
    action: "Volver a la empresa",
  },
};

const ca: Copy = {
  meta: "Idees pròpies. Tecnologia amb sentit. Descobreix GARBAR IN-TEC, l’empresa de Barcelona que desenvolupa TaskFlow i Lucid Saga.",
  skip: "Ves al contingut",
  nav: {
    about: "L’empresa",
    projects: "Productes",
    contact: "Parlem-ne",
    menu: "Menú",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Idees pròpies. Una ambició compartida.",
    first: "Bones idees.",
    second: "Fetes realitat.",
    body: "Som una empresa tecnològica que converteix la curiositat en productes digitals. Per a tot el que has de fer. I per als mons que encara no has imaginat.",
    cta: "Descobreix els nostres productes",
    secondary: "Coneix l’empresa",
    location: "Barcelona, Espanya",
    note: "Sempre curiosos. Sempre creant.",
    studio: "Una mica quotidià. Una mica extraordinari.",
  },
  about: {
    label: "L’empresa",
    title: "La curiositat inicia.",
    accent: "La cura dona forma.",
    lead: "Som GARBAR IN-TEC. Unim programari, intel·ligència artificial i disseny per convertir idees en alguna cosa útil.",
    body: "Algunes idees ens ajuden a gaudir més del dia a dia. D’altres obren mons completament nous. Donem espai a totes dues, desenvolupant els nostres productes des de la primera pregunta fins als detalls que marquen la diferència.",
    note: "Idees pròpies. Des de Barcelona.",
  },
  projects: {
    label: "Els nostres productes",
    title: "Idees diferents.",
    accent: "El mateix impuls.",
    intro: "Dos productes. Dues possibilitats ben diferents. La mateixa curiositat al darrere.",
    development: "En desenvolupament",
    coming: "Aviat a Android",
    visit: "Explora el producte",
    features: "Més de prop",
    taskflow: {
      category: "Un dia a dia més senzill",
      title: "Un dia més clar.\nUna ment més lliure.",
      body: "Digues què has de fer. TaskFlow ho converteix en tasques al calendari, perquè puguis organitzar-te sense perdre el fil.",
      tags: ["Productivitat", "Mòbil", "IA"],
      features: [
        "Dicta diverses tasques d’un cop",
        "Reuneix notes, llistes i fitxers",
        "Consulta i afegeix tasques, fins i tot sense connexió",
      ],
      quote: "Demà, trucar al dentista i comprar pa.",
      imageAlt:
        "El calendari Android de TaskFlow amb dues tasques: trucar al dentista i comprar pa.",
    },
    lucid: {
      category: "Moltes més possibilitats",
      title: "La teva imaginació.\nUn món que respon.",
      body: "Entra en una història infinita amb IA que recorda les teves decisions. Tria un món o inventa el teu, i escriu, toca o digues què passa després.",
      tags: ["Històries interactives", "Mòbil", "IA"],
      features: [
        "Tria un món o crea el teu",
        "Dona forma a la història amb les teves accions",
        "Descobreix escenes il·lustrades i narrades",
      ],
      quote: "Cada decisió deixa una història.",
      imageAlt:
        "Un viatger s’acosta a un portal daurat en un bosc fosc, una il·lustració de Lucid Saga.",
    },
  },
  approach: {
    label: "Com pensem",
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
    label: "Contacte",
    first: "Les bones idees",
    second: "comencen amb un hola.",
    body: "Una pregunta sobre l’empresa, una idea interessant o simplement una conversa. Ens agradarà escoltar-te.",
    action: "Escriu-nos",
    copy: "Copia el correu",
    copied: "Correu copiat",
    error: "Selecciona i copia el correu que apareix a sobre.",
    location: "Creat amb curiositat a Barcelona.",
  },
  footer: {
    statement: "Idees pròpies.\nTecnologia amb sentit.",
    company: "Empresa",
    products: "Productes",
    information: "Informació",
    legal: "Dades de l’empresa",
    privacy: "Privacitat",
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
  privacy: {
    label: "Privacitat",
    title: "Un web senzill.\nUna explicació clara.",
    intro:
      "Aquesta pàgina explica la informació que es tracta quan visites el web corporatiu de GARBAR IN-TEC. Cada producte té la seva pròpia política de privacitat.",
    sections: [
      {
        title: "Qui n’és responsable",
        body: "GARBAR, IN-TEC, S.L. és la responsable d’aquest web corporatiu. Pots consultar les dades de l’empresa a l’enllaç inferior. Per a consultes de privacitat, escriu a main@garbar.tech.",
      },
      {
        title: "Quan visites aquest web",
        body: "Els serveis d’allotjament processen informació tècnica de connexió, com adreces IP, pàgines sol·licitades i informació del navegador, per servir i protegir el web. Aquestes pàgines corporatives no inclouen rastrejadors publicitaris, scripts d’analítica ni formularis de contacte, i no instal·len galetes de publicitat o analítica.",
      },
      {
        title: "Quan ens escrius",
        body: "Si decideixes contactar-nos, rebem la teva adreça de correu i la informació que hi incloguis. La fem servir per respondre la consulta i gestionar la conversa. Envia només la informació necessària. Conservem la correspondència durant el temps necessari per atendre-la i complir les obligacions aplicables.",
      },
      {
        title: "Els teus drets de privacitat",
        body: "Pots escriure a main@garbar.tech per preguntar sobre les teves dades o exercir els drets que corresponguin, incloent-hi accés, rectificació, supressió, oposició, limitació i portabilitat. També pots adreçar-te a l’Agència Espanyola de Protecció de Dades (AEPD).",
      },
    ],
    authority: "Els teus drets a l’AEPD",
    updated: "Actualitzat el 8 de novembre de 2026",
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
  if (section !== "home" && section !== "legal" && section !== "privacy") return null;
  return { locale, section };
}

export function pagePath(locale: Locale, section: Section = "home") {
  return `/${locale}/${section === "home" ? "" : `${section}/`}`;
}
