import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiSearch, FiUserPlus } from 'react-icons/fi';
import ContactList from '../../components/contact-list';
import api from '../../services/api';
import './styles.scss';
import logoImage from '../../assets/logo.png';

let letters = "abcdefghijklmnopqrstuvwxyz";
letters = letters.split("");

export default function Contacts() {

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");
  const [alphabet, setAlphabet] = useState("");

  const nomeUsuario = localStorage.getItem('name');
  const username = localStorage.getItem('user');

  const history = useHistory();

  useEffect(() => {
    api.get('contacts', {
      headers: {
        Authorization: username,
      }
    }).then(response => setContacts(response.data.contact))
  }, [username]);

  function onAlphabetClick(letter) {
    setAlphabet(letter);
  }

  function limpar() {
    setSearch("");
    setAlphabet("");
  }

  function update(){
    api.get('contacts', {
      headers: {
        Authorization: username,
      }
    }).then(response => setContacts(response.data.contact))
  }

  async function handleDeleteContact(id){
    try{
      await api.delete(`contacts/${id}`, {
        headers: {
          Authorization: username,
        }
      });
      update();
    }catch(err){
      alert('Erro ao deletar o contato, tente novamente!');
    }
  }
  
  function handleLogout(){
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="contact-container">
      <header>
        
        <img src={logoImage} className="logoImage" alt="konex" />
        <span className="welcome">Bem vindo, {nomeUsuario}</span>
        
        <Link className="button" to="/contacts/new">
          <FiUserPlus className="addMobile" site={18} color="#ffffff" />
          <span>Cadastrar novo contato</span>
        </Link>
        <button type="button">
          <FiPower onClick={handleLogout} size={18} color="#00BFA6" />
        </button>
      </header>

      <div className="info-container">
        <div className="titulo"><h1>Meus Contatos</h1></div>
        <form>
          <input placeholder="Buscar..." onChange={e => setSearch(e.target.value)} />
          <button className="button"><FiSearch size={20} /></button>
        </form>
      </div>

      <div className="filter-contacts">
        <button type="button" onClick={limpar}>
          <span className="desk">VER TODOS</span>
          <span className="mobile">*</span>
        </button>
        {letters.map(letter => (
          <button
            type="button"
            key={letter} 
            onClick={() => onAlphabetClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <ContactList list={contacts} search={search} alphabet={alphabet} deletarContato={handleDeleteContact} />

    </div>
  );

}