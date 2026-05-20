import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import { useNavigate, useParams, Link } from "react-router-dom";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); // Detecta si es edición por el ID en la URL

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Rellenar los campos si detectamos un ID (Modo Edición)
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
            if (contactToEdit) {
                setContact({
                    name: contactToEdit.name,
                    email: contactToEdit.email,
                    phone: contactToEdit.phone,
                    address: contactToEdit.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;

        if (id) {
            success = await actions.updateContact(dispatch, id, contact);
        } else {
            success = await actions.addContact(dispatch, contact);
        }

        if (success) navigate("/"); // Regresa a la lista principal
    };

    return (
        <div className="container my-5" style={{ maxWidth: "600px" }}>
            <h2 className="text-center fw-bold mb-4">{id ? "Update Contact" : "Add a new contact"}</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input 
                        type="text" className="form-control" placeholder="Full Name" required
                        value={contact.name} onChange={e => setContact({...contact, name: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input 
                        type="email" className="form-control" placeholder="Enter email" required
                        value={contact.email} onChange={e => setContact({...contact, email: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input 
                        type="text" className="form-control" placeholder="Enter phone" required
                        value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input 
                        type="text" className="form-control" placeholder="Enter address" required
                        value={contact.address} onChange={e => setContact({...contact, address: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">Save</button>
                <Link to="/" className="d-block text-center mt-3 text-decoration-none">or get back to contacts</Link>
            </form>
        </div>
    );
};