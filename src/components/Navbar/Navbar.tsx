import Navitem from './Navitem.tsx'
import logo from './../../assets/images/logo.png'

export default function Navbar(){
    return <div className="h-[calc(100svh_-_1.5rem)] w-[22.5rem] bg-white m-3 rounded-lg shadow-[rgba(0,_0,_0,_0.1)_-4px_9px_25px_-6px] p-3 flex flex-col gap-4">
        <div className="flex mb-4 items-center gap-3">
            <img src={logo} alt="ReeduTrack logo"  className="w-9 h-9"/>
            <h2 className="font-bold text-2xl">ReeduTrack</h2>
        </div>
        <Navitem>Accueil</Navitem>
    </div>
}