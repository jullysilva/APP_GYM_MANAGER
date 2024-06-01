import * as React from "react";
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/useAutocomplete";
import { MdOutlineClose } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { FaCheck } from "react-icons/fa";
import { GridValidRowModel } from "@mui/x-data-grid";
import { Root, Label, InputWrapper, Listbox } from "./SelectSearch.styled";

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <MdOutlineClose role="button" onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

interface SelectSearchProps {
  title: string;
  options: readonly GridValidRowModel[];
  setData?: ([]) => void;
}

const SelectSearch: React.FC<SelectSearchProps> = ({
  title,
  options,
  setData,
}) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [],
    multiple: true,
    options: options,
    getOptionLabel: (option) => option.name,
  });

  React.useEffect(() => {
    setData(value);
  }, [value, setData]);

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{title}</Label>
        <InputWrapper
          ref={setAnchorEl}
          className={focused ? "focused w-100" : "w-100"}
        >
          {value.map((option: any, index: number) => (
            <StyledTag label={option.name} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.name}</span>
              <FaCheck fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

export default SelectSearch;
