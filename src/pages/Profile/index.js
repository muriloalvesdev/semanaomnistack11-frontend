import React, {useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logImg from  '../../assets/logo.png';
import api from '../../services/api';
import './styles.css';

export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const token = localStorage.getItem('token');
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get(`api/profile/${ongId}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }).then(response => {
            setIncidents(response.data.incidents);
        })
    }, [ongId, token]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/api/incidents/${id}/${ongId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(ex){
            alert('Erro ao tentar deletar caso, tente novamente.')
        }
    }

    async function handleLogout(){
        localStorage.clear();
        const data = {
            token
        }
        await api.post(`/api/user/token-expiration/`, data, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });
        
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logImg} alt="Seja o Heroi"/>
                <span>Bem vinda, {ongName}!</span>
                <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
                
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key = {incident.id}>
                        <p className="title">
                            {incident.title}
                        </p>

                        <div className="div-image-buton">
                            <img 
                                src={`data:${incident.mime_type};base64,${incident.file_data}`} 
                                width={170}
                                height={160}
                                alt="imagem do caso"
                            />
                        </div>

                        
                        <p className="description">
                            {incident.description}
                        </p>
                        <p className="money" color="#08000">
                            {Intl.NumberFormat('pt-BR', 
                                {style: 'currency', 
                                currency: 'BRL'}).format(incident.value)}
                        </p>
                        
                        <button 
                            onClick={() => handleDeleteIncident(incident.id)} 
                            type="button">
                                <FiTrash2 
                                    size={20} 
                                    color="#a8a8b3" 
                                />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}