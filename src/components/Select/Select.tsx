import React from "react";
import { ICategory } from "../../Utils/Interfaces/Interface";
import { UseFormRegisterReturn } from "react-hook-form";
import { Category } from "mocks";

interface SelectProps {
  title: string;
  data?: ICategory[] | any;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  valueSelected?: string;
}

const Select: React.FC<SelectProps> = ({
  title,
  data = Category,
  register,
  disabled,
  valueSelected,
}) => {
  return (
    <div className="form-group">
      <label htmlFor="select-option" className="col-form-label">
        {title}
      </label>
      <select
        id="select-option"
        className="form-control"
        {...register}
        disabled={disabled}
        defaultValue={valueSelected}
      >
        {data?.map((option: any, index: number) => (
          <option key={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
