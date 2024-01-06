import { LogOut, Store } from "lucide-react";
import { useAuth } from "../contexts/useAuth";
const Navbar = () => {
  const { loggedInUser, signOut } = useAuth();
  if (!loggedInUser) return;
  const { userName } = loggedInUser;

  return (
    <div className="nav ">
      <div className="xFlex gap-2">
        <Store className="text-primary" />
        <h1 className="nav-logo">
          Shop
          <span className="text-primary">Com</span>
        </h1>
      </div>

      <div className="nav-right">
        <p className="nav-user">Hi,{userName}</p>

        <button className="btn-signOut" onClick={signOut}>
          Sign Out
        </button>
        <LogOut className="signOut-icon" onClick={signOut} />
      </div>
    </div>
  );
};
export default Navbar;
