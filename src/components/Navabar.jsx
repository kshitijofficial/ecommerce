import { useAuth } from "../contexts/useAuth";
const Navbar = ()=>{
 const {loggedInUser,signOut} = useAuth()
 if(!loggedInUser) return;
 const {userName}=loggedInUser;

 return(
    <div>
         <p>Hi,{userName}</p>
         <button onClick={signOut}>Sign Out</button>
    </div>
 )
}
export default Navbar;