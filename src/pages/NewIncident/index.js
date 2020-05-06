import React, {useState} from 'react';

import './styles.css';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident(){

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const token = localStorage.getItem('token');

    async function handleNewInstance(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
            ongId
        };
        try{
            if(title === '' || description === '' || value === ''){
                alert('Preencha todos os campos corretamente!');
            }else{
                await api.post(`incidents/${ongId}`, data, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

                history.push('/profile');
            }
        }catch(ex){
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewInstance}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Preencha o valor sem vírgulas, ex: 100"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}