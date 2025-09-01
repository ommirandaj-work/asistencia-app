import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const DashboardTecnico = () => {
    const [estado, setEstado] = useState('Listo para registrar asistencia.');
    const [geolocalizacion, setGeolocalizacion] = useState(null);

    const obtenerGeolocalizacion = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocalizacion({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    setEstado('Geolocalización obtenida.');
                },
                (error) => {
                    console.error(error);
                    setEstado('Error al obtener la geolocalización.');
                }
            );
        } else {
            setEstado('La geolocalización no es compatible con este navegador.');
        }
    };

    const registrarAsistencia = async (tipo, modalidad) => {
        if (!geolocalizacion) {
            setEstado('Obteniendo geolocalización...');
            obtenerGeolocalizacion();
            return;
        }

        const userData = JSON.parse(localStorage.getItem('user'));
        const tecnicoId = userData._id;

        try {
            const res = await axios.post(`${API_URL}/api/asistencia/registrar`, {
                tecnicoId,
                tipo,
                modalidad,
                geolocalizacion,
                foto_url: 'temporal_url' // Valor temporal
            });

            if (res.status === 201) {
                setEstado(`Asistencia de ${tipo} registrada con éxito.`);
            }
        } catch (error) {
            console.error(error);
            setEstado('Error al registrar la asistencia.');
        }
    };

    return (
        <div>
            <h1>Dashboard del Técnico</h1>
            <p>{estado}</p>
            <button onClick={() => registrarAsistencia('Entrada', 'Presencial')}>
                Registrar Entrada
            </button>
            <button onClick={() => registrarAsistencia('Salida', 'Presencial')}>
                Registrar Salida
            </button>
        </div>
    );
};

export default DashboardTecnico;