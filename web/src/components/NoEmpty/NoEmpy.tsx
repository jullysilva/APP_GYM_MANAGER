import React from "react";
import NoData from "../../assets/no-data.png";

interface NoEmptyProps {
  text: string;
}

const NoEmpty: React.FC<NoEmptyProps> = ({ text }) => {
  return (
    <div className="card align-items-center p-2">
      <img className="h-25 w-25" src={NoData} alt="Sem dados" />
      <p className="font-weight-bold h5">{text ? text : "Sem dados."}</p>
    </div>
  );
};

export default NoEmpty;
