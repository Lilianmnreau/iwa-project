import { Emplacement } from "../models/emplacement_model";

export default function useEmplacementFavoriteViewModel(){
    
    const addEmplacementFavorite = (emplacement : Emplacement , userId : string) => {
        // Ajouter un emplacement aux favoris
        console.log("Emplacement ajouter en favoris")
    }

    const removeEmplacementFavorite =  (emplacement : Emplacement , userId : string) => {
        console.log("Emplacement retirer des favoris")
    }

    const getAllEmplacementFavorite = (userId : string) => {
    }

    const isEmplacementFavorite = (emplacement : Emplacement , userId : string) => {
        return false
    }


    
    return {
        addEmplacementFavorite,
        removeEmplacementFavorite,
        getAllEmplacementFavorite,
        isEmplacementFavorite,
    };
}