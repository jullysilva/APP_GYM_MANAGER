import React from "react";
import { MemberMock } from "mocks";
import Table from "components/Table/Table";
import { GridColDef } from "@mui/x-data-grid";
import { Status } from "./Member.styled";

type Row = (typeof MemberMock)[number];

export const columnsMember: GridColDef<Row>[] = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "codigo",
    headerName: "Codigo",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "name",
    headerName: "Nome",
    headerClassName: "table-header",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: "table-header",
    width: 200,
    editable: true,
  },
  {
    field: "telephone",
    headerName: "Telefone",
    headerClassName: "table-header",
    width: 150,
    editable: true,
  },
  {
    field: "istrainer",
    type: "boolean",
    headerName: "Treinador",
    headerClassName: "table-header",
    width: 150,
    editable: true,
  },
  {
    field: "pagamento",
    type: "singleSelect",
    headerName: "Pagamento",
    headerClassName: "table-header",
    width: 150,
    editable: true,
    valueOptions: ["Atrasado", "Pendente", "Pago"],
    renderCell: (params) => {
      let color;
      switch (params.value) {
        case "Atrasado":
          color = "red";
          break;
        case "Pendente":
          color = "orange";
          break;
        case "Pago":
          color = "green";
          break;
        default:
          color = "inherit";
      }
      return <Status color={color}>{params.value}</Status>;
    },
  },
];

const Member: React.FC = () => {
  return (
    <div className="container-fluid px-5 pt-2">
      <p className="fs-2 fw-semibold">Alunos</p>
      <Table data={MemberMock} columns={columnsMember} />
    </div>
  );
};

export default Member;
