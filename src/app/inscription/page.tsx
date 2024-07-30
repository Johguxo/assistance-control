import Image from "next/image";

export default function Inscription() {
 
  return (
    <div className="Container2">
      <h2 color="black">Formulario</h2>
      <form>
        <div className="Form">
          <label> Nombre </label>
          <input type="text" name=""></input>
        </div>
        <div className="Form1">
          <label htmlFor="Apellido"> Apellidos </label>
          <input type="text" name=""></input>
        </div>
        <div className="Form1">
          <label> Edad </label>
          <input type="text" name=""></input>
        </div>
        <div className="Form1">
          <label> DNI</label>
          <input type="text" name=""></input>
        </div>
        <div className="Form1">
          <label> N° de Celular (whatsApp)</label>
          <input type="text" name=""></input>
        </div>
        <div className="Form1">
          <label> Fecha de nacimiento </label>
          <input type="date" name=""></input>
        </div>
        <div className="Form1">
          <label> ¿Perteneces a alguna institución?</label>
          <select>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="Form1">
          <label> Indica la insitución que perteneces: </label>
          <select>
            <option value="1">Colegio</option>
            <option value="2">Parroquia</option>
            <option value="3">Congregación</option>
          </select>
        </div>

      </form>
    </div>
  );
}