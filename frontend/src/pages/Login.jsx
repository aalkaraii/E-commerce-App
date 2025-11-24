import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, token, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandeler = async () => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        // call sign up api
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log(response.data);
      } else {
        // call login up api
      }
    } catch (error) {}
  };
  return (
    <form
      onSubmit={onSubmitHandeler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input
        type="text"
        onClick={(e) => setName(e.target.value)}
        value={name}
        className={`w-full transition-all px-3 py-2 border border-gray-800 ${
          currentState === "Login" ? "hidden" : "flex"
        }`}
        placeholder="Name"
      />
      <input
        onClick={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      <input
        onClick={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline">
          Forget your password?
        </p>

        {currentState === "Login" ? (
          <p className="cursor-pointer transition-all hover:text-black text-gray-600 flex">
            Don't have an account?{" "}
            <p className="font-bold" onClick={() => setCurrentState("Sign Up")}>
              Register{" "}
            </p>{" "}
          </p>
        ) : (
          <p className="cursor-pointer transition-all hover:text-black text-gray-600 flex">
            Already have an account?{" "}
            <p className="font-bold" onClick={() => setCurrentState("Login")}>
              Login{" "}
            </p>{" "}
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : " Sign Up"}
      </button>
    </form>
  );
};

export default Login;
