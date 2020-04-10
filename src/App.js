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
    const res = await api.post('repositories', {
      "title": `Desafio Conceitos ReactJS ${Date.now()}`,
      "url": `https://github.com/salomaocristiano/gostack11-desafio-conceitos-reactjs`,
      "techs": [`ReactJS`, `Node.js`]
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`);

    if(status !== 204) {
      alert('Não foi possível excluir o repositório!');
      return;
    }

    setRepositories(repositories.filter(repository => repository.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>  (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
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
