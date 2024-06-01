import React from "react";
import { useForm } from "react-hook-form";
import Modal from "components/Modal/Modal";
import { IAdmManager } from "Utils/Interfaces/Interface";

interface AdmManagerProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  addAdmin: (admin: IAdmManager) => void;
}

const AdmManager: React.FC<AdmManagerProps> = ({ open, setOpen, addAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAdmManager>({});

  const onSubmitForm = (data: IAdmManager) => {
    addAdmin(data);
    reset();
    setOpen(false);
    console.log("data", data);
  };

  return (
    <>
      <Modal isOpen={open} setOpen={setOpen} width={300} maxHeight={300}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Administrador</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="form-group">
                <label htmlFor="nome-manager" className="col-form-label">
                  Nome completo
                </label>
                <input
                  id="nome-manager"
                  type="text"
                  placeholder="João Souza da Silva"
                  className="form-control"
                  {...register("nome", {
                    required: "Nome completo é obrigatório",
                  })}
                />
                {errors.nome && <span>{errors.nome.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email-manager" className="col-form-label">
                  Email
                </label>
                <input
                  id="email-manager"
                  placeholder="joão@example.com"
                  type="email"
                  className="form-control"
                  {...register("email", { required: "Email é obrigatório" })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="modal-footer pt-3">
                <button
                  type="submit"
                  data-testid="button-save"
                  className="btn btn-success"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdmManager;
