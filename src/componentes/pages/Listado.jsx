import React from 'react'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import {Link} from 'react-router-dom'

export const Listado = ({articulos, setArticulos}) => {


  const eliminar= async (id)=>{
   // alert(id);
    let {datos} = await Peticion(Global.url+"aticulo/"+id, "DELETE");
    //console.log(datos);

    if (datos.status === "OK") {
      let articulosActualizados = articulos.filter(articulo => articulo._id !== id)
      setArticulos(articulosActualizados);
    }
  }


  return (
    articulos.map(articulo => {
        return (
            <article key={articulo._id} className="articulo-item">
                <div className='mascara'>
                   {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                   {articulo.imagen == "default.png"  && <img src='https://i.pinimg.com/564x/55/01/76/550176f8e2017e7199bc98cf1261c558.jpg' />}
                </div>
                <div className='datos'>
                    <h3 className="title"><Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link></h3>
                    <p className="description">{articulo.contenido}</p>
                    <Link to={"/editar/"+articulo._id} className="edit">Editar</Link>
                    <button className="delete" onClick={()=>{
                      eliminar(articulo._id)
                    }}>Borrar</button>
                </div>
            </article>
        );
    })
  )
}
