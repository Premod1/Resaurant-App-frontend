import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput";
import SubmiteButton from "../components/common/SubmiteButton";
import { api } from "../components/config";
import "./Register.css";
function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmite = async() => {
       try{
            if (confirmPassword !== password) {
                toast.error("Password Don't match")
                return;
            }

            await axios.post(`${api}/auth/register`,{
                email,
                password,
            });

            toast.success("Registration Successfull");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/login");
       } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
       }
    }



    return(
        <div className="center-div">
            <form className="register-container">
                <h2>Register</h2>
                <FormInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <FormInput label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <SubmiteButton text="Submit"  onClick={handleSubmite}/>
            </form>
        </div>
    )
}
export default Register;