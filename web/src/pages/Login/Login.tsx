import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "Utils/Context/useAuth";
import { UserLogin } from "Utils/Schemas";
import { useNavigate } from "react-router-dom";
import { UserLoginSchema } from "Utils/Schemas/UserSchema";
import { useForm } from "react-hook-form";
import { EyeButton, Title } from "./Login.styled";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accessManager } from "../../services/Requests/AccessService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const onSubmitForm = async (data: UserLogin) => {
    setLoading(true);
    try {
      const response = await accessManager(data);
      if (response.status === "success") {
        setUser({
          email: response.manager.email,
          name: response.manager.name,
          token: response.token,
          manager: response.manager,
        });
        reset();
        navigate("/painel");
      } else {
        toast.error("Falha no login. Verifique suas credenciais.");
      }
    } catch (error: any) {
      reset();
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div
        className="form-container sign-in-container"
        data-testid="sign-in-container"
      >
        {loading && (
          <div className="text-center fw-bold pt-1">Carregando...</div>
        )}
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
          <div className="input-group">
            <input
              className="input mw-100"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password", { required: true })}
            />
            <EyeButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeButton>
          </div>
          {errors.password && (
            <span className="text-muted">Senha é obrigatória</span>
          )}
          <a className="link" href="/resetarsenha">
            Esqueceu a senha?
          </a>
          <button className="button" type="submit" disabled={loading}>
            Acessar
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Login;
