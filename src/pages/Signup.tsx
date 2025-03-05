
import { Link } from "react-router-dom";
import {useState, FormEvent} from "react";
import Alert from "../components/Alert";
const setTokens = (data:string) => {
    localStorage.setItem('token',JSON.stringify(data))
}
const SignupPage = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [alert,setAlert] = useState<boolean>(false)
    const [textAlert, setTextAlert] = useState<string>("")

    const handleSubmitSignup =  async(e:FormEvent) => {
        try{
            e.preventDefault()
            const responeapi = await fetch('http://localhost:3001/api/register',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    fullname:fullname,
                    username:username,
                    password:password
                })
            })
            console.log(responeapi)
            if(!responeapi.ok) throw new Error('เกิดข้อผิดพลาดในการสมัครสมาชิก')
            
            const responsedata = await responeapi.json()
            console.log(responsedata)
            if(responsedata.status === 201){
                setTokens(responsedata.token)
                console.log("success:",responsedata.token)
                window.location.href = '/pages'
            }
        }catch(e){
            setAlert(true)
            setTextAlert("username นี้ถูกใช้ไปแล้ว โปรดใช้ username อื่น")
            console.log(e)
        }   
    }
    return (
        <section className="text-gray-600 body-font">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register Page
                        </h1>
                        {alert ? 
                            <div className="m-3">
                              <Alert text={textAlert} setClose={setAlert} />
                            </div> : null
                        }
                        <form className="space-y-6" onSubmit={handleSubmitSignup}>
                            <div className="">
                                <label htmlFor="Fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fullname</label>
                                <input 
                                    type="text" 
                                    placeholder="Fullname" 
                                    id="Fullname"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input 
                                    id="username"
                                    type="text" 
                                    placeholder="username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    placeholder="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    required
                                />
                            </div>
                            <button 
                                className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit"
                            >submit</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                หากมีบัญชีแล้ว สามารถลงทะเบียน ? <Link to={"/"} className="underline font-medium text-blue-600 hover:underline dark:text-primary-500">Login</Link> ที่นี้ได้
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default SignupPage;