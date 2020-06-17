import React, {useState} from 'react';

import './styles.css';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';

export default function NewIncident(){

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const token = localStorage.getItem('token');
    const [selectedFile, setSelectedFile] = useState();
     
    function handleImage(e){
        setSelectedFile(e.target.files[0])
    }
    async function handleNewInstance(e){
        e.preventDefault(); 
        try{
            if(title === '' || description === '' || value === ''){
                alert('Preencha todos os campos corretamente!');
            }else{
                
                const data = {
                    title,
                    description,
                    value,
                    ongId
                };

                console.log(data)
                const response = await api.post(`api/incidents/${ongId}`, data, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                let file = new FormData();
                file.append('file', selectedFile);
                
                await api.post(`api/uploadFile/${response.data}`,file, {
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
                    <img 
                        src={logoImg} 
                        alt="Seja o Heroi"
                        width="353" 
                        height="140"
                    />
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
                    <input 
                        type='file'
                        accept='image/*' 
                        onChange={handleImage}
                    /> 
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}