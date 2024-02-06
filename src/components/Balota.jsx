import React from "react";

function Balota(props) {
  const { numero } = props;
  return (
    <div className="balota" key={numero} id={numero}>
      {numero}
    </div>
  );
}

export default Balota;