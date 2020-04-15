import api from '../services/api';

const username = localStorage.getItem('user');

module.exports = {
  async handleDeleteContact(id){
    try{
      await api.delete(`contacts/${id}`, {
        headers: {
          Authorization: username,
        }
      });
    }catch(err){
      alert('Erro ao deletar o contato, tente novamente!');
    }
  }
}