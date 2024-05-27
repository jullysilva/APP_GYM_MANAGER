import React from "react";
import { ICategory } from "../../Utils/Interfaces/Interface";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  title: string;
  data: ICategory[];
  register: UseFormRegisterReturn;
}

const Select: React.FC<SelectProps> = ({ title, data, register }) => {
  return (
    <div className="form-group">
      <label className="col-form-label">{title}</label>
      <select className="form-control" {...register}>
        {data.map((option: any, index: number) => (
          <option key={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
