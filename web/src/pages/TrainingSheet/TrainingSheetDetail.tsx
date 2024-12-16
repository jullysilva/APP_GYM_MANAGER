import React, { useEffect, useState } from "react";
import ModalBase from "components/Modal/Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { IconEdit } from "./TrainingSheet.styled";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IExercise, IMember, ITrainingSheet } from "Utils/Interfaces/Interface";
import { Category } from "data/index";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { updateTrainingSheet } from "../..//services/Requests/TrainingSheetsService";
import { ToastContainer, toast } from "react-toastify";

interface TrainingSheetDetailProps {
  sheet: ITrainingSheet;
  open: boolean;
  listExercises: IExercise[];
  listMembers: IMember[];
  setOpen: (arg: boolean) => void;
}

const TrainingSheetDetail: React.FC<TrainingSheetDetailProps> = ({
  sheet,
  open,
  setOpen,
  listExercises,
  listMembers,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [disabled, setDisabled] = useState(true);
  const [selectedMember, setSelectedMember] = useState<IMember>(
    listMembers.find((ex) => ex.id === sheet?.userId)
  );
  const [selectedExercises, setSelectedExercises] = useState<IExercise[]>(
    listExercises.filter((exercise) =>
      sheet?.exerciseIds.find((sheetExercise) => sheetExercise === exercise.id)
    )
  );

  console.log("selectExercise", selectedExercises);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: sheet?.title,
      activity: sheet?.activity,
      exerciseIds: sheet?.exerciseIds,
    },
  });

  useEffect(() => {
    reset({
      title: sheet?.title,
      activity: sheet?.activity,
      exerciseIds: sheet?.exerciseIds,
    });
  }, [sheet, reset]);

  useEffect(() => {
    const values = selectedExercises.map((exercise) => exercise.id);
    setValue("exerciseIds", values);
  }, [selectedExercises, setValue]);

  const deleteExercise = (exercicio) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((ex) => ex?.id !== exercicio.id)
    );
  };

  const handleUpdateSheet = async (data: ITrainingSheet) => {
    const newSheet = {
      title: data.title,
      actitivy: data.activity,
      userId: selectedMember.id,
      exerciseIds: selectedExercises.map((ex) => ex.id),
    };

    try {
      const response = await updateTrainingSheet(sheet.id, newSheet);
      if (response.status === "success") {
        reset();
        toast.success("Registro realizado com sucesso, volte para login!");
      } else {
        toast.error("Erro no registro. Tente novamente.");
      }
    } catch (error) {
      toast.error(`Erro: ${error.message}`);
    }
    setOpen(false);
  };

  const handleExerciseChange = (event: any, value: IExercise[]) => {
    setSelectedExercises(value);
  };

  const handleMemberChange = (event: any, value: IMember) => {
    setSelectedMember(value);
  };

  return (
    <>
      <ModalBase isOpen={open} setOpen={setOpen} width={900} maxHeight={700}>
        <div className="modal-content">
          <div className="modal-header row justify-content-between">
            <h5 className="col-6 modal-title font-weight-bold">
              Ficha de treino - {sheet?.title}
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
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="titulo" className="col-form-label">
                      Título
                    </label>
                    <input
                      id="titulo"
                      type="text"
                      className="form-control"
                      defaultValue={sheet?.title}
                      {...register("title")}
                      disabled={disabled}
                    />
                    {errors.title && (
                      <span className="text-muted text-danger">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="select-option" className="col-form-label">
                      Grupo de atividade
                    </label>
                    <select
                      id="select-option"
                      className="form-control"
                      {...register("activity")}
                      disabled={disabled}
                      defaultValue={sheet?.activity || ""}
                    >
                      {!sheet?.activity && (
                        <option value="">Selecione uma atividade</option>
                      )}
                      {Category?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.activity && (
                      <span className="text-muted text-danger">
                        {errors.activity.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="member" className="col-form-label">
                      Aluno
                    </label>
                    <Autocomplete
                      className="w-100"
                      disabled={disabled}
                      id="checkboxes-member"
                      options={listMembers}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={handleMemberChange}
                      value={selectedMember}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Alunos"
                          placeholder="Alunos"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exercicios" className="col-form-label">
                      Exercícios
                    </label>
                    <Autocomplete
                      multiple
                      className="w-100"
                      disabled={disabled}
                      id="checkboxes-tags-demo"
                      options={listExercises}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option, { selected }) => (
                        <li {...props} key={option.id}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      onChange={handleExerciseChange}
                      value={selectedExercises}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Exércicios"
                          placeholder="Exercícios"
                        />
                      )}
                    />
                  </div>
                </div>

                {selectedExercises.length !== 0 ? (
                  <div className="col-12">
                    <div
                      className="table-responsive mt-2"
                      style={{ maxHeight: 200, overflow: "auto" }}
                    >
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Equipamento</th>
                            <th>Séries</th>
                            <th>Intervalo</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedExercises.map((exercicio) => (
                            <tr key={exercicio.id}>
                              <td>{exercicio.name}</td>
                              <td>{exercicio.category}</td>
                              <td>{exercicio.equipament}</td>
                              <td>{exercicio.serie}</td>
                              <td>{exercicio.interval}</td>
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
                ) : (
                  ""
                )}
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
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default TrainingSheetDetail;
