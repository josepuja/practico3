import React from 'react';
import img1 from '../componentes/img/papel.jpg'
import img2 from '../componentes/img/piedra.jpg'
import img3 from '../componentes/img/tijeras.jpg'

function Juego({ jugarRonda }) {
  // Función para manejar la selección del jugador
  const elegirOpcion = (opcion) => {
    jugarRonda(opcion);
    
  };

  return (
    <div className="opciones">
      <img className="opcion" id="piedra" src={img1} alt="Piedra" onClick={() => elegirOpcion('piedra')} />
      <img className="opcion" id="papel" src={img2} alt="Papel" onClick={() => elegirOpcion('papel')} />
      <img className="opcion" id="tijeras" src={img3} alt="Tijera" onClick={() => elegirOpcion('tijeras')} />
    </div>
  );
  
}

export default Juego;
