import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ManagerRegister } from "Utils/Schemas";
import { ManagerSchema } from "Utils/Schemas/UserSchema";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Title } from "./Register.styled";
import { registerManager } from "../../services/Requests/AccessService";

function Register() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ManagerRegister>({
    resolver: zodResolver(ManagerSchema),
  });

  const onSubmitForm = async (data: ManagerRegister) => {
    try {
      const response = await registerManager(data);
      if (response.status === "success") {
        reset();
        toast.success("Registro realizado com sucesso, volte para login!");
      } else {
        toast.error("Erro no registro. Tente novamente.");
      }
    } catch (error: any) {
      toast.error(`Erro: ${error.message}`);
    }
  };

  return (
    <>
      <div className="form-container sign-up-container">
        <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
          <Title>Criar conta</Title>
          <input
            type="text"
            className="input"
            placeholder="Nome"
            {...formRegister("name", { required: true })}
          />
          {errors.name && (
            <span className="text-muted">{errors.name.message}</span>
          )}
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...formRegister("email", { required: true })}
          />
          {errors.email && (
            <span className="text-muted">{errors.email.message}</span>
          )}
          <input
            type="tel"
            maxLength={14}
            className="input"
            placeholder="CNPJ"
            {...formRegister("document", { required: true })}
          />
          {errors.document && (
            <span className="text-muted">{errors.document.message}</span>
          )}
          <input
            type="tel"
            maxLength={11}
            className="input"
            placeholder="Telefone"
            {...formRegister("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-muted">{errors.phone.message}</span>
          )}
          <input
            type="password"
            className="input"
            placeholder="Senha"
            {...formRegister("password", { required: true })}
          />
          {errors.password && (
            <span className="text-muted">{errors.password.message}</span>
          )}
          <input
            type="password"
            className="input"
            placeholder="Repetir senha"
            {...formRegister("repeatPassword", { required: true })}
          />
          {errors.repeatPassword && (
            <span className="text-muted text-danger">
              {errors.repeatPassword.message}
            </span>
          )}
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
