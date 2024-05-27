import React, { useState } from "react";
import UploadImage from "./UploadImage";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  InputLabel,
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
import { AcademiaMock } from "mocks";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [mockAcademia, setMockAcademia] = useState(AcademiaMock);

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
        <div className="row row-cols-auto">
          <div className="col-3">
            <Card>
              <UploadImage />
              <Row>
                <strong>Nome</strong>
                <p>Bruno Cardoso Feitosa</p>
              </Row>
              <Row>
                <strong>E-mail</strong>
                <p>Brunocarf@gmail.com</p>
              </Row>
              <Divider />
              <Row>
                <strong>Academia</strong>
                <p>AgitoFit</p>
              </Row>
              <Row>
                <strong>Código</strong>
                <p>84852465</p>
              </Row>
            </Card>
          </div>
          <div className="col-9">
            <Card>
              <Title>
                <h3>Academia</h3>
                {!isEditing ? (
                  <FaEdit
                    fill="#ffc60b"
                    cursor={"pointer"}
                    fontSize={25}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                ) : (
                  ""
                )}
              </Title>

              <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="col-3">
                  <InputLabel className="form-label mb-0">
                    Código da academia
                  </InputLabel>
                  <input
                    type="text"
                    value={mockAcademia.code}
                    placeholder="Código da academia"
                    className="form-control"
                    id="code"
                    {...register("code")}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-5">
                  <InputLabel className="form-label mb-0">
                    Nome da academia
                  </InputLabel>
                  <input
                    type="text"
                    value={mockAcademia.academy}
                    placeholder="Nome da academia"
                    className="form-control"
                    id="academy"
                    {...register("academy")}
                  />
                </div>
                <div className="col-4">
                  <InputLabel className="form-label mb-0">CEP</InputLabel>
                  <input
                    type="text"
                    value={mockAcademia.cep}
                    className="form-control"
                    id="cep"
                    placeholder="CEP"
                    {...register("cep")}
                  />
                </div>
                <div className="col-4">
                  <InputLabel className="form-label mb-0">
                    Logradouro
                  </InputLabel>
                  <input
                    type="text"
                    value={mockAcademia.logradouro}
                    className="form-control"
                    id="logradouro"
                    placeholder="Logradouro (Rua, Avenida, ...)"
                    {...register("logradouro")}
                  />
                </div>
                <div className="col-md-2">
                  <InputLabel className="form-label mb-0">Número</InputLabel>
                  <input
                    type="number"
                    value={mockAcademia.numero}
                    className="form-control"
                    id="number"
                    placeholder="Número"
                    {...register("numero")}
                  />
                </div>
                <div className="col-md-3">
                  <InputLabel className="form-label mb-0">Bairro</InputLabel>
                  <input
                    type="text"
                    value={mockAcademia.bairro}
                    onChange={(e) => {
                      mockAcademia.bairro = e.target.value;
                      setMockAcademia({ ...mockAcademia });
                    }}
                    className="form-control"
                    id="bairro"
                    placeholder="Bairro"
                  />
                </div>
                <div className="col-md-3">
                  <InputLabel className="form-label mb-0">Cidade</InputLabel>
                  <input
                    type="text"
                    value={mockAcademia.cidade}
                    className="form-control"
                    id="city"
                    placeholder="Cidade"
                    {...register("cidade")}
                  />
                </div>
                <div className="col-12">
                  <Button
                    type="submit"
                    className="w-25 float-end"
                    disabled={!isEditing}
                  >
                    Salvar
                  </Button>
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
