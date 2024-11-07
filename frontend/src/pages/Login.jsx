/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { supabase } from "../../utils/client";
// import { LogInSchema, ForgotPasswordSchema } from "../../utils/schema";
import { useDispatch } from "react-redux";
// import { adminLoggedIn } from "../../utils/features/Auth/authSlice";
import { Slide, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isForgotPassword, setForgotPassword] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState({
        username: "admin",
        email: "",
        pass: "",
        createdAt: new Date().toISOString(),
    });
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);

    const handleForgotPasswordRequest = () => setForgotPassword(!isForgotPassword);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: [] }));
    };

    const toastNotification = (message, type) => {
        toast(message, {
            type: type,
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
            transition: Slide,
        });
    };

    const handleResetPassword = async () => {
        // try {
        //     const validateData = ForgotPasswordSchema.parse({ email });

        //     const { error } = await supabase.auth.resetPasswordForEmail(
        //         validateData.email
        //     );

        //     if (error) {
        //         setErrors({ email: ["Error sending password reset email"] });
        //         toastNotification("Error sending password reset email", "error");
        //         return;
        //     } else {
        //         setForgotPassword(false);
        //         toastNotification("Password reset email sent!", "success");
        //     }
        // } catch (err) {
        //     if (err instanceof z.ZodError) {
        //         const newErrors = err.flatten().fieldErrors;
        //         setErrors(
        //             Object.keys(newErrors).reduce((acc, key) => {
        //                 acc[key] = newErrors[key] || [];
        //                 return acc;
        //             }, {})
        //         );
        //     }
        // }
    };

    const handleLogin = async () => {
        // const validateData = LogInSchema.parse({
        //     username: userData.username,
        //     password: userData.pass,
        // });

        // if (
        //     validateData.username === "admin" &&
        //     validateData.password === adminPassword
        // ) {
        //     dispatch(adminLoggedIn({ username: "admin" }));
        //     toastNotification("Admin Logged In !!", "success");
        //     navigate("/admin");
        //     return;
        // }
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        // if (isForgotPassword) {
        //     handleResetPassword();
        // } else {
        //     handleLogin();
        // }
    };

    return (
        <>
            <div className="text-mynavy flex md:flex-row-reverse flex-col my-12">
            <div className="flex items-center justify-center flex-1 bg-white text-black">
                <div className="text-center flex justify-center">
                    <img
                        src="https://pop-shop-github.vercel.app/images/winter1.jpg"
                        className="rounded-[4rem] md:block md:h-[38rem] hidden transition-transform duration-300 ease-in-out hover:scale-105"
                        alt="image"
                    />
                    <img
                        src="/logo.png"
                        className="md:hidden block w-1/2 transition-transform duration-300 ease-in-out hover:scale-105"
                        alt="image"
                    />
                </div>
            </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
                    <div className="max-w-md w-full">
                        <h1 className="text-3xl font-bold mb-1 text-black text-center tracking-wider">
                            {isForgotPassword ? "Reset Password" : "Login"}
                        </h1>
                        <div className="text-md text-[#636364] mb-4 text-center tracking-wider">
                            <p>Please enter your details</p>
                        </div>
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-4 w-full"
                        >
                            {isForgotPassword ? (
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                    >
                                        Email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-2 p-2 w-full placeholder:text-sm shadow border border-[#C4C4C4] rounded-xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 mb-6"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors((prev) => ({ ...prev, email: [] }));
                                        }}
                                    />
                                    {errors.email && (
                                        <ul className="px-2 text-xs mt-1" style={{ color: "red" }}>
                                            {errors.email.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <button
                                        className="bg-mygreen hover:bg-myyellow text-mywhite w-full text-[1rem] shadow-lg rounded-xl py-2.5"
                                        onClick={handleResetPassword}
                                    >
                                        Reset
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Enter your username"
                                            className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                            value={userData.username}
                                            onChange={handleInputChange}
                                        />
                                        {errors.username && (
                                            <ul
                                                className="px-2 text-xs mt-1"
                                                style={{ color: "red" }}
                                            >
                                                {errors.username.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <label
                                            htmlFor="pass"
                                            className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                        >
                                            Password
                                        </label>
                                        <input
                                            required
                                            type={isPasswordVisible ? "text" : "password"}
                                            id="pass"
                                            name="pass"
                                            placeholder="Enter your password"
                                            className="mt-2 p-2 w-full placeholder:text-sm border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                            value={userData.pass}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon
                                                icon={isPasswordVisible ? faEyeSlash : faEye}
                                            />
                                        </button>
                                        {errors.pass && (
                                            <ul
                                                className="px-2 text-xs mt-1"
                                                style={{ color: "red" }}
                                            >
                                                {errors.pass.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="flex justify-end text-sm text-gray-600 tracking-wider">
                                        <button
                                            type="button"
                                            onClick={handleForgotPasswordRequest}
                                            className="hover:text-mygreen transition-colors duration-300 font-bold"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="flex flex-col justify-centerm gap-4">
                                        <button
                                            type="submit"
                                            className="bg-[#06D6A0] w-full font-bold text-[#fff] text-[1rem] shadow-lg rounded-xl py-2.5 px-10 hover:bg-yellow-300 transition-colors duration-300"
                                        >
                                            Log In
                                        </button>
                                        
                                        <div className="flex justify-center items-center">
                                            <span>Don&apos;t have an account? </span>
                                            <Link to="/signup" className="text-[#06D6A0] px-2 font-bold"> Signup here</Link>
                                        </div>
                                       
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
