import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";  // ✅ Import axios

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null); // ✅ Fix initial state
    const getAuthState=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
    };
   useEffect(()=>{
     
   },[])
    const value = {
        backendUrl,
        isLoggedin,
        userData,
        setIsLoggedin,
        setUserData,
        getUserData
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};
