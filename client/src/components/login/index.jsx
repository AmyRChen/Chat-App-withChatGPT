import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };
  
  const handleGuestLogin = () =>{
    setUsername("test-user1");
    setPassword("123");
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password })
      .then(() => {
        alert("Sign-up successful!"); // show success message
        setIsRegister(false);
      })
      .catch((error) => {
        console.error("Sign-up failed:", error); // log error
      });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); //eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHATGPT APP</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister 
           ? "Already a user? You can also Login with Guest User account." 
           : "Are you a new user? You can also Login with Guest User account."}
        </p>

        <div>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <>
              <button type="button" onClick={handleLogin}>
                Login
              </button>
              <button type="button" onClick={handleGuestLogin}>
                Guest User Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
