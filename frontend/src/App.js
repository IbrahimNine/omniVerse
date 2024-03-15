import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Home/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Collections from "./pages/Collections";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Artist from "./pages/Artist";
import Player from "./components/Home/Player";
import Footer from "./components/Home/Footer";
import Settings from "./components/Home/Settings";
import { useAuthContext } from "./contexts/AuthContext";
import Notifications from "./components/Home/Notifications";
import { useEffect } from "react";
import PrrivateRoute from "./utils/PrrivateRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useReleaseContext } from "./contexts/ReleaseContext";
import Album from "./components/Artist/Album";

function App() {
  const { showSettings, noticMsg, getUserData, user } = useAuthContext();
  const { showDetails } = useReleaseContext();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route element={<PrrivateRoute />}>
          <Route path="/collections" element={<Collections />} />
          <Route path="/user/:id" element={<User />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {showDetails && <Album />}
      {showSettings && user && <Settings />}
      {noticMsg && <Notifications />}
      <Player />
    </div>
  );
}

export default App;
