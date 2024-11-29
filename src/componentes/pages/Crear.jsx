import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState(false);
    const [error, setError] = useState(null);

    const guardarArticulo = async (e) => {
        e.preventDefault();

        // Recoger datos del formulario
        const nuevoArticulo = formulario;

        try {
            // Guardar artículo en el backend
            const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);
           console.log(datos)


            if (datos.status === "OK") {
                
                // Subir imagen si se ha seleccionado un archivo
                const fileInput = document.querySelector("#file");
                
                const formData = new FormData();
                formData.append('archivo0', fileInput.files[0]);
                
                const subida1 = await Peticion(Global.url+"subir-imagen/"+ datos.articulo._id, "POST", formData, true);
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
            <h1>Crear artículo</h1>
            <p>Formulario para crear un artículo</p>
          
            
            
            {/* cosas por corregir 
            {resultado ? <strong>Artículo guardado con éxito</strong> : null}
            {error ? <strong>Error: {error}</strong> : null} */}

            {/* Montar el formulario */}
            <form className='formulario' onSubmit={guardarArticulo}>
                <div className='form-group'>
                    <label htmlFor='titulo'>Título </label>
                    <input type='text' name='titulo' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='contenido'>Contenido </label>
                    <textarea type='text' name='contenido' onChange={cambiado} />
                </div>

                <div className='form-group'>
                    <label htmlFor='imagen'>Imagen </label>
                    <input type='file' name='archivo0' id='file' />
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    );
};
