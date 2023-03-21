import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './Services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //cep/json

    if (input === '') {
      alert("Ops!! Preencha algum CEP.")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    } catch {
      alert("Ops, erro ao buscar!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>

      <div className='container-input'>
        <input type="text" placeholder='Digite seu CEP' value={input} onChange={(e) => setInput(e.target.value)}></input>

        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={20} color="#011627" /></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Endereço: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
