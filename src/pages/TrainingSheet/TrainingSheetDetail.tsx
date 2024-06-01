import React, { useEffect, useState } from "react";
import ModalBase from "components/Modal/Modal";
import Select from "components/Select/Select";
import { MdDelete, MdEdit } from "react-icons/md";
import { ExerciseMock } from "mocks";
import { useForm } from "react-hook-form";
import { IconEdit } from "./TrainingSheet.styled";
import { RegisterTrainningSheet } from "Utils/Schemas";
import { columnsExercise } from "pages/Exercise/Exercise";
import { FaPlus } from "react-icons/fa";

interface TrainingSheetDetailProps {
  sheet: RegisterTrainningSheet;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const TrainingSheetDetail: React.FC<TrainingSheetDetailProps> = ({
  sheet,
  open,
  setOpen,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [exercises, setExercises] = useState(sheet?.exercicios || []);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null
  );

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      titulo: sheet?.titulo,
      observacao: sheet?.observacao,
      categoria: sheet?.categoria,
      exercicios: sheet?.exercicios,
    },
  });

  useEffect(() => {
    setExercises(sheet?.exercicios || []);
    reset({
      titulo: sheet?.titulo,
      observacao: sheet?.observacao,
      categoria: sheet?.categoria,
      exercicios: sheet?.exercicios,
    });
  }, [sheet, reset]);

  useEffect(() => {
    setValue("exercicios", exercises);
  }, [exercises, setValue]);

  const deleteExercise = (exercicio) => {
    setExercises((prevExercises) =>
      prevExercises.filter((ex) => ex.id !== exercicio.id)
    );
  };

  const addExercise = () => {
    const selectedExercise = ExerciseMock.find(
      (exercise) => exercise.id === selectedExerciseId
    );
    if (
      selectedExercise &&
      !exercises.find((ex) => ex.id === selectedExercise.id)
    ) {
      setExercises([...exercises, selectedExercise]);
    }
  };

  const handleUpdateSheet = (data) => {
    const updatedSheet = {
      ...data,
      exercicios: exercises,
    };
    console.log(updatedSheet);
    setOpen(false);
  };

  return (
    <ModalBase isOpen={open} setOpen={setOpen} width={900} maxHeight={700}>
      <div className="modal-content">
        <div className="modal-header row justify-content-between">
          <h5 className="col-6 modal-title font-weight-bold">
            Ficha de treino - {sheet?.titulo}
          </h5>
          {disabled ? (
            <IconEdit
              className="col-1 text-end"
              onClick={() => setDisabled(false)}
            >
              <MdEdit size={24} data-testid="icon-edit" />
            </IconEdit>
          ) : (
            ""
          )}
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(handleUpdateSheet)}>
            <div className="row row-cols-2 g-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="titulo" className="col-form-label">
                    Título
                  </label>
                  <input
                    id="titulo"
                    type="text"
                    className="form-control"
                    defaultValue={sheet?.titulo}
                    {...register("titulo", { required: true })}
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="observacao" className="col-form-label">
                    Observação
                  </label>
                  <textarea
                    id="observacao"
                    className="form-control"
                    defaultValue={sheet?.observacao}
                    {...register("observacao")}
                    disabled={disabled}
                  ></textarea>
                </div>
              </div>
              <div className="col">
                <div className="row row-cols-2 align-items-end">
                  <div className="col-7">
                    <div className="form-group">
                      <label htmlFor="exercicios" className="col-form-label">
                        Exercícios
                      </label>
                      <select
                        id="exercicios"
                        className="form-select"
                        disabled={disabled}
                        defaultValue="Selecione um exercício"
                        onChange={(e) =>
                          setSelectedExerciseId(Number(e.target.value))
                        }
                      >
                        <option value="Selecione um exercício">
                          Selecione um exercício
                        </option>
                        {ExerciseMock.map((option) => (
                          <option value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      data-testid="button-plus"
                      type="button"
                      className="btn btn-outline-success"
                      disabled={disabled}
                    >
                      <FaPlus onClick={addExercise} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <Select
                  title="Categoria"
                  valueSelected={sheet?.categoria}
                  register={register("categoria")}
                  disabled={disabled}
                />
              </div>
              <div className="col-12">
                <div
                  className="table-responsive mt-2"
                  style={{ maxHeight: 200, overflow: "auto" }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        {columnsExercise.map((column) => (
                          <th scope="col">{column.headerName}</th>
                        ))}
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercises.map((exercicio) => (
                        <tr key={exercicio.id}>
                          <th>{exercicio.id}</th>
                          <td>{exercicio.name}</td>
                          <td>{exercicio.category}</td>
                          <td>{exercicio.equipamento}</td>
                          <td>{exercicio.serie}</td>
                          <td>{exercicio.nRepeticao}</td>
                          <td>{exercicio.intervalo}</td>
                          <td>
                            <div className="row">
                              <IconEdit className="col-6">
                                <MdDelete
                                  size={20}
                                  onClick={() => deleteExercise(exercicio)}
                                  style={{
                                    cursor: disabled
                                      ? "not-allowed"
                                      : "pointer",
                                    color: disabled ? "gray" : "inherit",
                                  }}
                                />
                              </IconEdit>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer my-2">
              <button
                type="button"
                className="btn btn-secondary me-3"
                data-dismiss="modal"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                data-testid="button-update"
                // onSubmit={handleSubmit(onSubmitForm)}
                className="btn btn-primary"
                disabled={disabled}
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default TrainingSheetDetail;
