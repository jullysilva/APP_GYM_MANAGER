import React from "react";
import { ExerciseMock } from "mocks";
import Table from "components/Table/Table";
import { GridColDef } from "@mui/x-data-grid";

type Row = (typeof ExerciseMock)[number];

export const columnsExercise: GridColDef<Row>[] = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "name",
    headerName: "Exercício",
    headerClassName: "table-header",
    width: 150,
    editable: true,
  },
  {
    field: "category",
    type: "singleSelect",
    headerName: "Categoria",
    headerClassName: "table-header",
    width: 200,
    editable: true,
    valueOptions: ["Leg", "Triceps", "ABS", "Back", "Chest", "Shoulders"],
  },
  {
    field: "equipamento",
    headerName: "Equipamento",
    headerClassName: "table-header",
    width: 200,
    editable: true,
  },
  {
    field: "serie",
    headerName: "Série",
    headerClassName: "table-header",
    width: 150,
    editable: true,
  },
  {
    field: "nRepeticao",
    headerName: "Nº de Repetição",
    headerClassName: "table-header",
    width: 150,
    editable: true,
  },
  {
    field: "intervalo",
    headerName: "Tempo de intervalo",
    headerClassName: "table-header",
    width: 150,
    editable: true,
  },
];

const Exercise: React.FC = () => {
  return (
    <div className="container-fluid px-5 pt-2">
      <p className="fs-2 fw-semibold">Exercícios</p>
      <Table data={ExerciseMock} columns={columnsExercise} />
    </div>
  );
};

export default Exercise;
