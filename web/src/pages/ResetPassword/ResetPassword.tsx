import { useForm } from "react-hook-form";

const ResetPassword = () => {
  // const [email, setEmail] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmitForm = async (data: any) => {
    console.log(data);
    // Handle login logic
  };

  return (
    <div
      className="container-fluid text-center d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 w-25 mh-50">
        <form onSubmit={handleSubmit(onSubmitForm)} data-testid="reset-form">
          <h1 className="h1">Resetar a senha</h1>
          <span className="text-muted">
            Por favor, insira o endereço de e-mail que você usou para se
            registrar e enviaremos um link para redefinir sua senha por e-mail.
          </span>
          <div className="row g-4 mt-2">
            <div className="col-12 form-group">
              <input
                id="email-reset"
                className="form-control"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="col-12 text-center">
              <button
                className="btn btn-outline-primary"
                type="submit"
                data-testid="reset"
              >
                Resetar a senha
              </button>
            </div>
            <div className="col-12 text-center">
              <a href="/">
                Voltar para <strong>Login</strong>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
