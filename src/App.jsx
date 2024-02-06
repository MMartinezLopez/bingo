import React from "react";
import ReactDOM from "react-dom/client";
import Balota from "./components/Balota";
import data from "./assets/data.json";
import Carton from "./components/Carton";

const root = ReactDOM.createRoot(document.getElementById("root"));
const numbers = data.balotas;
const cartones = data.cartones;

const App = () => {
  var sacadas = [];
  const numJugadores = prompt("Ingrese el numero de jugadores");
  var disponibles = Array.from(
    { length: cartones.length},
    (_, index) => index
  );
  const jugadores = [];
  console.log(disponibles);
  for (let i = 0; i < numJugadores; i++) {
    let index = Math.floor(Math.random() * (disponibles.length - 1));
    let name = prompt(`Ingrese el nombre del jugador #${i + 1}`);
    jugadores.push({ nombre: name, carton: cartones[disponibles[index]] });
    disponibles.splice(index, 1);
    console.log(jugadores);

    console.log(disponibles);
  }

  function getCarton(array) {
    let index = Math.floor(Math.random() * (cartones.length - 0 + 1));
    let carton = array[index];
    array.splice(index, 1);
    return carton;
  }

  function getBall() {
    let numero = Math.floor(Math.random() * 75) + 1;
    if (!sacadas.includes(numero)) {
      sacadas.push(numero);
      alert(`Has sacado el ${numero}`);
      console.log(sacadas);
      reveal(numero);
      marcar(numero);
    } else {
      try {
        getBall();
      } catch (e) {
        if (e instanceof RangeError) {
          alert("Ya debió haber un ganador");
        }
      }
    }
  }

  function reveal(id) {
    document.getElementById(id).classList.add("active");
  }

  function reset() {
    for (let balota of sacadas) {
      document.getElementById(balota).classList.remove("active");
      let fichas = document.getElementsByClassName(`${balota}`);
      for (let ficha of fichas) {
        ficha.classList.remove("tachada");
      }
    }

    sacadas = [];
  }

  function marcar(id) {
    let fichas = document.getElementsByClassName(`${id}`);
    if (fichas.length != 0) {
      for (let ficha of fichas) {
        ficha.classList.add("tachada");
      }
    } else {
      console.log("Nadie tiene este numero");
    }
  }

  return (
    <>
      <div className="balotas">
        {["B", "I", "N", "G", "O"].map((letter) => (
          <span className="title" key={letter}>
            {letter}
          </span>
        ))}
        {numbers.map((number) => (
          <Balota key={number} numero={number} />
        ))}
      </div>
      <div className="controls">
        <button onClick={getBall}>Nueva Balota</button>
        <button onClick={reset}>Nuevo Juego</button>
      </div>
      <div className="cartones">
        {jugadores.map((jugador) => (
          <Carton
            key={jugador.nombre}
            fichas={jugador.carton}
            jugador={jugador.nombre}
          />
        ))}
      </div>
    </>
  );
};

root.render(<App />);
