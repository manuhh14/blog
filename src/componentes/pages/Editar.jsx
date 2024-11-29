import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useParams } from 'react-router-dom'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState(false);
  const [articulo, setArticulo] = useState({});
  const params = useParams()

  const [error, setError] = useState(null);



  useEffect(() => {

    conseguirArticulo()

  }, [])



  const conseguirArticulo = async () => {

    const { datos, cargando } = await Peticion(Global.url + "aticulo/" + params.id, "GET")

    if (datos.status === "OK") {
      setArticulo(datos.articulo)
    }

    console.log(articulo)
  }




  const editarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    const nuevoArticulo = formulario;

    try {
      // Guardar artículo en el backend
      const { datos } = await Peticion(Global.url + "articulo/"+params.id, "PUT", nuevoArticulo);
      console.log(datos)


      if (datos.status === "OK") {

        // Subir imagen si se ha seleccionado un archivo
        const fileInput = document.querySelector("#file");

        const formData = new FormData();
        formData.append('archivo0', fileInput.files[0]);

        const subida1 = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);
        //const subida = await Peticion("http://localhost:3900/api/subir-imagen/"+datos.articulo._id, "POST", formData, true);
        console.log(subida1.datos)

        setResultado(true);
        alert("Datos subidos correctamente")
      } else {
        setResultado(false);
        alert("Error al guardar el artículo");
      }
    } catch (error) {

      setError("Hubo un error al guardar el artículo.");
      setResultado(false);
      alert("Error al guardar el artículo");
    }
  };



  return (
    <div className='jumbo'>
      <h1>Editar articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>



      {/* cosas por corregir 
            {resultado ? <strong>Artículo guardado con éxito</strong> : null}
            {error ? <strong>Error: {error}</strong> : null} */}

      {/* Montar el formulario */}
      <form className='formulario' onSubmit={editarArticulo}>
        <div className='form-group'>
          <label htmlFor='titulo'>Título </label>
          <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido </label>
          <textarea type='text' name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className='form-group'>
          <label htmlFor='imagen'>Imagen </label>

          <div className='mascara'>
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "default.png" && <img src='https://i.pinimg.com/564x/55/01/76/550176f8e2017e7199bc98cf1261c558.jpg' />}
          </div>

          <input type='file' name='archivo0' id='file' />
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />
      </form>
    </div>
  );
};
