import React, {useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {     
      setRepositories(response.data);
    })

  }, []);


  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
            title: `Novo projeto ${Date.now()}`,
            owner: "Rodolpho Fernandes"
        });

    const repositorie = response.data;

    //console.log(...repositories);

    setRepositories([...repositories, repositorie]);
    
  }

  async function handleRemoveRepository(id) {

    console.log(repositories);
    
    const response = await api.delete(`repositories/${id}`);
    const { status } = response;
    
    if(status == 204){
      const result = repositories.filter(repo => repo.id !== id);

      
      setRepositories([...result]);
    }
  }

  return (
    <div>

      
      <ul data-testid="repository-list">
      { repositories.map(repositorie => 
        <li key={repositorie.id}>{repositorie.title}
        <button onClick={() => handleRemoveRepository(repositorie.id)}>
          Remover
        </button>
        </li>
      ) }
      
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
