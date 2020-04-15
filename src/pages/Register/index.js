import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useAlert } from 'react-alert'

import api from './../../services/api';

import './styles.scss';
import logoImage from '../../assets/logo.png';


export default function Register() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const alert = useAlert();

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      firstname,
      lastname,
      username,
      password
    };

    try {
      await api.post('register', data);
      function alertSuccess() {
        alert.success('Cadastro realizado com sucesso!', {
          onClose: () => {
            history.push('/');
          }
        });
      }
      alertSuccess();
    } catch (err) {
      alert.error('Erro no cadastro, tente novamente!');
    }


  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="konex" />
          <h1>
            Cadastro
            <Link className="back-link back-link-mobile" to="/">
              <FiArrowLeft size={16} color="#00BFA6" />
              Voltar para Logon
            </Link>
          </h1>
          <p>Faça seu cadastro, e começe a organizar os seus contatos!</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#00BFA6" />
            Voltar para Logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            placeholder="Nome"
            required
          />
          <input
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            placeholder="Sobrenome"
            required
          />
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Usuário"
            required
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
            required
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}