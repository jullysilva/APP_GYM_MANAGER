import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userHook } from "Utils/Context/useAuth";
import { UserLogin } from "Utils/Schemas";
import { useNavigate } from "react-router-dom";
import { UserLoginSchema } from "Utils/Schemas/UserSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [values, setValues] = useState<UserLogin>({} as UserLogin);
  const { setUser } = userHook();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const onSubmitForm = async (data: UserLogin) => {
    console.log(data);
    setUser(data);
    // Handle login logic
    navigate("/painel");
  };

  return (
    <div
      className="form-container sign-in-container"
      data-testid="sign-in-container"
    >
      <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
        <h1>Entrar</h1>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          className="input"
          placeholder="Senha"
          {...register("password", { required: true })}
        />
        <a className="link" href="/resetarsenha">
          Esqueceu a senha?
        </a>
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
};

export default Login;
