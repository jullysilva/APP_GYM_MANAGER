import React, { useEffect, useState } from "react";
import { Status } from "./Member.styled";
import ModalBase from "components/Modal/Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IExercise, IMember, ITrainingSheet } from "Utils/Interfaces/Interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAluno } from "Utils/Schemas";
import { MemberSchema } from "Utils/Schemas/UserSchema";
import {
  createMember,
  deleteMember,
  getAllMembers,
  updateMember,
} from "../../services/Requests/MemberService";

import NoEmpty from "components/NoEmpty/NoEmpy";
import { StatusPayment } from "data/index";
import { getAllSheets } from "../../services/Requests/TrainingSheetsService";
import { getAllExercises } from "../../services/Requests/ExercisesService";

const Member: React.FC = () => {
  const [members, setMembers] = useState<IMember[] | null>(null);
  const [sheets, setSheets] = useState<ITrainingSheet[]>([]);
  const [sheet, setSheet] = useState<ITrainingSheet>();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [formData, setFormData] = useState<Partial<IMember>>({});
  const [isTrainer, setIsTrainer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterAluno>({
    resolver: zodResolver(MemberSchema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getAllMembers();
    if (response.status === "success") {
      setMembers(response.data);
    }

    const sheet = await getAllSheets();
    setSheets(sheet.data);

    const exercise = await getAllExercises();
    if (exercise.status === "success") {
      setExercises(exercise.data);
    }
  };

  const handleAddClick = () => {
    reset();
    setSelectedMember(null);
    setShowModal(true);
  };

  const handleEditClick = (member: IMember) => {
    reset();

    setSheet(sheets.find((sheet) => sheet.userId === member.id));

    setExercises(
      sheet?.exerciseIds.map((i) =>
        exercises?.filter((exercise) => exercise.id === i)
      )[0]
    );

    setSelectedMember(member);
    setFormData(member);
    setShowModal(true);
    setIsTrainer(!!member.cref);
  };

  const handleSave = async (data: RegisterAluno) => {
    if (selectedMember) {
      const saveData = {
        ...data,
        firstAccess: false,
        isTrainer,
      };

      await updateMember(formData.id, saveData);
    } else {
      const saveData = {
        ...data,
        isTrainer,
      };
      await createMember(saveData);
    }
    setShowModal(false);
    reset();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteMember(id);
    fetchData();
  };

  const handleTrainerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTrainer(event.target.checked);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDENTE":
        return "#c8c842";
      case "ATRASADO":
        return "red";
      case "PAGO":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="container-fluid px-5 pt-2">
      <div className="row row-cols-2 aligns-items-center justify-content-between">
        <p className="col fs-2 fw-semibold">Membros</p>
        <div className="col-1">
          <button
            className="btn btn-outline-success"
            onClick={handleAddClick}
            data-testid="add-member"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {members === null ? (
        <NoEmpty text={"Nenhum aluno cadastrado"} />
      ) : (
        <div className="table-responsive bg-white p-3">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Treinador</th>
                <th>Pagamento</th>
                <th>Bloqueado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {members?.map((member) => (
                <tr key={Number(member.id)}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.isTrainer}</td>
                  <td>
                    <Status color={getStatusColor(member.status)}>
                      {member.status}
                    </Status>
                  </td>
                  <td>
                    {member.active ? (
                      <Status color="green">ATIVO</Status>
                    ) : (
                      <Status color="red">DESATIVADO</Status>
                    )}
                  </td>
                  <td className="row row-cols-2">
                    <div className="col-4">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEditClick(member)}
                        data-testid="edit-member"
                      >
                        <MdEdit />
                      </button>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(member.id)}
                        data-testid="delete-member"
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
      )}
      <ModalBase isOpen={showModal} setOpen={() => setShowModal(false)}>
        <div className="modal-header">
          <div className="modal-title h5 fw-bold">
            {selectedMember ? "Editar Membro" : "Adicionar Membro"}
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="row row-cols-3 g-3 mb-3">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="name-member" className="col-form-label">
                    Nome completo
                  </label>
                  <input
                    id="name-member"
                    type="text"
                    className="form-control"
                    placeholder="Nome completo do aluno"
                    defaultValue={selectedMember ? formData.name : ""}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-muted">{errors.name.message}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email-member" className="col-form-label">
                    Email
                  </label>
                  <input
                    id="email-member"
                    type="email"
                    className="form-control"
                    placeholder="Email do aluno"
                    defaultValue={selectedMember ? formData.email : ""}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-muted">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="pagamento" className="col-form-label">
                    Status pagamento
                  </label>
                  <select
                    id="pagamento"
                    className="form-select"
                    defaultValue={selectedMember ? formData.status : "PENDENTE"}
                    {...register("status")}
                  >
                    {StatusPayment.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.status && (
                    <span className="text-muted">{errors.status.message}</span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="cpf-member" className="col-form-label">
                    CPF
                  </label>
                  <input
                    id="cpf-member"
                    type="tel"
                    className="form-control"
                    defaultValue={selectedMember ? formData.cpf : ""}
                    placeholder="xxx.xxx.xxx-xx"
                    {...register("cpf")}
                  />
                  {errors.cpf && (
                    <span className="text-muted">{errors.cpf.message}</span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="row align-items-center ps-3">
                  <div className="col-5 form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkTrainer"
                      checked={isTrainer}
                      onChange={handleTrainerChange}
                    />
                    <label className="form-check-label" htmlFor="checkTrainer">
                      O Membro é treinador
                    </label>
                  </div>
                  {isTrainer && (
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="code-cref" className="col-form-label">
                          Código CREF
                        </label>
                        <input
                          id="code-cref"
                          className="form-control"
                          defaultValue={selectedMember ? formData.cref : ""}
                          placeholder="Número da Credencial de Educação Física"
                          {...register("cref")}
                        />
                        {errors.cref && (
                          <span className="text-muted">
                            {errors.cref.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {sheet ? (
                <div className="col-12">
                  <div className="accordion accordion-flush">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed bg-light"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          #1 | {sheet?.title}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="row row-col-2">
                            <p className="col fw-bold">Atividade</p>
                            <p className="col text-end text-muted">
                              {sheet?.activity}
                            </p>
                          </div>
                          <p className="fw-bold">Exercícios</p>
                          {exercises?.map((item, index) => (
                            <div className="row">
                              <p className="col text-muted">
                                #{index + 1} - {item.name}, {item.equipament},
                                Série: {item.serie}, intervalo: {item.interval}
                              </p>
                              <hr />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-light me-3" onClick={handleCloseModal}>
                Fechar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-testid="button-add"
              >
                {selectedMember ? "Atualizar" : "Adicionar"}
              </button>
            </div>
          </form>
        </div>
      </ModalBase>
    </div>
  );
};

export default Member;
