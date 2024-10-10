import Navitem from "./Navitem.tsx";
import logo from "./../../assets/images/logo.png";
import HomeIcon from "../icons/HomeIcon.tsx";
import UserIcon from "../icons/UserIcon.tsx";
import LogOutIcon from "../icons/LogOutIcon.tsx";
import { useState } from "react";
import MobileNav from "./MobileNav.tsx";
import XMark from "../icons/XMark.tsx";
import CalendarIcon from "../icons/CalendarIcon.tsx";

export default function Navbar({handleLogout}:{handleLogout:()=>void}) {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <>
      <MobileNav setIsCollapsed={setIsCollapsed}></MobileNav>
      <div
        data-collapsed={isCollapsed}
        className="h-[calc(100svh_-_1.5rem)] w-64 sm:w-[22.5rem] bg-white m-3 rounded-lg shadow-[rgba(0,_0,_0,_0.1)_-4px_9px_25px_-6px] p-3 flex flex-col gap-6 fixed max-lg:top-0 max-lg:right-0 max-lg:data-[collapsed=false]:w-0 max-lg:data-[collapsed=false]:px-0 max-lg:data-[collapsed=false]:mr-0 transition-all duration-300 z-50"
      >
        <div className="flex items-center gap-3 max-lg:hidden">
          <img src={logo} alt="ReeduTrack logo" className="w-9 h-9" />
          <h2 className="font-bold text-2xl">ReeduTrack</h2>
        </div>
        <div className="flex justify-end overflow-hidden h-8 items-center lg:hidden">
          <div className="cursor-pointer" onClick={() => setIsCollapsed(false)}>
            <XMark></XMark>
          </div>
        </div>

        <nav className="h-full">
          <ul className="flex flex-col gap-4 h-full [&>*:last-child]:mt-auto">
            <Navitem
              currentPage={activeTab}
              setActiveTab={setActiveTab}
              setIsCollapsed={setIsCollapsed}
              page="home"
              route="/"
            >
              <HomeIcon></HomeIcon>
              <span className="whitespace-nowrap overflow-hidden">Accueil</span>
            </Navitem>
            <Navitem
              currentPage={activeTab}
              setActiveTab={setActiveTab}
              setIsCollapsed={setIsCollapsed}
              page="profile"
              route="/profile"
            >
              <UserIcon></UserIcon>
              <span className="whitespace-nowrap overflow-hidden">Profil</span>
            </Navitem>
            <Navitem
              currentPage={activeTab}
              setActiveTab={setActiveTab}
              setIsCollapsed={setIsCollapsed}
              page="program"
              route="/program"
            >
              <CalendarIcon></CalendarIcon>
              <span className="whitespace-nowrap overflow-hidden">
                Création de programme
              </span>
            </Navitem>
            <li
              className="flex items-center rounded-lg w-full h-12 gap-3 px-4 hover:bg-bg-color transition-all cursor-pointer "
              onClick={() => {
                handleLogout();
                setIsCollapsed(false);
              }}
            >
              <LogOutIcon></LogOutIcon>
              Se déconnecter
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
