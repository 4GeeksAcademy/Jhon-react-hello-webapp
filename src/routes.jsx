import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";
import { Navbar } from "./components/Navbar"; // Opcional: cámbialo si tu Navbar está en otra ruta
import { Footer } from "./components/Footer"; // Opcional: cámbialo si tu Footer está en otra ruta

// Creamos un Layout interno rápido para no depender de archivos externos rotos
const RouteAppLayout = () => (
    <>
        {/* Aquí puedes renderizar componentes globales si la plantilla los tiene */}
        {/* <Navbar /> */}
        <div className="container-fluid m-0 p-0">
            <Outlet /> {/* Aquí se inyectarán tus vistas: Contact, AddContact, etc. */}
        </div>
        {/* <Footer /> */}
    </>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RouteAppLayout />, 
        children: [
            {
                path: "/",
                element: <Contact />,
            },
            {
                path: "/add",
                element: <AddContact />,
            },
            {
                path: "/edit/:id",
                element: <AddContact />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/demo",
                element: <Demo />,
            }
        ]
    },
    {
        path: "*",
        element: <h1 className="text-center my-5">Not found!</h1>
    }
]);