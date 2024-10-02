import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Faz a requisição para o backend
    axios.get('https://lab-openshift-app-deivid-rosariodrr-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados: ', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Dados da Tabela</h1>
      <table border="2">
        <thead>
          <tr>
            <th>COI</th>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Qualidade</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.sub}</td>
              <td>{row.equipamentos}</td>
              <td>{row.descricao}</td>
              <td>{row.valor}</td>
              <td>{row.unidade}</td>
              <td>{row.qualidade}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
