/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import hike from "../../assets/HIKE.png";
import user from "../../assets/user-profile.svg";
import UploadImage from "./UploadImage";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Avatar, Card, Container, Icon, TeamMembers } from "./Profile.styled";
import { useForm } from "react-hook-form";
import { AcademiaMock, AdmManagerMock } from "mocks";
import { IAdmManager, IProfileGym } from "Utils/Interfaces/Interface";
import AdmManager from "./AdmManager";
import axios from "axios";

const Profile = () => {
  const [disable, setDisable] = useState(true);
  const [admins, setAdmins] = useState<IAdmManager[]>(AdmManagerMock);
  const [cep, setCep] = useState(AcademiaMock.cep);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: AcademiaMock,
  });

  const handleUpdateProfileGym = (data: IProfileGym) => {
    console.log("data", data);
    setDisable(true);
  };

  const handleAddress = async (value: string) => {
    console.log("CEP", value);
    const result = await SearchCEP(value);
    if (result) {
      setValue("logradouro", result?.data.logradouro);
      setValue("bairro", result?.data.bairro);
      setValue("cidade", result?.data.localidade);
      setValue("estado", result?.data.uf);
      setValue("complemento", result?.data.complemento);
      setValue("cep", value);
    }
  };

  const handleDeleteManager = async (data: IAdmManager) => {
    setAdmins((prevAdmins) =>
      prevAdmins.filter((admin) => admin.email !== data.email)
    );
    console.log("deletado", data);
  };

  const addAdmin = (newAdmin: IAdmManager) => {
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
  };

  return (
    <div className="p-4">
      <div className="main-panel">
        <div className="content">
          <div className="row">
            <div className="col-md-3">
              <Card className="card-user">
                <div className="image">
                  <img className="" src={hike} alt="..." />
                </div>
                <div className="content">
                  <UploadImage />
                  <Container>
                    <div className="row gy-1 px-3 align-items-center justify-content-between">
                      <p className="col fw-bold">Idade</p>
                      <p className="col text-end">42</p>
                    </div>
                    <div className="row gy-1 px-3 align-items-center justify-content-between">
                      <p className="col col-md-5 fw-bold">Cargo</p>
                      <p className="col col-md-6 text-end">Sub-Gerente</p>
                    </div>
                  </Container>
                </div>
              </Card>
              <Card>
                <div className="card-header p-3">
                  <div className="row row-cols-2 justify-content-between align-items-center">
                    <p className="col h5">Administradores</p>
                    <Icon className="col">
                      <FaPlus
                        data-testid="add-manager"
                        onClick={() => setOpen(true)}
                      />
                    </Icon>
                  </div>
                </div>
                <div className="card-body px-3">
                  <TeamMembers className="list-unstyled">
                    {admins.map((admin, index) => (
                      <li key={index}>
                        <div className="row align-items-center justify-content-around">
                          <div className="col-xs-1 col-3 col-md-2 px-md-1">
                            <Avatar>
                              <img
                                src={user}
                                className="img-circle w-100 img-no-padding img-responsive"
                              />
                            </Avatar>
                          </div>
                          <div className="col-xs-7 col-7 text-truncate">
                            {admin.nome}
                            <br />
                            <span className="text-muted">
                              <small>{admin.email}</small>
                            </span>
                          </div>
                          <div className="col-2 px-0">
                            <button
                              data-testid="delete-manager"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteManager(admin)}
                            >
                              <MdDeleteOutline />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </TeamMembers>
                </div>
              </Card>
            </div>
            <div className="col-md-9">
              <Card className="card-user p-4">
                <div className="card-header row">
                  <h4 className="col card-title">Academia</h4>
                  {disable ? (
                    <div className="col">
                      <MdEdit
                        data-testid="edit-profile-gym"
                        className="icon"
                        onClick={() => setDisable(false)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="card-body pt-3">
                  <form onSubmit={handleSubmit(handleUpdateProfileGym)}>
                    <div className="row row-cols-auto gy-3">
                      <div className="col col-md-5">
                        <div className="form-group">
                          <label htmlFor="academia">Academia</label>
                          <input
                            id="academia"
                            type="text"
                            className="form-control"
                            disabled={disable}
                            placeholder="Nome da academia"
                            {...register("academia")}
                          />
                        </div>
                      </div>
                      <div className="col col-md-3 px-1">
                        <div className="form-group">
                          <label htmlFor="code-gym">Código da academia</label>
                          <input
                            id="code-gym"
                            type="text"
                            className="form-control"
                            placeholder="Código"
                            disabled
                            {...register("code")}
                          />
                        </div>
                      </div>
                      <div className="col col-md-4 pl-1">
                        <div className="form-group">
                          <label htmlFor="cep-gym">CEP</label>
                          <input
                            id="cep-gym"
                            type="text"
                            className="form-control"
                            placeholder="CEP"
                            value={cep}
                            disabled={disable}
                            onChange={(e) => {
                              setCep(e.target.value);
                            }}
                            onBlur={(e) => handleAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col col-md-6 pr-1">
                        <div className="form-group">
                          <label htmlFor="logradouro-gym">Logradouro</label>
                          <input
                            id="logradouro-gym"
                            type="text"
                            className="form-control"
                            placeholder="Logradouro (Rua, Avenida, ...)"
                            disabled={disable}
                            {...register("logradouro")}
                          />
                        </div>
                      </div>
                      <div className="col col-md-6 pl-1">
                        <div className="form-group">
                          <label htmlFor="number-gym">Número</label>
                          <input
                            id="number-gym"
                            type="number"
                            className="form-control"
                            placeholder="Número"
                            disabled={disable}
                            {...register("number")}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="bairro-gym">Bairro</label>
                          <input
                            id="bairro-gym"
                            type="text"
                            className="form-control"
                            placeholder="Bairro"
                            disabled={disable}
                            {...register("bairro")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pr-1">
                        <div className="form-group">
                          <label htmlFor="cidade-gym">Cidade</label>
                          <input
                            id="cidade-gym"
                            type="text"
                            className="form-control"
                            placeholder="Cidade"
                            disabled={disable}
                            {...register("cidade")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 px-1">
                        <div className="form-group">
                          <label htmlFor="estado-gym">Estado</label>
                          <input
                            id="estado-gym"
                            type="text"
                            className="form-control"
                            placeholder="Estado"
                            disabled={disable}
                            {...register("estado")}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="complemento-gym">Complemento</label>
                          <input
                            id="complemento-gym"
                            type="text"
                            className="form-control"
                            placeholder="Complemento"
                            disabled={disable}
                            {...register("complemento")}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="info-gym">
                            Informações adicionais
                          </label>
                          <textarea
                            id="info-gym"
                            disabled={disable}
                            className="form-control textarea"
                            {...register("adicional")}
                          ></textarea>
                        </div>
                      </div>
                      <div className="update ml-auto mr-auto">
                        <button
                          data-testid="button-update-gym"
                          type="submit"
                          className="btn btn-primary btn-round"
                        >
                          Atualizar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <AdmManager open={open} setOpen={setOpen} addAdmin={addAdmin} />
    </div>
  );
};

export const SearchCEP = (value: string) => {
  var cep = value.replace(/\D/g, "");
  var validacep = /^[0-9]{8}$/;

  if (cep !== "") {
    if (validacep.test(cep)) {
      const response = axios.get("https://viacep.com.br/ws/" + cep + "/json/?");
      return response;
    } else {
      return null;
    }
  }
};

export default Profile;
