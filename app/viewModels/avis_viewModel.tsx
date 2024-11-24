import { useState, useEffect } from 'react';
import { Avis } from '../models/avis.model';

const useAvisViewModel = () => {
    const [avis, setAvis] = useState<Avis[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvis = async () => {
            try {
                // const response = await fetch('/api/avis');
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data: Avis[] = await response.json();

                // Données d'exemple
                const data: Avis[] = [
                    {
                        id_avis: '1',
                        id_user: 'user1',
                        id_emplacement: '1',
                        note: 5,
                        commentaire: 'Excellent emplacement!',
                        date_avis: '2023-10-01',
                    },
                    {
                        id_avis: '2',
                        id_user: 'user2',
                        id_emplacement: '2',
                        note: 4,
                        commentaire: 'Très bon emplacement, mais un peu bruyant.',
                        date_avis: '2023-11-01',
                    },
                ];

                setAvis(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchAvis();
    }, []);

    const addAvis = (newAvis: Avis) => {
        setAvis([...avis, newAvis]);
    };

    const updateAvis = (id_avis: string, updatedAvis: Partial<Avis>) => {
        setAvis(avis.map(a => 
            a.id_avis === id_avis ? { ...a, ...updatedAvis } : a
        ));
    };

    const deleteAvis = (id_avis: string) => {
        setAvis(avis.filter(a => a.id_avis !== id_avis));
    };

    const getAvisById = (id_avis: string) => {
        return avis.find(a => a.id_avis === id_avis) || null;
    };

    const getAvisByUserId = (id_user: string) => {
        return avis.filter(a => a.id_user === id_user);
    };

    const getAvisByEmplacementId = (id_emplacement: string) => {
        return avis.filter(a => a.id_emplacement === id_emplacement);
    };

    return {
        avis,
        loading,
        error,
        addAvis,
        updateAvis,
        deleteAvis,
        getAvisById,
        getAvisByUserId,
        getAvisByEmplacementId
    };
};

export default useAvisViewModel;