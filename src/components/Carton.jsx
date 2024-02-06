import React from "react";

const Carton = (props) => {
  const {fichas, jugador } = props;

  return (
    <div className="carton">
    <h3 className="nombre-jugador">{jugador}</h3>
    <div className="carton-numeros">
      {fichas.map((ficha) => (
        <span className={`ficha ${ficha}`}  key={`${jugador}-${ficha}`}>
          {ficha}
        </span>
      ))}
    </div></div>
  );
};

export default Carton;
