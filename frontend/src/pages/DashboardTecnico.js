import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const DashboardTecnico = () => {
    const [estado, setEstado] = useState('Listo para registrar asistencia.');
    const [geolocalizacion, setGeolocalizacion] = useState(null);

    const obtenerGeolocalizacion = () => {
        setEstado('Obteniendo geolocalización...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocalizacion({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    setEstado('Geolocalización obtenida. Ahora puedes registrar tu asistencia.');
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
            setEstado('Primero obtén tu geolocalización.');
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
                foto_url: 'temporal_url'
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Dashboard del Técnico</h1>
            <p>{estado}</p>
            {!geolocalizacion && (
                <button onClick={obtenerGeolocalizacion}>
                    Obtener mi Geolocalización
                </button>
            )}
            {geolocalizacion && (
                <div>
                    <button onClick={() => registrarAsistencia('Entrada', 'Presencial')} style={{ margin: '10px' }}>
                        Registrar Entrada
                    </button>
                    <button onClick={() => registrarAsistencia('Salida', 'Presencial')} style={{ margin: '10px' }}>
                        Registrar Salida
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardTecnico;