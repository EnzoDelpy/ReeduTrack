import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";
import Badge from "../shared/Badge";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../shared/Spinner";

interface Props {
  title: string;
  description: string;
  video_id: string;
  activeItem: number | null;
  id: number;
  setActiveItem: (itemId: number | null) => void;
}

export default function ExerciceItem({
  title,
  description,
  video_id,
  activeItem,
  id,
  setActiveItem,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const toggleCollapse = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" &&
      (target as HTMLInputElement).type === "checkbox"
    ) {
      return;
    }
    if (activeItem == id) {
      setActiveItem(null);
    } else {
      setActiveItem(id);
    }
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        data-collapsed={activeItem == id}
        className={
          "w-full rounded-lg h-12 px-4 flex items-center bg-white gap-3 cursor-pointer"
        }
        onClick={toggleCollapse}
      >
        <input
          type="checkbox"
          className="h-6 w-6 rounded-md appearance-none checked:bg-green-custom border-gray-custom border-2 cursor-pointer transition-all"
        />
        <span className="mr-auto">{title}</span>
        <Badge>3 séries</Badge>
        <Badge>20 répétitions</Badge>
        <div
          data-collapsed={activeItem == id}
          className="ml-3 data-[collapsed=true]:rotate-180 transition-all duration-300"
        >
          <ChevronUp></ChevronUp>
        </div>
      </div>
      <AnimatePresence>
        {activeItem == id && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden flex gap-6 justify-evenly px-4 max-md:flex-col"
          >
            <span className="max-w-96 flex-1 min-w-0 text-justify max-md:self-center">
              {description}
            </span>
            <div className="flex-grow flex-1 min-w-0 aspect-[853/480] relative h-min">
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full absolute bg-gray-custom z-10"
                  >
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <Spinner></Spinner>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <iframe
                data-loading={isLoading}
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${video_id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="w-full h-full opacity-0 data-[loading=false]:opacity-100 transition-all"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
