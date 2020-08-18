import React from "react";

/**
 * Naviguer d'un écran à l'autre sans utiliser la prop navigation
 */
class RootNavigation {
    navigationRef: any;

    constructor () {
        this.navigationRef = React.createRef();
    }

    /**
     * Rediriger vers l'écran de son choix 
     * 
     * @param name Nom de l'écran susmentionné
     * @param params Paramètres de l'écran susmentionné
     * 
     * @returns { void }
     */
    navigate(name: String, params: any = null) {
        this.navigationRef.current?.navigate(name, params);
    }

    /**
     * Rediriger vers l'écran de son choix en effaçant l'historique de navigation
     * 
     * @param name Nom de l'écran susmentionné
     * @param params Paramètres de l'écran susmentionné
     * 
     * @returns { void }
     */
    reset(name: String, params: any = null) {
        this.navigationRef.current?.reset({
            index: 0,
            routes: [{ name: name, params}],
        });
    }

    /**
     * Récupérer le nom de l'écran courant
     * 
     * @returns { String } Nom de l'écran courant
     */
    getCurrentRoute () {
        return this.navigationRef.current?.getCurrentRoute().name;
    }
}

const rootNavigation = new RootNavigation();
export default rootNavigation;