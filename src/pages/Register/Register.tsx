import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegister } from "Utils/Schemas";
import { UserRegisterSchema } from "Utils/Schemas/UserSchema";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Title } from "./Register.styled";

function Register() {
  const { register, handleSubmit } = useForm<UserRegister>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const onSubmitForm = (data: UserRegister) => {
    console.log(data);
    // Handle login logic

    toast.success("Registro realizado com sucesso, volte para login!");
  };

  return (
    <>
      <div className="form-container sign-up-container">
        <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
          <Title>Criar conta</Title>
          <input
            type="text"
            className="input"
            placeholder="Código de ativação"
            {...register("code", { required: true })}
          />
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
          <input
            type="password"
            className="input"
            placeholder="Repetir senha"
            {...register("repeatPassword", { required: true })}
          />
          <button className="button" type="submit">
            Registrar-se
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default Register;
