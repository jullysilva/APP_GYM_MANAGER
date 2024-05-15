import React, { useState } from "react";
import UploadImage from "./UploadImage";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Input,
  Row,
  Title,
  UpdateInfo,
} from "./Profile.styled";
import { theme } from "Utils/Styles/Theme";
import { InfoManagerGym } from "Utils/Schemas";
import { InfoManagerGymSchema } from "Utils/Schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se está em modo de edição

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoManagerGym>({
    resolver: zodResolver(InfoManagerGymSchema),
  });

  const onSubmitForm = (data: InfoManagerGym) => {
    console.log(data);
    setIsEditing(false); // Após submeter o formulário, desabilita a edição
  };

  return (
    <Box>
      <Title>
        <h3>Informação administrador</h3>
      </Title>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Card>
              <UploadImage />
              <Row>
                <p>Nome</p>
                <p>Bruno Cardoso Feitosa</p>
              </Row>
              <Row>
                <p>E-mail</p>
                <p>Brunocarf@gmail.com</p>
              </Row>
              <Divider />
              <Row>
                <p>Academia</p>
                <p>AgitoFit</p>
              </Row>
              <Row>
                <p>Código</p>
                <p>84852465</p>
              </Row>
            </Card>
          </div>
          <div className="col-9">
            <Card>
              <Title>
                <p>Academia</p>
                {!isEditing ? (
                  <FaEdit onClick={() => setIsEditing(!isEditing)} />
                ) : (
                  ""
                )}
              </Title>
              {/* <UpdateInfo onSubmit={handleSubmit(onSubmitForm)}>
                <Input
                  type="text"
                  value="academy"
                  placeholder="Nome da academia"
                  {...register("academy")}
                  disabled={!isEditing}
                />

                <Input
                  type="text"
                  placeholder="Código da academia"
                  {...register("code")}
                  disabled={!isEditing}
                />

                <Input type="text" placeholder="CEP" {...register("cep")} />

                <Input
                  type="text"
                  placeholder="Logradouro (Rua, Avenida, ...)"
                  {...register("logradouro")}
                  disabled={!isEditing}
                />

                <Input
                  type="text"
                  placeholder="Número"
                  {...register("numero")}
                  disabled={!isEditing}
                />

                <Input
                  type="text"
                  placeholder="Bairro"
                  {...register("bairro")}
                  disabled={!isEditing}
                />

                <Input
                  type="text"
                  placeholder="Cidade"
                  {...register("cidade")}
                  disabled={!isEditing}
                />

                <Input
                  type="text"
                  placeholder="Estado"
                  {...register("estado")}
                  disabled={!isEditing}
                />

                <Button
                  type="submit"
                  onSubmit={handleSubmit(onSubmitForm)}
                  disabled={!isEditing}
                  color={theme.color.gray_400}
                >
                  Salvar
                </Button>
              </UpdateInfo> */}
              <form className="row g-1">
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Nome"
                    className="form-control"
                    id="academy"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputRua"
                    placeholder="Rua"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Endereco"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">
                    City
                  </label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="col-md-4">
                  <label for="inputState" className="form-label">
                    State
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label for="inputZip" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col">Column</div>
          <div className="col">Column</div>
        </div>
      </div>
      <Container>
        <Card></Card>
      </Container>
    </Box>
  );
};

export default Profile;
