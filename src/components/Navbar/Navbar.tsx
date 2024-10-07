import Navitem from "./Navitem.tsx";
import logo from "./../../assets/images/logo.png";
import HomeIcon from "../icons/HomeIcon.tsx";
import UserIcon from "../icons/UserIcon.tsx";
import LogOutIcon from "../icons/LogOutIcon.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="h-[calc(100svh_-_1.5rem)] w-[22.5rem] bg-white m-3 rounded-lg shadow-[rgba(0,_0,_0,_0.1)_-4px_9px_25px_-6px] p-3 flex flex-col gap-6 fixed">
      <div className="flex items-center gap-3">
        <img src={logo} alt="ReeduTrack logo" className="w-9 h-9" />
        <h2 className="font-bold text-2xl">ReeduTrack</h2>
      </div>
      <nav className="h-full">
        <ul className="flex flex-col gap-4 h-full [&>*:last-child]:mt-auto">
          <Navitem
            currentPage={activeTab}
            setActiveTab={setActiveTab}
            page="home"
            route="/"
          >
            <HomeIcon></HomeIcon>Accueil
          </Navitem>
          <Navitem
            currentPage={activeTab}
            setActiveTab={setActiveTab}
            page="profile"
            route="/profile"
          >
            <UserIcon></UserIcon>Profil
          </Navitem>
          <Navitem
            currentPage={activeTab}
            setActiveTab={setActiveTab}
            page="logout"
            route="/logout"
          >
            <LogOutIcon></LogOutIcon>Se déconnecter
          </Navitem>
        </ul>
      </nav>
    </div>
  );
}
