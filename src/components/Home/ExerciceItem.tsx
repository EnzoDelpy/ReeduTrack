import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";



export default function ExerciceItem() {

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div data-collapsed={isCollapsed} className={"w-full rounded-lg h-12 px-4 flex items-center bg-white gap-3 cursor-pointer"} onClick={()=>setIsCollapsed(!isCollapsed)}>
      <input type="checkbox" className="h-6 w-6 rounded-md appearance-none checked:bg-green-custom border-gray-custom border-2 cursor-pointer" />
      <span>Fentes marchées</span>
      <div className="bg-gray-custom px-[0.375rem] py-1 text-white rounded-md ml-auto"><span>3 séries</span></div>
      <div className="bg-gray-custom px-[0.375rem] py-1 text-white rounded-md"><span>20 répétitions</span></div>
      <div data-collapsed={isCollapsed} className="ml-3 data-[collapsed=true]:rotate-180 transition-all duration-300"><ChevronUp></ChevronUp></div>
    </div>
  );
}
 