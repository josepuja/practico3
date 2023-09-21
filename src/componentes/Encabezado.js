import React from 'react';

function Encabezado() {
  return (
    <div>
      <h1>Juego de Piedra, Papel, Tijera</h1>
      <div className="seleccion-jugador">
        <label htmlFor="nombre-jugador">Ingresa tu nombre:</label>
        <input type="text" id="nombre-jugador" />
      </div>
    </div>
  );
}

export default Encabezado;
