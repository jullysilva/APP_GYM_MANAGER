import React, { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { generateRandomCode } from "Utils/Generic/Utils";

interface EditToolbarProps {
  rows: readonly GridValidRowModel[];
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, nextId, setNextId, rows } = props;

  const handleClick = () => {
    const id = nextId;
    const codigo = generateRandomCode();
    setRows((oldRows) => [...oldRows, { id, codigo, ...rows }]);
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

interface TableProps {
  data: readonly GridValidRowModel[];
  columns: GridColDef[];
  updatePath?: string;
  createPath?: string;
  deletePath?: string;
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [rows, setRows] = useState(data);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [nextId, setNextId] = useState(
    rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const column: GridColDef[] = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<MdSave />}
              label="Save"
              data-testid="save-icon"
              sx={{
                color: "#ffc60b",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<MdCancel />}
              label="Cancel"
              data-testid="cancel-icon"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<MdEdit />}
            label="Edit"
            data-testid="edit-icon"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<RiDeleteBin5Line />}
            data-testid={"delete-icon"}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="rounded mw-100 bg-white" style={{ height: "400px" }}>
      <DataGrid
        data-testId="table"
        className="p-3"
        rows={rows}
        columns={column.map((column) => ({
          ...column,
          filterable: true,
        }))}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        ignoreDiacritics
        autoPageSize
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            nextId,
            setNextId,
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
};

export default Table;
