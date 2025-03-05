
import { FormEvent,useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
const setTokens = (data:string) => {
    localStorage.setItem('token',JSON.stringify(data))
}
const HomePage = () => {

    const [usernaame, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alert,setAlert] = useState<boolean>(false)
    const [textAlert, setTextAlert] = useState<string>("")

    const handleSubmitLogin = async (e: FormEvent) => {
        try{
            e.preventDefault()
            if(!(usernaame && password)){
                setAlert(true)
                setTextAlert("กรอก username และ password")
            }
            console.log({usernaame,password})
            const responeapi = await fetch('http://localhost:3001/api/login',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username:usernaame,
                    password:password
                })
            })
            if(!responeapi.ok) throw new Error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
            const responsedata = await responeapi.json()
            console.log(responsedata)
            if(responsedata.status === 201){
                setTokens(responsedata.token)
                window.location.href = '/pages'
            }
        }catch(e){
            setAlert(true)
            setTextAlert("email หรือ password ไม่ถูกต้อง")
            console.log(e)
        }
    }
    return (
        <section className="text-gray-600 body-font">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login Page
                        </h1>
                        {alert ? 
                            <div className="m-3">
                              <Alert text={textAlert} setClose={setAlert} />
                            </div> : null
                        }

                        <form className="space-y-6" onSubmit={handleSubmitLogin}>
                            <div className="">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input 
                                    value={usernaame}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text" 
                                    placeholder="username"
                                    id="username" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    required
                                />
                            </div>
                            <div className="">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    type="text" 
                                    placeholder="password"
                                    id="password" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button 
                                className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit"
                            >submit</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                หากไม่มีบัญชี สามารถสมัค ? <Link to={"/signup"} className="underline font-medium text-blue-600 hover:underline dark:text-primary-500">Sign up</Link> ที่นี้ได้
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;