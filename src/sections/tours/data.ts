import france from "../../assets/france.webp";
import london from "../../assets/london.webp";
import switzerland from "../../assets/swizerland.webp";
import maldives from "../../assets/maldives.webp";
import germany from "../../assets/germany.webp";
import greece from "../../assets/greece.webp";

// `tone` picks the poster band colour; text keys live under tours.items.<id>.
export const TOURS = [
  { id: "france", image: france, tone: "signal" },
  { id: "london", image: london, tone: "saffron" },
  { id: "switzerland", image: switzerland, tone: "lagoon" },
  { id: "maldives", image: maldives, tone: "ink" },
  { id: "germany", image: germany, tone: "saffron" },
  { id: "greece", image: greece, tone: "signal" },
] as const;
