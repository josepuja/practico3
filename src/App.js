import React, { useState } from 'react';
import './App.css';
import Encabezado from './componentes/Encabezado';
import Juego from './componentes/Juego';
import Resultado from './componentes/Resultado';
import Marcador from './componentes/Marcador';

function App() {
  const [puntajeJugador, setPuntajeJugador] = useState(0);
  const [puntajeComputadora, setPuntajeComputadora] = useState(0);
  const [resultado, setResultado] = useState('');
  const [nombreJugador, setNombreJugador] = useState('');
  const [, setEleccionJugador] = useState('');

  // Arreglo de opciones del juego
  const opciones = ["piedra", "papel", "tijeras"];

  // Función para jugar una ronda
  const jugarRonda = (eleccionJugador) => {
    // Validar el nombre del jugador
    const nombreJugador = setNombreJugador();
    if (nombreJugador === "") {
      alert("Por favor, ingresa tu nombre.");
      return;
    }

    // Verificar si el juego aún no ha terminado
    if (puntajeJugador < 3 && puntajeComputadora < 3) {
     
      const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];

      mostrarSeleccion(setEleccionJugador); // Mostrar la selección del jugador

      setTimeout(() => {
        mostrarSeleccionAleatoria(eleccionComputadora); // Mostrar la selección aleatoria de la computadora
        const resultado = determinarGanador(eleccionJugador, eleccionComputadora);
        actualizarMarcador(resultado);
        mostrarResultado(resultado, nombreJugador, eleccionJugador, eleccionComputadora);

        // Verificar si alguien ha ganado
        if (puntajeJugador === 3 || puntajeComputadora === 3) {
          finalizarJuego();
        }
      }, 1000); // Retardo para simular la elección de la computadora
    }
  };

  // Función para mostrar la selección del jugador y aplicar efectos visuales
  
    const [seleccionada, setSeleccionada] = useState(null);

  const mostrarSeleccion = (indice) => {
    setSeleccionada(indice);
  
  return (
    <div>
      {opciones.map((opcion, indice) => (
        <button
          key={indice}
          className={`opcion ${indice === seleccionada ? 'seleccionada' : ''}`}
          onClick={() => mostrarSeleccion(indice)}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}


  // Función para mostrar la selección aleatoria de la computadora
    const [seleccionAleatoria, setSeleccionAleatoria] = useState(null);  
    const mostrarSeleccionAleatoria = () => {
      const indiceAleatorio = Math.floor(Math.random() * opciones.length);
      setSeleccionAleatoria(indiceAleatorio);
    
  
    return (
      <div>
        {opciones.map((opcion, indice) => (
          <button
            key={indice}
            className={`opcion ${indice === seleccionAleatoria ? 'seleccionada' : ''}`}
            onClick={() => mostrarSeleccionAleatoria()}
          >
            {opcion}
          </button>
        ))}
        <button onClick={mostrarSeleccionAleatoria}>Seleccionar Aleatoriamente</button>
      </div>
    );
  };

  // Función para determinar al ganador de una ronda
  const determinarGanador = (eleccionJugador, eleccionComputadora) => {
    if (eleccionJugador === eleccionComputadora) {
      return "Empate";
    } else if (
      (eleccionJugador === "piedra" && eleccionComputadora === "tijeras") ||
      (eleccionJugador === "papel" && eleccionComputadora === "piedra") ||
      (eleccionJugador === "tijeras" && eleccionComputadora === "papel")
    ) {
      setPuntajeJugador(puntajeJugador + 1); // El jugador gana la ronda
      return "¡Ganaste!";
    } else {
      setPuntajeComputadora(puntajeComputadora + 1); // La computadora gana la ronda
      return "¡Perdiste!";
    }
  };

  // Función para actualizar el marcador
  
    const actualizarMarcador = (resultado) => {
      // Actualizar el estado del puntaje del jugador y la computadora
      if (resultado === "¡Ganaste!") {
        setPuntajeJugador(puntajeJugador + 1);
      } else if (resultado === "¡Perdiste!") {
        setPuntajeComputadora(puntajeComputadora + 1);
      }
    
    // El puntaje se actualiza directamente en las funciones de determinarGanador
  };

  // Función para mostrar el resultado de una ronda
  const mostrarResultado = (resultado, nombreJugador, eleccionJugador, eleccionComputadora) => {
    setResultado(`${nombreJugador}: ${eleccionJugador} vs PC: ${eleccionComputadora} - ${resultado}`);
  };

  // Función para finalizar el juego
  function finalizarJuego() {
    // Deshabilitar los botones para detener el juego
    const botonesOpciones = document.querySelectorAll(".opcion");
    botonesOpciones.forEach(boton => {
      boton.removeEventListener("click", jugarRonda);
      boton.disabled = true;
    });

    let mensajeGanador = "";
    if (puntajeJugador === 3) {
      mensajeGanador = `${nombreJugador} ha ganado el juego!`;
    } else if (puntajeComputadora === 3) {
      mensajeGanador = `La computadora ha ganado el juego!`;
    } else {
      mensajeGanador = `El juego ha terminado en empate.`;
    }

    setResultado(mensajeGanador);
  };

  // Función para reiniciar el juego
  const reiniciarJuego = () => {
    // Habilitar los botones y restablecer marcadores
    const botonesOpciones = document.querySelectorAll(".opcion");
    botonesOpciones.forEach(boton => {
      boton.addEventListener("click", jugarRonda);
      boton.disabled = false;
    });

    setPuntajeJugador(0);
    setPuntajeComputadora(0);
    setResultado('');
  };

  return (
    <div className="App">
      <Encabezado />
      <Juego jugarRonda={jugarRonda} />
      <Resultado resultado={resultado} />
      <Marcador puntajeJugador={puntajeJugador} puntajeComputadora={puntajeComputadora} />
      <div className="ganador" id="ganador">
        {resultado}
      </div>
      <button id="reiniciar" className="reiniciar" onClick={reiniciarJuego}>Reiniciar Juego</button>
    </div>
  );
}

export default App;
