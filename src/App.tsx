import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/Home.tsx";
import Profile from "./components/Profile/Profile.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar></Navbar>
        </header>
        <main className="lg:ml-[23.25rem] px-3 sm:px-8 py-20 flex justify-center">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
