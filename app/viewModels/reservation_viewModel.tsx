import { useState, useEffect } from "react";
import { Emplacement } from "../models/emplacement_model";

export type Reservation = {
  id_reservation: string;
  id_user: string;
  date_debut: string;
  date_fin: string;
  statut: string;
  message_voyageur: string;
  emplacement: Emplacement;
};

const useReservationViewModel = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // const response = await fetch('/api/reservations');
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // const data: Reservation[] = await response.json();

        // Example data
        const data: Reservation[] = [
          {
            id_reservation: "1",
            id_user: "user1",
            date_debut: "2023-10-01",
            date_fin: "2023-10-10",
            statut: "confirmed",
            message_voyageur: "Looking forward to the stay!",
            emplacement: {
              id_emplacement: "1",
              id_user: "user1",
              localisation: "Paris",
              caracteristique: "Spacieux et lumineux",
              equipement: ["WiFi", "Climatisation"],
              tarif: 100,
              disponible: true,
              moyenneAvis: 4.5,
              photos: ["https://example.com/photo1.jpg"],
              coordonnees: {
                latitude: 48.8566,
                longitude: 2.3522,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            },
          },
          {
            id_reservation: "2",
            id_user: "user2",
            date_debut: "2023-11-01",
            date_fin: "2023-11-10",
            statut: "pending",
            message_voyageur: "Please confirm my reservation.",
            emplacement: {
              id_emplacement: "2",
              id_user: "user2",
              localisation: "Lyon",
              caracteristique: "Confortable et bien situé",
              equipement: ["Parking", "Piscine"],
              tarif: 80,
              disponible: false,
              moyenneAvis: 4.0,
              photos: ["https://example.com/photo2.jpg"],
              coordonnees: {
                latitude: 45.764,
                longitude: 4.8357,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            },
          },
        ];

        setReservations(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const addReservation = (reservation: Reservation) => {
    setReservations([...reservations, reservation]);
  };

  const updateReservation = (
    id_reservation: string,
    updatedReservation: Partial<Reservation>
  ) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id_reservation === id_reservation
          ? { ...reservation, ...updatedReservation }
          : reservation
      )
    );
  };

  const deleteReservation = (id_reservation: string) => {
    setReservations(
      reservations.filter(
        (reservation) => reservation.id_reservation !== id_reservation
      )
    );
  };

  const getReservationsByUser = (id_user: string) => {
    return reservations.filter(
      (reservation) => reservation.id_user === id_user
    );
  };

  const getReservationById = (id_reservation: string) => {
    return (
      reservations.find(
        (reservation) => reservation.id_reservation === id_reservation
      ) || null
    );
  };

  return {
    reservations,
    loading,
    error,
    addReservation,
    updateReservation,
    deleteReservation,
    getReservationsByUser,
    getReservationById,
  };
};

export default useReservationViewModel;
