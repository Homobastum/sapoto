// src/store/reducers/AuthentificationReducer.js

/**
 * Reducer pour gérer le jeton d'authentification et l'identifiant de l'utilisateur connecté
 * 
 * @deprecated
 */
class AuthInfoReducer {
	initialState = { 
        token: '', 
		userId: '',
		userName: '' 
    };
    
    constructor () {}

    authInfo (state = this.initialState, action: any) {
        let nextState;

        switch (action.type) {
            case 'setInfo':
                nextState = {
                    ...action.value
                };

                return nextState || state;

            case 'deleteInfo':
                nextState = {
					...this.initialState,
                };
                
                return nextState || state;

            default:
                return state;
	    }    
    }
}

const initialState = {
	token: '',
	userId: '',
	userName: ''
};

/**
 * Reducer pour gérer le jeton d'authentification et l'identifiant de l'utilisateur connecté
 * 
 * @param state State par défaut
 * @param action Tableau contenant l'action à réaliser et la valeur pour le nouveau state
 * 
 * @returns { Object } Retourne le nouveau state ou le state par défaut
 */
function authInfo(state = initialState, action: any) {
	let nextState;

	switch (action.type) {
		case "setInfo":
			nextState = {
				...action.value,
			};

			return nextState || state;

		case "deleteInfo":
			nextState = {
				...initialState,
			};

			return nextState || state;

		default:
			return state;
	}
}

// const authInfo = new AuthInfoReducer().authInfo;
export default authInfo;