import React from "react";
import {Route,Routes,BrowserRouter,Navigate} from "react-router-dom"
import { Inicio } from "../componentes/pages/Inicio";
import { Crear } from "../componentes/pages/Crear";
import { Articulos } from "../componentes/pages/Articulos";
import { Nav } from "../componentes/layouts/Nav";
import { Header } from "../componentes/layouts/Header";
import { Sidebar } from "../componentes/layouts/Sidebar";
import { Footer } from "../componentes/layouts/Footer";
import { Buscar } from "../componentes/pages/Buscar";
import { Articulo } from "../componentes/pages/Articulo";
import { Editar } from "../componentes/pages/Editar";

export const Rutas=()=>{
    return(
        <BrowserRouter>
            {/*LAYOUTS */}
            <Header/>
            <Nav/>
            

            {/*Contenido central y rutas */}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/inicio" element={<Inicio/>}/>
                    <Route path="/articulos" element={<Articulos/>}/>
                    <Route path="/crear" element={<Crear/>}/>
                    <Route path="/buscar/:busqueda" element={<Buscar/>}/>
                    <Route path="/articulo/:id" element={<Articulo/>}/>
                    <Route path="/editar/:id" element={<Editar/>}/>

                    <Route path="*" element={
                        <div className="jumbo"> 
                            <h1>Error 404</h1>
                        </div>
                    }/>

                </Routes>
            </section>


            <Sidebar/>

            <Footer/>

        </BrowserRouter>
    )
}