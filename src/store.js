// Cambiamos el objeto por una función que retorna el objeto
export const initialStore = () => {
    return {
        contacts: []
    };
};

export default function storeReducer(store, action) {
    switch (action.type) {
        case "LOAD_CONTACTS":
            return {
                ...store,
                contacts: action.payload
            };
        default:
            return store;
    }
}

// --- El resto de tus acciones se quedan exactamente igual abajo ---
const SLUG = "mi-agenda-unica"; // No olvides tener aquí tu slug personalizado
const API_URL = `https://playground.4geeks.com/contact/agendas/${SLUG}`;

export const actions = {
    getContacts: async (dispatch) => {
        try {
            const response = await fetch(`${API_URL}/contacts`);
            if (response.status === 404) {
                await actions.createAgenda(dispatch);
                return;
            }
            const data = await response.json();
            dispatch({ type: "LOAD_CONTACTS", payload: data.contacts });
        } catch (error) {
            console.error("Error cargando contactos:", error);
        }
    },

    createAgenda: async (dispatch) => {
        try {
            const response = await fetch(API_URL, { method: "POST" });
            if (response.ok) {
                await actions.getContacts(dispatch);
            }
        } catch (error) {
            console.error("Error creando la agenda:", error);
        }
    },

    addContact: async (dispatch, contactData) => {
        try {
            const response = await fetch(`${API_URL}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            });
            if (response.ok) {
                await actions.getContacts(dispatch);
                return true;
            }
        } catch (error) {
            console.error("Error agregando contacto:", error);
        }
        return false;
    },

    updateContact: async (dispatch, id, updatedData) => {
        try {
            const response = await fetch(`${API_URL}/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                await actions.getContacts(dispatch);
                return true;
            }
        } catch (error) {
            console.error("Error actualizando contacto:", error);
        }
        return false;
    },

    deleteContact: async (dispatch, id) => {
        try {
            const response = await fetch(`${API_URL}/contacts/${id}`, { method: "DELETE" });
            if (response.ok) {
                await actions.getContacts(dispatch);
                return true;
            }
        } catch (error) {
            console.error("Error eliminando contacto:", error);
        }
        return false;
    }
};