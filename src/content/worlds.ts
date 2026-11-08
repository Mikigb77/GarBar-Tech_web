import type { Locale } from "./site";

/**
 * A few of Lucid Saga's 23 starter worlds, shown drifting past in its showcase. Titles and covers
 * come from LucidSaga_Web (src/content/worlds.ts and src/assets/worlds/), which copies them from
 * the game's own catalog. When the game's starters change, check these against it.
 */
export const worlds: { id: string; title: Record<Locale, string> }[] = [
  {
    id: "outer-disciple",
    title: {
      en: "The Last Outer Disciple",
      es: "El último discípulo externo",
      ca: "L’últim deixeble extern",
    },
  },
  {
    id: "drowned-capital",
    title: {
      en: "Ronin of the Drowned Capital",
      es: "El ronin de la capital ahogada",
      ca: "El ronin de la capital ofegada",
    },
  },
  {
    id: "last-lantern",
    title: {
      en: "A Room for the Dragon",
      es: "Una habitación para el dragón",
      ca: "Una habitació per al drac",
    },
  },
  {
    id: "dead-god-courier",
    title: {
      en: "Courier for a Dead God",
      es: "Mensajero de un dios muerto",
      ca: "Missatger d’un déu mort",
    },
  },
  {
    id: "hollowmere",
    title: {
      en: "Last Exam at Hollowmere",
      es: "Último examen en Hollowmere",
      ca: "Últim examen a Hollowmere",
    },
  },
  {
    id: "night-shift",
    title: { en: "Night Shift", es: "Turno de noche", ca: "Torn de nit" },
  },
  {
    id: "seven-day-villainess",
    title: {
      en: "The Villainess Has Seven Days",
      es: "A la villana le quedan siete días",
      ca: "A la vilana li queden set dies",
    },
  },
  {
    id: "war-frame",
    title: {
      en: "The Frame That Chose You",
      es: "El armazón que te eligió",
      ca: "L’armadura que et va triar",
    },
  },
  {
    id: "naples-vendetta",
    title: {
      en: "The Esposito Succession",
      es: "La sucesión de los Esposito",
      ca: "La successió dels Esposito",
    },
  },
  {
    id: "old-net",
    title: {
      en: "The Girl in the Old Net",
      es: "La chica de la red antigua",
      ca: "La noia de la xarxa antiga",
    },
  },
];
