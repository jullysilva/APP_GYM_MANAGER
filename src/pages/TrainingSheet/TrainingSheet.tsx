import React, { useState } from "react";
import { IExercise } from "Utils/Interfaces/Interface";
import { Category, ExerciseMock } from "mocks";
import NoData from "../../assets/no-data.png";
import { FaPlus } from "react-icons/fa";
import { Button, Card, Title } from "./TrainingSheet.styled";
import ModalBase from "components/Modal/Modal";
import SelectSearch from "components/SelectSearch/SelectSearch";
import Select from "components/Select/Select";
import { useForm } from "react-hook-form";
import { RegisterTrainningSheet } from "Utils/Schemas";

const TrainingSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState([]);
  const [sheets, setSheets] = useState<RegisterTrainningSheet[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data: any) => {
    const registerData: RegisterTrainningSheet = {
      categoria: data.categoria,
      exercicios: exercise,
      titulo: data.titulo,
      observacao: data.observacao,
    };

    console.log("Form Data: ", registerData);
    // Handle login logic
    setSheets([...sheets, registerData]);
    setOpen(false);
  };

  return (
    <div className="container-fluid px-5 pt-2">
      <div className="row justify-content-between align-items-center mb-1">
        <Title className="col-lg-10 col-10 fs-4 fs-md-2 fw-semibold">
          Fichas de Treino
        </Title>
        <div className="col-lg-2 col-1">
          <Button onClick={() => setOpen(true)}>
            <FaPlus />
            Criar Ficha
          </Button>
        </div>
      </div>
      {sheets.length === 0 ? (
        <div className="card align-items-center p-2">
          <img className="h-25 w-25" src={NoData} />
          <p className="font-weight-bold h5">Sem fichas cadastradas</p>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row w-100">
            {sheets.map((sheet) => (
              <div className="col-lg-3 col-md-4 col-xs-12">
                <Card className="card">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold mb-0">
                      {sheet.titulo}
                    </h5>
                    <span className="card-subtitle mb-2 text-muted">
                      {sheet.categoria}
                    </span>
                    <div className="card-footer">
                      <a href="#" className="card-link text-decoration-none">
                        Veja mais
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      <ModalBase isOpen={open} setOpen={setOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">
              Criar Ficha de treino
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="form-group">
                <label className="col-form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("titulo", { required: true })}
                />
              </div>
              <Select
                title="Categoria"
                data={Category}
                register={register("categoria")}
              />
              <SelectSearch
                title="Exercícios"
                options={ExerciseMock}
                setData={setExercise}
              />
              <div className="form-group">
                <label className="col-form-label">Observação</label>
                <textarea
                  className="form-control"
                  {...register("observacao")}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="btn btn-primary"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalBase>
    </div>
  );
};

export default TrainingSheet;
