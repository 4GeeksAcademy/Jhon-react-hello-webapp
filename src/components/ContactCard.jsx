import React from "react";
import { useNavigate } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
            <div className="d-flex align-items-center">
                <img 
                    src="https://picsum.photos/id/1025/100/100" 
                    alt="avatar" 
                    className="rounded-circle me-4"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                    <h5 className="mb-2 fw-bold">{contact.name}</h5>
                    <p className="mb-1 text-muted"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                    <p className="mb-1 text-muted"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                    <p className="mb-0 text-muted"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                </div>
            </div>
            <div>
                {/* Botón Editar */}
                <button className="btn text-secondary me-2" onClick={() => navigate(`/edit/${contact.id}`)}>
                    <i className="fas fa-pencil-alt fs-5"></i>
                </button>
                {/* Botón Eliminar */}
                <button className="btn text-danger" onClick={() => onDelete(contact.id)}>
                    <i className="fas fa-trash-alt fs-5"></i>
                </button>
            </div>
        </li>
    );
};