import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import './styles.scss';
import konexImage from '../../assets/imgLogin.png';
import logoImage from '../../assets/logo.png';

import api from './../../services/api';

import { useAlert } from 'react-alert'

export default function Logon(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const history = useHistory();

  localStorage.clear();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('login', {username, password});

      console.log(response.data);

      localStorage.setItem('user', username);
      localStorage.setItem('name', response.data);

      history.push('/contacts');

    } catch(err){
      alert.error('Erro no login, tente novamente!');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="konex"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Usuário"
          />
          <input 
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#00BFA6" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={konexImage} className="konexImage" alt="konex"/>
    </div>
  )
}