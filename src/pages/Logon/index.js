import React, {useState} from 'react';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import { useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default function Logon (){
    const history = useHistory();
    const [id, setId] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        try{
            if(id === ''){
                alert('Informe seu CNPJ');
            }else{
                const response = await api.get('ongs/' + id);
                
               
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name);
                history.push('/profile');
            }
        }catch(ex){
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Seu CNPJ"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}