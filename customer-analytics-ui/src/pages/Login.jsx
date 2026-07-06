import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://customer-analytics-api-wrwf.onrender.com/auth/login",
                {
                    email,
                    password
                }
            );

            // Save Access Token
            localStorage.setItem(
                "token",
                response.data.accessToken
            );

            alert("Login Successful!");

            window.location.href = "/dashboard";

        } catch (err) {

            alert("Invalid Email or Password");

            console.log(err);

        }

    };

    return (

        <div
            style={{
                width: "350px",
                margin: "120px auto",
                padding: "30px",
                boxShadow: "0 0 10px gray",
                borderRadius: "10px"
            }}
        >

            <h2 style={{ textAlign: "center" }}>
                Customer Analytics Login
            </h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"20px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width:"100%",
                        padding:"12px",
                        background:"#1d3557",
                        color:"white",
                        border:"none",
                        cursor:"pointer"
                    }}
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;