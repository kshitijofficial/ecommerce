import { createContext,useEffect,useState} from "react";
import { loggedInUserDetails} from "../constants/loggedInUsers";
export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const storedLoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    const [loggedInUser,setLoggedInUser]=useState(storedLoggedInUser || null);
    useEffect(()=>{
        localStorage.setItem("loggedInUser",JSON.stringify(loggedInUser))
    })
    const signIn = (userNameInp,passWordInp)=>{
        const isLoggedIn = loggedInUserDetails.find(({userName,passWord})=>{
           return userName===userNameInp && passWord===passWordInp
        })        
        setLoggedInUser(isLoggedIn || null);
        if(!isLoggedIn){
            return false;
        }
        return true;
    }
    const signOut = ()=>{
        localStorage.clear()
        setLoggedInUser(null)
    }

    return(
        <AuthContext.Provider value ={{loggedInUser,signIn,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}