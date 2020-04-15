import React from 'react';
import { FiTrash2, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import Modali, { useModali } from 'modali';
import { useHistory } from 'react-router-dom';

export default function ContactCard({ contact, deleteContact }) {

  const history = useHistory();

  async function toggleAltera(item) {
    await toggleDetalheModal();
    history.push(`/contacts/${item}`)
  }

  const [detalheModal, toggleDetalheModal] = useModali({
    animated: true,
    closeButton: true,
    title: contact.name + ' ' + contact.lastname,
    //onHide: () => history.push(`/contacts/${contact._id}`),
    buttons: [
      <Modali.Button
        label="Fechar"
        isStyleCancel
        onClick={() => toggleDetalheModal()}
      />,
      <Modali.Button
        label="Alterar"
        isStyleDefault
        onClick={() => toggleAltera(contact._id)}
      />
    ],
  });

  return (
    <li key={contact.id}>
      <p className="contact-name"><FiUser size={18} /> <span>{contact.name}</span></p>
      <p className="contact-phone"><FiPhone size={16} /> {contact.phones[0].phone}</p>
      <p className="contact-email"><FiMail size={14} /> {contact.emails[0].email}</p>
      <div className="btdelete">
        <button onClick={() => deleteContact(contact._id)} type="button">
          <FiTrash2 size={20} />
        </button>
      </div>
      <button className="btdetalhe" type="button" onClick={toggleDetalheModal}>
        ver detalhes
      </button>
      <Modali.Modal {...detalheModal}>
        <div className="wrap-detalhes">
          <ul className="contact-phone">
            {contact.phones.map((phone, index) => (
              <li key={index}><FiPhone size={16} /> {phone.phone}</li>
            ))}
          </ul>
          <ul className="contact-email">
            {contact.emails.map((email, index) => (
              <li key={index}><FiMail size={14} /> {email.email}</li>
            ))}
          </ul>
          <h3>ENDEREÇOS</h3>
          <div className="contact-address">
            {contact.addresses.map((address, index) => (
              <ul key={index}>
                <li className="endereco">Rua/Av.: {address.address.street}, {address.address.number}</li>
                <li>Bairro: {address.address.district}</li>
                <li>CEP: {address.address.cep} - Cidade: {address.address.city}/{address.address.uf}</li>
              </ul>
            ))}
          </div>
        </div>
      </Modali.Modal>
    </li>
  )

}