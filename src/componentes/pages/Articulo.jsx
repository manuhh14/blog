import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { Listado } from './Listado'
import { useParams } from 'react-router-dom'

export const Articulo = () => {

  const [articulo, setArticulo] = useState({})
  const [cargando, setCargando] = useState(true)
  const params = useParams()

  useEffect(() => {

    conseguirArticulo()

  }, [])

  const conseguirArticulo = async () => {

    const { datos, cargando } = await Peticion(Global.url + "aticulo/" + params.id, "GET")

    if (datos.status === "OK") {
      setArticulo(datos.articulo)
    }

    setCargando(false)
    console.log(articulo)
  }

  return (
    <div className='jumbo'>
      {cargando ? "Cargando....." :
        (
          <>
            <div className='mascara'>
              {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
              {articulo.imagen == "default.png" && <img src='https://i.pinimg.com/564x/55/01/76/550176f8e2017e7199bc98cf1261c558.jpg' />}
            </div>

            <div className='jumbo'>

              <h1>{articulo.titulo}</h1>
              <span>{articulo.fecha}</span>
              <p>{articulo.contenido}</p>
            
            </div>
          </>
        )
      }
    </div>
  );
}
