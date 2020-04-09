import React, { useState, useEffect } from "react";
import api from "./services/api";




import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Novo Respositorio ${Date.now()}`,
      url: "https://github.com/xarlys",
      techs: ["ReactJS, NodeJS"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);   
  }

  async function handleRemoveRepository(id) {
    // TODO 
    const repositoriesIndex = repositories.findIndex(repository=> repository.id === id)

    await api.delete(`/repositories/${id}`);

    repositories.splice(repositoriesIndex, 1)

    setRepositories([...repositories]); 
  }

  return (
    <div>
      <h1>Desafio 03: Conceitos do ReactJS</h1>
      <br/>
      <div id="ul">
        
        <ul data-testid="repository-list">
          {repositories.map(repository => 
            <li key={repository.id}>
              {repository.title} 
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )}

        </ul>
        <br/>      
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>

      
    
    </div>
  );
}

export default App;
