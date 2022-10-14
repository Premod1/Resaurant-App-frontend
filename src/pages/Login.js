import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput";
import SubmiteButton from "../components/common/SubmiteButton";
import { api } from "../components/config";
import { useGlobal } from "../components/GlobalContext";
import "./Login.css";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {user, setUser} = useGlobal();
    

    const handleSubmit = async() => {
       try{
            

            const result = await axios.post(`${api}/auth/login`,
            {
                email,
                password,
            },
            { withCredentials: true} 
            );

            setUser(result.data);

            console.log(result.data);

            toast.success("Login Successful");
            setEmail("");
            setPassword("");
            navigate("/admin");

       } catch (err) {
            console.log(err);
            toast.error("Invalided Credentials");
       }
    }



    return(
        <div className="center-div">
            <form className="register-container">
                <h2>Login</h2>
                <FormInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              
                <SubmiteButton text="Submit"  onClick={handleSubmit}/>
            </form>
            {user && user.email}
        </div>
    )
}
export default Login;