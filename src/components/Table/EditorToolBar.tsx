import { Button } from "@mui/material";
import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { generateRandomCode } from "Utils/Generic/Utils";
import React from "react";
import { FaPlus } from "react-icons/fa";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, nextId, setNextId } = props;

  const handleClick = () => {
    const id = nextId;
    const codigo = generateRandomCode();
    setRows((oldRows) => [
      ...oldRows,
      { id, codigo, name: "", email: "", telephone: "", isTrainer: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));

    setNextId(nextId + 1);
  };

  return (
    <div className="d-flex justify-content-between mb-1">
      <Button size="small" startIcon={<FaPlus />} onClick={handleClick}>
        Adicionar membro
      </Button>
      <GridToolbarQuickFilter
        quickFilterProps={{ placeholder: "Pesquisar..." }}
      />
    </div>
  );
}
