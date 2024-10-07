import Burger from "../icons/Burger";
import logo from "./../../assets/images/logo.png";

interface Props {
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export default function MobileNav({ setIsCollapsed }: Props) {
  return (
    <div className="m-3 p-3 h-14 flex justify-between items-center rounded-lg bg-white lg:hidden">
      <div className="flex items-center gap-3">
        <img src={logo} alt="ReeduTrack logo" className="w-9 h-9" />
        <h2 className="font-bold text-2xl">ReeduTrack</h2>
      </div>
      <div className="cursor-pointer" onClick={() => setIsCollapsed(true)}>
        <Burger></Burger>
      </div>
    </div>
  );
}
