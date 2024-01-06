import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navabar";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <RouterProvider router={routes} />
    </AuthProvider>
  );
};

export default App;
