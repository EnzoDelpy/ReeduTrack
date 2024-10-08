import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";
import Badge from "../shared/Badge";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../shared/Spinner";

export default function ExerciceItem() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleCollapse = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" &&
      (target as HTMLInputElement).type === "checkbox"
    ) {
      return;
    }
    setIsCollapsed(!isCollapsed);
    setIsLoading(true)
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        data-collapsed={isCollapsed}
        className={
          "w-full rounded-lg h-12 px-4 flex items-center bg-white gap-3 cursor-pointer"
        }
        onClick={toggleCollapse}
      >
        <input
          type="checkbox"
          className="h-6 w-6 rounded-md appearance-none checked:bg-green-custom border-gray-custom border-2 cursor-pointer"
        />
        <span className="mr-auto">Fentes marchées</span>
        <Badge>3 séries</Badge>
        <Badge>20 répétitions</Badge>
        <div
          data-collapsed={isCollapsed}
          className="ml-3 data-[collapsed=true]:rotate-180 transition-all duration-300"
        >
          <ChevronUp></ChevronUp>
        </div>
      </div>
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            layout // Framer Motion gère la taille dynamique avec layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden flex gap-4 justify-evenly px-4"
          >
            <span className="max-w-96 flex-1 min-w-0">
              En position debout, faites un grand pas en avant avec une jambe,
              puis descendez en pliant les deux genoux jusqu'à ce que le genou
              arrière approche du sol, formant un angle de 90° avec le genou
              avant. Le torse reste droit et le genou avant ne dépasse pas les
              orteils. Poussez sur le talon avant pour revenir à la position
              initiale, puis alternez avec l'autre jambe. Cet exercice améliore
              également l'équilibre et peut être intensifié avec des haltères ou
              des fentes sautées. 4o
            </span>
            <div className="flex-grow flex-1 min-w-0 aspect-[853/480] relative">
              {isLoading ? <><div className="absolute w-full h-full bg-gray-custom"></div><div className="absolute w-full h-full flex items-center justify-center"><Spinner></Spinner></div></> : <></>}
              <iframe
                data-loading={isLoading}
                width="853"
                height="480"
                src={"https://www.youtube.com/embed/xxLjUeVPYYk"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="w-full h-full opacity-0 data-[loading=false]:opacity-100 transition-all duration-500"
                onLoad={()=>setIsLoading(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
