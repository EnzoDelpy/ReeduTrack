import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/Home.tsx";
import Profile from "./components/Profile/Profile.tsx";
import Program from "./components/Program/Program.tsx";
import Login from "./components/Login/Login.tsx";



function App() {

  const isLogged : boolean = false;

  return (
    <>
      <BrowserRouter>
        {isLogged ? <><header>
          <Navbar></Navbar>
        </header>
        <main className="lg:ml-[23.25rem] px-3 sm:px-8 py-20 flex justify-center">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/program" element={<Program />}></Route>

          </Routes>
        </main></> : <>
        <main className="lg:ml-[23.25rem] px-3 sm:px-8 py-20 flex justify-center">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </main>
        </>}
      </BrowserRouter>
    </>
  );
}

export default App;
