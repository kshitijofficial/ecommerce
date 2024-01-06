import { LogOut, Store } from "lucide-react";
import { useAuth } from "../contexts/useAuth";
const Navbar = () => {
  const { loggedInUser, signOut } = useAuth();
  if (!loggedInUser) return;
  const { userName } = loggedInUser;

  return (
    <div className="nav absolute z-20">
      <div className="flex items-center justify-center gap-2">
        <Store className="text-primary" />
        <h1 className="nav-logo">
          Shop
          <span className="text-primary">Com</span>
        </h1>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-6 lg:gap-10 text-gray-900 ">
        <p className="border  border-gray-900 px-4 rounded-full text-[14px] py-1">
          Hi,{userName}
        </p>

        <button className="btnPrimary  mt-0 hidden md:block" onClick={signOut}>
          Sign Out
        </button>
        <LogOut className="signOut-icon" onClick={signOut} />
      </div>
    </div>
  );
};
export default Navbar;
