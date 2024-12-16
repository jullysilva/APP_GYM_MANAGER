import React, { useState, useEffect } from "react";
import {
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../../services/Requests/ExercisesService";
import { IExercise } from "Utils/Interfaces/Interface";
import ModalBase from "components/Modal/Modal";
import { Grupo } from "data/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExerciseSchema } from "Utils/Schemas/UserSchema";
import { Exercise } from "Utils/Schemas";
import { useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import NoEmpty from "components/NoEmpty/NoEmpy";

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<IExercise>>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Exercise>({
    resolver: zodResolver(ExerciseSchema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getAllExercises();
    if (Array.isArray(response.data)) {
      setExercises(response.data);
    } else {
      setExercises([]);
    }
  };

  const handleAddClick = () => {
    reset();
    setSelectedExercise(null);
    setShowModal(true);
  };

  const handleEditClick = (exercise: IExercise) => {
    setSelectedExercise(exercise);
    setFormData(exercise);
    setShowModal(true);
  };

  const handleSave = async (data: Exercise) => {
    if (selectedExercise) {
      await updateExercise(selectedExercise.id, data);
    } else {
      await createExercise(data);
    }
    setShowModal(false);
    reset();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteExercise(id);
    fetchData();
  };

  return (
    <div className="container-fluid px-5 pt-2">
      <div className="row row-cols-2 aligns-items-center justify-content-between">
        <p className="col fs-2 fw-semibold">Exercícios</p>
        <div className="col-1">
          <button
            className="btn btn-outline-success"
            onClick={handleAddClick}
            data-testid="add-exercise"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {exercises.length !== 0 ? (
        <div className="table-responsive bg-white p-3">
          <table className="table">
            <thead>
              <tr>
                <th>Exercício</th>
                <th>Categoria</th>
                <th>Equipamento</th>
                <th>Série</th>
                <th>Nº de Repetição</th>
                <th>Tempo de Intervalo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {exercises?.map((exercise) => (
                <tr key={Number(exercise.id)}>
                  <td>{exercise.name}</td>
                  <td>{exercise.category}</td>
                  <td>{exercise.equipament}</td>
                  <td>{exercise.serie}</td>
                  <td>{exercise.num_rep}</td>
                  <td>{exercise.interval}</td>
                  <td className="row row-cols-2 gx-1">
                    <div className="col">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEditClick(exercise)}
                        data-testid="edit-exercise"
                      >
                        <MdEdit />
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(exercise.id)}
                        data-testid="delete-exercise"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoEmpty text="Sem exercícios cadastrados" />
      )}
      <ModalBase isOpen={showModal} setOpen={() => setShowModal(false)}>
        <div className="modal-header">
          <div className="modal-title h5 fw-bold">
            {selectedExercise ? "Editar Exercício" : "Adicionar Exercício"}
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="row row-cols-3 g-3 mb-3">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="name-exercise" className="col-form-label">
                    Exercício
                  </label>
                  <input
                    id="name-exercise"
                    type="text"
                    className="form-control"
                    placeholder="Nome do exercício"
                    defaultValue={selectedExercise ? formData?.name : null}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-muted">{errors.name.message}</span>
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="category" className="col-form-label">
                    Categoria
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    defaultValue={selectedExercise ? formData?.category : null}
                    {...register("category")}
                  >
                    {Grupo?.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-muted">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-8">
                <div className="form-group">
                  <label htmlFor="equipamento" className="col-form-label">
                    Equipamento
                  </label>
                  <input
                    id="equipamento"
                    className="form-control"
                    defaultValue={
                      selectedExercise ? formData?.equipament : null
                    }
                    placeholder="Ex.: Esteira, Escada, ..."
                    {...register("equipament")}
                  />
                  {errors.equipament && (
                    <span className="text-muted">
                      {errors.equipament.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="serie" className="col-form-label">
                    Quantidade série
                  </label>
                  <input
                    id="serie"
                    type="number"
                    className="form-control"
                    defaultValue={selectedExercise ? formData?.serie : null}
                    placeholder="Quantidade de séries"
                    {...register("serie")}
                  />
                  {errors.serie && (
                    <span className="text-muted">{errors.serie.message}</span>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="num-rep" className="col-form-label">
                    Nº de Repetição
                  </label>
                  <input
                    id="num-rep"
                    type="number"
                    className="form-control"
                    defaultValue={selectedExercise ? formData?.num_rep : null}
                    placeholder="Repetições"
                    {...register("num_rep")}
                  />
                  {errors.num_rep && (
                    <span className="text-muted">{errors.num_rep.message}</span>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="intervalo" className="col-form-label">
                    Intervalo (seg)
                  </label>
                  <input
                    id="intervalo"
                    type="number"
                    className="form-control"
                    defaultValue={selectedExercise ? formData?.interval : null}
                    placeholder="Intervalo em segundos"
                    {...register("interval")}
                  />
                  {errors.interval && (
                    <span className="text-muted">
                      {errors.interval.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-light me-3"
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
              <button className="btn btn-primary" data-testid="button-add">
                {selectedExercise ? "Atualizar" : "Adicionar"}
              </button>
            </div>
          </form>
        </div>
      </ModalBase>
    </div>
  );
};

export default Exercises;
