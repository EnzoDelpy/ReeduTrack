import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";
import Badge from "../shared/Badge";



export default function ExerciceItem() {

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'checkbox') {
      return;
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div data-collapsed={isCollapsed} className={"w-full rounded-lg h-12 px-4 flex items-center bg-white gap-3 cursor-pointer"} onClick={toggleCollapse}>
      <input type="checkbox" className="h-6 w-6 rounded-md appearance-none checked:bg-green-custom border-gray-custom border-2 cursor-pointer"/>
      <span className="mr-auto">Fentes marchées</span>
      <Badge>3 séries</Badge>
      <Badge>20 répétitions</Badge>
      <div data-collapsed={isCollapsed} className="ml-3 data-[collapsed=true]:rotate-180 transition-all duration-300"><ChevronUp></ChevronUp></div>
    </div>
  );
}
 