import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegister } from "Utils/Schemas";
import { UserRegisterSchema } from "Utils/Schemas/UserSchema";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
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
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <h1>Criar conta</h1>
          <input
            type="text"
            placeholder="Código de ativação"
            {...register("code", { required: true })}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            placeholder="Repetir senha"
            {...register("repeatPassword", { required: true })}
          />
          <button type="submit">Registrar-se</button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default Register;
