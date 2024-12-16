/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import hike from "../../assets/HIKE.png";
import UploadImage from "./UploadImage";
import { MdEdit } from "react-icons/md";
import { Card, Container } from "./Profile.styled";
import { useForm } from "react-hook-form";
import { IGym, IManager } from "Utils/Interfaces/Interface";
import {
  createGym,
  getGym,
  updateGym,
} from "../../services/Requests/GymService";
import axios from "axios";
import { useAuth } from "Utils/Context/useAuth";
import { getManager } from "../../services/Requests/AccessService";
import { ProfileGym } from "Utils/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileGymSchema } from "Utils/Schemas/UserSchema";

const Profile = () => {
  const { userData } = useAuth();
  const [disable, setDisable] = useState(true);
  const [cep, setCep] = useState("");
  const [gym, setGym] = useState<IGym | null>(null);
  const [manager, setManager] = useState<IManager>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileGym>({
    resolver: zodResolver(ProfileGymSchema),
  });

  useEffect(() => {
    if (userData?.manager.id) {
      fetchGymData(userData.manager.id);
    }
  }, []);

  const fetchGymData = async (idManager: string) => {
    const response = await getGym(idManager);
    if (response.data !== null) {
      const gymData = response.data;
      setGym(gymData);
      setCep(gymData.zip_code);
      setDisable(true);
      Object.keys(gymData).forEach((key) => {
        setValue(key as keyof ProfileGym, gymData[key]);
      });
    } else {
      setDisable(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getManager(userData?.manager.id);
    setManager(response.data);
  };

  const handleUpdateProfileGym = async (data: IGym) => {
    try {
      if (gym !== null) {
        await updateGym(userData.manager.id, data);
      } else {
        await createGym({
          ...data,
          number: Number(data.number),
          managerId: userData.manager.id,
        });
      }
      setDisable(true);
      fetchGymData(userData.manager.id);
    } catch (error) {
      console.error("Erro ao atualizar a academia", error);
    }
  };

  const handleAddress = async (value: string) => {
    const result = await SearchCEP(value);
    if (result) {
      setValue("street", result?.data.logradouro);
      setValue("neighborhood", result?.data.bairro);
      setValue("city", result?.data.localidade);
      setValue("state", result?.data.uf);
      setValue("complement", result?.data.complemento);
      setValue("zip_code", value);
      setCep(value);
    }
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
                    <div className="row px-3 align-items-center justify-content-between">
                      <p className="col-12 fw-bold">Nome</p>
                      <p className="col-12">{manager?.name}</p>
                      <p className="col-12 fw-bold">Telefone</p>
                      <p className="col-12">{manager?.phone}</p>
                      <p className="col-12 fw-bold">Email</p>
                      <p className="col-12">{manager?.email}</p>
                      <p className="col-12 fw-bold">CNPJ</p>
                      <p className="col-12">{manager?.document}</p>
                    </div>
                  </Container>
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
                          <label htmlFor="name">Academia</label>
                          <input
                            id="name"
                            type="text"
                            className="form-control"
                            disabled={disable}
                            placeholder="Nome da academia"
                            {...register("name")}
                          />
                          {errors.name && (
                            <span className="text-muted text-danger">
                              {errors.name.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col col-md-3 px-1">
                        <div className="form-group">
                          <label htmlFor="code">Código da academia</label>
                          <input
                            id="code"
                            type="text"
                            className="form-control"
                            placeholder="Código"
                            disabled
                            {...register("code")}
                          />
                        </div>
                      </div>
                      <div className="col col-md-5">
                        <div className="form-group">
                          <label htmlFor="phone">Telefone</label>
                          <input
                            id="phone"
                            type="tel"
                            maxLength={11}
                            className="form-control"
                            disabled={disable}
                            placeholder="(xx) x xxxx-xxxx"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <span className="text-muted text-danger">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col col-md-4 pl-1">
                        <div className="form-group">
                          <label htmlFor="zip_code">CEP</label>
                          <input
                            id="zip_code"
                            type="text"
                            className="form-control"
                            placeholder="CEP"
                            value={cep}
                            disabled={disable}
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={(e) => handleAddress(e.target.value)}
                          />
                          {errors.zip_code && (
                            <span className="text-muted text-danger">
                              {errors.zip_code.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col col-md-6 pr-1">
                        <div className="form-group">
                          <label htmlFor="street">Logradouro</label>
                          <input
                            id="street"
                            type="text"
                            className="form-control"
                            placeholder="Logradouro (Rua, Avenida, ...)"
                            disabled={disable}
                            {...register("street")}
                          />
                          {errors.street && (
                            <span className="text-muted text-danger">
                              {errors.street.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col col-md-6 pl-1">
                        <div className="form-group">
                          <label htmlFor="number">Número</label>
                          <input
                            id="number"
                            type="number"
                            className="form-control"
                            placeholder="Número"
                            disabled={disable}
                            {...register("number")}
                          />
                          {errors.number && (
                            <span className="text-muted text-danger">
                              {errors.number.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="neighborhood">Bairro</label>
                          <input
                            id="neighborhood"
                            type="text"
                            className="form-control"
                            placeholder="Bairro"
                            disabled={disable}
                            {...register("neighborhood")}
                          />
                          {errors.neighborhood && (
                            <span className="text-muted text-danger">
                              {errors.neighborhood.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4 pr-1">
                        <div className="form-group">
                          <label htmlFor="city">Cidade</label>
                          <input
                            id="city"
                            type="text"
                            className="form-control"
                            placeholder="Cidade"
                            disabled={disable}
                            {...register("city")}
                          />
                          {errors.city && (
                            <span className="text-muted text-danger">
                              {errors.city.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4 px-1">
                        <div className="form-group">
                          <label htmlFor="state">Estado</label>
                          <input
                            id="state"
                            type="text"
                            className="form-control"
                            placeholder="Estado"
                            disabled={disable}
                            {...register("state")}
                          />
                          {errors.state && (
                            <span className="text-muted text-danger">
                              {errors.state.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="complement">Complemento</label>
                          <input
                            id="complement"
                            type="text"
                            className="form-control"
                            placeholder="Complemento"
                            disabled={disable}
                            {...register("complement")}
                          />
                          {errors.complement && (
                            <span className="text-muted text-danger">
                              {errors.complement.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="about">Informações adicionais</label>
                          <textarea
                            id="about"
                            disabled={disable}
                            className="form-control textarea"
                            {...register("about")}
                          ></textarea>
                          {errors.about && (
                            <span className="text-muted text-danger">
                              {errors.about.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="update ml-auto mr-auto">
                        <button
                          data-testid="button-update-gym"
                          type="submit"
                          className="btn btn-primary btn-round"
                        >
                          {gym ? "Atualizar" : "Cadastrar"}
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
    </div>
  );
};

export const SearchCEP = (value: string) => {
  const cep = value.replace(/\D/g, "");
  const validacep = /^[0-9]{8}$/;

  if (cep !== "") {
    if (validacep.test(cep)) {
      const response = axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response;
    } else {
      return null;
    }
  }
};

export default Profile;
