import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../Application/styles.css";
import { FormReset } from "./ResetPassword.styled";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (data: any) => {
    console.log(data);
    // Handle login logic
  };

  return (
    <div className="container">
      <FormReset>
        <form onSubmit={handleSubmit(onSubmitForm)} data-testid="reset-form">
          <h1>Resetar a senha</h1>
          <span>
            Por favor, insira o endereço de e-mail que você usou para se
            registrar e enviaremos um link para redefinir sua senha por e-mail.
          </span>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <button type="submit" data-testid="reset">
            Resetar a senha
          </button>
          <a href="/">
            Voltar para <strong>Login</strong>
          </a>
        </form>
      </FormReset>
    </div>
  );
};

export default ResetPassword;
