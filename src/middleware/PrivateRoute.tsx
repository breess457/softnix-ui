import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token')
    console.log("token:",token)
    if (!token) {
        return token ? children : <Navigate to={"/"} />
    }
    return <>{children}</>
}

export default PrivateRoute;