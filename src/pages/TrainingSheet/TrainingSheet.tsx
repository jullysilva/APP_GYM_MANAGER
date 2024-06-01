import React, { useState } from "react";
import { ExerciseMock } from "mocks";
import NoData from "../../assets/no-data.png";
import { FaPlus } from "react-icons/fa";
import { Button, Card, Title } from "./TrainingSheet.styled";
import SelectSearch from "components/SelectSearch/SelectSearch";
import Select from "components/Select/Select";
import { useForm } from "react-hook-form";
import { RegisterTrainningSheet } from "Utils/Schemas";
import bgCard from "../../assets/bg-sheet.jpg";
import TrainingSheetDetail from "./TrainingSheetDetail";
import Modal from "components/Modal/Modal";

const TrainingSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [sheet, setSheet] = useState<RegisterTrainningSheet>();
  const [exercise, setExercise] = useState([]);
  const [sheets, setSheets] = useState<RegisterTrainningSheet[]>([]);

  const { register, handleSubmit } = useForm();

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

  const handleSheetDetail = (data: RegisterTrainningSheet) => {
    setSheet(data);
    setOpenDetail(true);
    console.log(data);
  };

  return (
    <div className="container-fluid px-5 pt-2">
      <div className="row justify-content-between align-items-center mb-1">
        <Title className="col-lg-10 col-10 col-sm-9 fs-4 fs-md-2 fw-semibold">
          Fichas de Treino
        </Title>
        <div className="col-lg-2 col-sm-1 col-1">
          <Button onClick={() => setOpen(true)} data-testId="button-create">
            <FaPlus />
            Criar Ficha
          </Button>
        </div>
      </div>
      {sheets.length === 0 ? (
        <div className="card align-items-center p-2">
          <img className="h-25 w-25" alt="imagem de pastas" src={NoData} />
          <p className="font-weight-bold h5">Sem fichas cadastradas</p>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row row-cols-6 w-100">
            {sheets.map((sheet) => (
              <div className="col col-lg-3 col-md-4 col-xs-12">
                <Card className="card">
                  <img src={bgCard} alt="Imagem de fundo" />
                  <div className="card-body p-0">
                    <h3 className="card-title text-white font-weight-bold mb-0">
                      {sheet.titulo}
                    </h3>
                    <span className="card-subtitle mb-5 text-muted">
                      {sheet.categoria}
                    </span>
                    <div className="card-footer p-0">
                      <button
                        type="button"
                        data-testid="button-veja-mais"
                        className="btn btn-outline-info w-100"
                        onClick={() => handleSheetDetail(sheet)}
                      >
                        Veja mais
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      <Modal isOpen={open} setOpen={setOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">
              Criar Ficha de treino
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="form-group">
                <label htmlFor="titulo" className="col-form-label">
                  Título
                </label>
                <input
                  id="titulo"
                  type="text"
                  className="form-control"
                  {...register("titulo", { required: true })}
                />
              </div>
              <Select title="Categoria" register={register("categoria")} />
              <SelectSearch
                title="Exercícios"
                options={ExerciseMock}
                setData={setExercise}
              />
              <div className="form-group">
                <label htmlFor="observacao" className="col-form-label">
                  Observação
                </label>
                <textarea
                  id="observacao"
                  className="form-control"
                  {...register("observacao")}
                ></textarea>
              </div>
              <div className="modal-footer pt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  data-dismiss="modal"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  data-testid="button-save"
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="btn btn-primary"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {openDetail ? (
        <TrainingSheetDetail
          open={openDetail}
          setOpen={setOpenDetail}
          sheet={sheet}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TrainingSheet;
