import React, {useState} from 'react';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.png';

import { useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default function Logon (){
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        try{
            if(email === '' || password === ''){
                alert('Preencha todos os campos!');
            }else{
                const body = {
                    email,
                    password
                }
                const response = await api.post('/api/auth/login', body);

                localStorage.setItem('ongId', response.data.ongId);
                localStorage.setItem('ongName', response.data.ongName);
                localStorage.setItem('token', response.data.access_token)

                if(response.status === 200){
                    history.push('/profile');
                }else{
                    alert('E-mail ou senha estão incorretos, tente novamente!');
                }
            }
        }catch(ex){
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img 
                    src={logoImg} 
                    alt="Seja o Heroi"
                    width="353" 
                    height="140"
                />
                <form onSubmit={handleLogin}>
                    <h1>Acessar sua conta</h1>
                    <input 
                        placeholder="e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
            <img 
                src={heroesImg} 
                alt="Heroes"
            />
        </div>
    )
}