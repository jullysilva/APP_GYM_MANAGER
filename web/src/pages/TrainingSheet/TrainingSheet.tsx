import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button, Card, Title } from "./TrainingSheet.styled";
import { useForm } from "react-hook-form";
import { Exercise, TrainningSheet } from "Utils/Schemas";
import bgCard from "../../assets/bg-sheet.jpg";
import Modal from "components/Modal/Modal";
import NoEmpty from "components/NoEmpty/NoEmpy";
import {
  createTrainingSheet,
  updateTrainingSheet,
  getAllSheets,
  deleteTrainingSheet,
  getTrainingSheet,
} from "../../services/Requests/TrainingSheetsService";
import { getAllExercises } from "../../services/Requests/ExercisesService";
import TrainingSheetDetail from "./TrainingSheetDetail";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { Category } from "data/index";
import { IExercise, IMember, ITrainingSheet } from "Utils/Interfaces/Interface";
import { MdDelete } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrainningSheetSchema } from "Utils/Schemas/UserSchema";
import { getAllMembers } from "../../services/Requests/MemberService";

const TrainingSheet: React.FC = () => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [sheet, setSheet] = useState<ITrainingSheet | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [sheets, setSheets] = useState<TrainningSheet[]>([]);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [members, setMembers] = useState<IMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<IMember>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TrainningSheet>({
    resolver: zodResolver(TrainningSheetSchema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const sheetResponse = await getAllSheets();
    setSheets(sheetResponse.data);

    const exerciseResponse = await getAllExercises();
    setExercises(exerciseResponse.data);

    const members = await getAllMembers();
    setMembers(members.data);
  };

  const handleAddClick = () => {
    reset();
    setSheet(null);
    setSelectedExercises([]);
    setOpen(true);
  };

  const onSubmitForm = async (data: any) => {
    const registerData: TrainningSheet = {
      activity: data.activity,
      userId: selectedMember.id,
      exerciseIds: selectedExercises.map((ex) => ex.id),
      title: data.title,
    };

    if (sheet) {
      await updateTrainingSheet(sheet.id, registerData);
    } else {
      await createTrainingSheet(registerData);
    }

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (sheet: TrainningSheet) => {
    await deleteTrainingSheet(sheet?.id);
    fetchData();
  };

  const handleSheetDetail = async (data: TrainningSheet) => {
    try {
      const response = await getTrainingSheet(data.id);
      setSheet(response.data);
      setOpenDetail(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleExerciseChange = (event: any, value: Exercise[]) => {
    setSelectedExercises(value);
  };

  useEffect(() => {
    setValue(
      "exerciseIds",
      selectedExercises.map((ex) => ex.id)
    );
  }, [selectedExercises, setValue]);

  const handleMemberChange = (event: any, value: IMember) => {
    setSelectedMember(value);
  };

  useEffect(() => {
    setValue("userId", selectedMember?.id);
  }, [selectedMember, setValue]);

  return (
    <div className="container-fluid px-5 pt-2">
      <div className="row justify-content-between align-items-center mb-1">
        <Title className="col-lg-10 col-10 col-sm-9 fs-4 fs-md-2 fw-semibold">
          Fichas de Treino
        </Title>
        <div className="col-lg-2 col-sm-1 col-1">
          <Button onClick={handleAddClick} data-testId="button-create">
            <FaPlus />
            Criar Ficha
          </Button>
        </div>
      </div>
      {sheets.length === 0 ? (
        <NoEmpty text="Sem fichas cadastradas" />
      ) : (
        <div className="container-fluid">
          <div className="row row-cols g-3">
            {sheets.map((sheet) => (
              <div key={Number(sheet?.id)} className="col">
                <Card className="card">
                  <img src={bgCard} alt="Imagem de fundo" />
                  <div className="card-body p-0">
                    <h3 className="card-title text-white font-weight-bold mb-0">
                      {sheet.title}
                    </h3>
                    <span className="card-subtitle mb-5 text-muted">
                      {sheet.activity}
                    </span>
                    <div className="row gy-2 card-footer mt-3 p-0">
                      <button
                        type="button"
                        data-testid="button-veja-mais"
                        className="col-12 btn btn-outline-info"
                        onClick={() => handleSheetDetail(sheet)}
                      >
                        Veja mais
                      </button>
                      <button
                        type="button"
                        data-testid="button-delete"
                        className="col-12 btn btn-outline-danger"
                        onClick={() => handleDelete(sheet)}
                      >
                        <MdDelete />
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
              {sheet ? "Editar Ficha de treino" : "Criar Ficha de treino"}
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
                  defaultValue={sheet ? sheet.title : ""}
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-muted text-danger">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="select-option" className="col-form-label">
                  Grupo de atividade
                </label>
                <select
                  id="select-option"
                  className="form-control"
                  {...register("activity")}
                  defaultValue={sheet ? sheet.activity : ""}
                >
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
              <div className="form-group">
                <label htmlFor="exercicios" className="col-form-label">
                  Exercícios
                </label>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={exercises}
                  disableCloseOnSelect
                  className="w-100"
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
                    <TextField {...params} placeholder="Exercícios" />
                  )}
                />
                {errors.exerciseIds && (
                  <span className="text-muted text-danger">
                    {errors.exerciseIds.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="member" className="col-form-label">
                  Aluno
                </label>
                <Autocomplete
                  id="checkboxes-member"
                  options={members}
                  disableCloseOnSelect
                  className="w-100"
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={handleMemberChange}
                  value={selectedMember}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Alunos" />
                  )}
                />
                {errors.userId && (
                  <span className="text-muted text-danger">
                    {errors.userId.message}
                  </span>
                )}
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
                  className="btn btn-primary"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {openDetail && (
        <TrainingSheetDetail
          open={openDetail}
          setOpen={setOpenDetail}
          sheet={sheet}
          listExercises={exercises}
          listMembers={members}
        />
      )}
    </div>
  );
};

export default TrainingSheet;
