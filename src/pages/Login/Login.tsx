import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "Utils/Context/useAuth";
import { UserLogin } from "Utils/Schemas";
import { useNavigate } from "react-router-dom";
import { UserLoginSchema } from "Utils/Schemas/UserSchema";
import { useForm } from "react-hook-form";
import { Title } from "./Login.styled";

const Login = () => {
  const { setUser } = useAuth();
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
        <Title>Entrar</Title>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-muted">Email é obrigatório</span>
        )}
        <input
          type="password"
          className="input"
          placeholder="Senha"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-muted">Senha é obrigatória</span>
        )}
        <a className="link" href="/resetarsenha">
          Esqueceu a senha?
        </a>
        <button className="button" type="submit">
          Acessar
        </button>
      </form>
    </div>
  );
};

export default Login;
