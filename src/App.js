import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const date = Date.now();
    const res = await api.post('repositories', {
      "title": `Título ${date}`,
      "url": `https://github.com/${date}`,
      "techs": [`React Native ${date}`, `Node.js ${date}`]
    });

    const repositorie = res.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if(repositorieIndex < 0) {
      alert('Repositório não encontrado!');
      return;
    }

    const { status } = await api.delete(`repositories/${id}`);

    if(status !== 204) {
      alert('Não foi possível excluir o repositório!');
      return;
    }
    
    repositories.splice(repositorieIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>  (
        <li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
