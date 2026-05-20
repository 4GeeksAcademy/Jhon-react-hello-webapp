import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();

    // Cargar contactos al montar la vista
    useEffect(() => {
        actions.getContacts(dispatch);
    }, []);

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
            actions.deleteContact(dispatch, id);
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: "800px" }}>
            <div className="d-flex justify-content-end mb-4">
                <Link to="/add" className="btn btn-success fw-semibold py-2 px-3">Add new contact</Link>
            </div>
            
            <div className="card shadow-sm">
                <ul className="list-group list-group-flush">
                    {store.contacts && store.contacts.length > 0 ? (
                        store.contacts.map((contact) => (
                            <ContactCard 
                                key={contact.id} 
                                contact={contact} 
                                onDelete={handleDelete} 
                            />
                        ))
                    ) : (
                        <div className="text-center p-5 text-muted">
                            <i className="fas fa-user-slash fs-1 mb-3"></i>
                            <p>No hay contactos en tu agenda todavía.</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};