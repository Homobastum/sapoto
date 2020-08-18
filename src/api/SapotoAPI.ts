import { API } from '../interfaces/API';

/**
 * Gérer les appels aux webservices pour l'application
 */
class SapotoAPI implements API {
    uri: String;

    constructor () {
        this.uri = 'http://192.168.1.20:2011/';
    }

    /**
     * Authentifier un utilisateur
     * 
     * @param utilisateur Informations de l'utilisateur susmentionné
     */
    signin (utilisateur: Object) {
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'localhost'
            },
            body: JSON.stringify(utilisateur)
        };

        return fetch(this.uri + 'users/signin', obj)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    /**
     * Récupérer la liste de tous les tickets
     * 
     * @param token Jeton d'authentification
     */
    getTickets (token: String) {
        const obj = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'localhost'
            }
        };

        return fetch(this.uri + 'tickets', obj)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    /**
     * Récupérer un ticket à partir de son identifiant unique
     * 
     * @param id Identifiant du ticket
     * @param token Jeton d'authentification
     */
    getTicketById (id: String, token: String) {
        const obj = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'localhost'
            }
        };

        return fetch(this.uri + 'tickets/' + id, obj)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    /**
     * Créer un ticket
     * 
     * @param ticket Informations du ticket susmentionné 
     * @param token Jeton d'authentification
     */
    creerTicket(ticket: Object, token: String) {
        const obj = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'localhost'
            },
            body: JSON.stringify(ticket)
        };

        return fetch(this.uri + 'tickets', obj)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    /**
     * Modifier un ticket
     * 
     * @param id Identifiant du ticket
     * @param ticket Informations du ticket susmentionné
     * @param token Jeton d'authentification
     */
    updateTicket(id: String, ticket: Object, token: String) {
        const obj = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'localhost'
            },
            body: JSON.stringify(ticket)
        };

        return fetch(this.uri + 'tickets/' + id, obj)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    /**
     * Supprimer un ticket
     * 
     * @param id Identifiant du ticket
     * @param token Jeton d'authentification
     */
    deleteTicketById(id: String, token: String) {
        const obj = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'localhost'
            }
        };

        return fetch(this.uri + 'tickets/' + id, obj)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }
}

const sapotoAPI = new SapotoAPI();
export default sapotoAPI;