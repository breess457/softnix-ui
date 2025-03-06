import React,{useContext,createContext,useEffect} from "react";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleUser, faHome } from "@fortawesome/free-solid-svg-icons";
import FeedPage from "./listpage/Feed";
import ProfilePage from "./listpage/Profile";


interface Profile{
    _id:string,
    fullname:string,
    username:string,
    newDate: Date
}

interface UserContextType{
  data: Profile; 
  loading: boolean;
  token: string;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

const Pages = () => {
    const navigate = useNavigate()
    const removeItem = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
    const [token, settoken] = React.useState<string>(JSON.parse(localStorage.getItem('token')!))
    const [data, setdata] = React.useState<any>({})
    const [loading, setloading] = React.useState<boolean>(false)
    const fetchProfile = async (get_tokens:string)=>{
        console.log("get_tokens:",get_tokens)
        try{
            const response = await fetch('http://localhost:3001/api/profile',{
                method:'GET',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: get_tokens
                }
            })
            setloading(true)
            if(response.status === 400){
                console.log("sss")
                removeItem()
            }
            if(!response.ok) throw new Error('เกิดข้อผิดพลาดในการเรียกข้อมูล')
            
            const responsedata = await response.json()
            if(responsedata.status === 201){
                setdata(responsedata?.data)
                setloading(false)
            }
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        settoken(JSON.parse(localStorage.getItem('token')!))
        if(token){
            fetchProfile(token)
        }
    },[])
    console.log("data:",data?.fullname)
    return (
    <UserContext.Provider value={{data,loading,token}}>
        <div className="bg-gray-100">
            <nav className="border-gray-300 bg-gray-50">
                <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
                    <Link to={"/pages/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Softnix UI</span>
                    </Link>
                    <div className="w-auto flex-col">
                        <ul className="ml-auto flex flex-row font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                            <li className="py-2 md:py-0">
                                <Link to={"/pages/"} className="block px-4 py-2 text-blue-600 underline hover:bg-gray-100">
                                   <FontAwesomeIcon icon={faHome}/> home
                                </Link>
                            </li>
                            <li className="py-2 md:py-0">
                                <Link to={"/pages/profile"} className="block px-4 py-2 text-blue-600 underline hover:bg-gray-100 ">
                                    <FontAwesomeIcon icon={faCircleUser} className="text-xl mx-2"/>  {data?.fullname}
                                </Link>
                            </li>
                            <li className="py-2 md:py-0">
                                <button 
                                    onClick={()=>removeItem()}
                                    className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" type="button">
                                    <span>Logout</span> <FontAwesomeIcon icon={faArrowRight}/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path={"/"} element={<FeedPage/>}/>
                <Route path={"/profile"} element={<ProfilePage/>}/>
            </Routes>
        </div>
    </UserContext.Provider>
    )
}
export default Pages

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error("useUser must be used within a UserProvider");
    }
    return context
}