import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Admin/Admin";




function App() {
  return <div> 
    <Header />
    <section>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/auth" element={<Auth/>}/>

      </Routes>
    </section>

  </div>;
}

export default App;
