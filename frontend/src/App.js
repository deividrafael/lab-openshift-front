import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Chatbot from './Chatbot';

const API_URL = process.env.REACT_APP_API_URL

function App() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Termo de pesquisa
  const [filterCriteria, setFilterCriteria] = useState('tag'); // Critério de filtro



  // Função para fazer login
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/login`, { username, password })
      .then(response => {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setError('');
      })
      .catch(() => {
        setError('Erro ao fazer login: Usuário ou senha incorretos');
      });
  };

  // Função para cadastrar um novo usuário
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    axios.post(`${API_URL}/api/register`, { username, password })
      .then(response => {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setError('');
        alert('Usuário cadastrado com sucesso!');
        setIsRegistering(false);
      })
      .catch(() => {
        setError('Erro ao cadastrar usuário.');
      });
  };

  // Função para buscar os dados após autenticação
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.get(`${API_URL}/api/data`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados: ', error);
        });
    }
  }, [token]);

  // Função para sair
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Filtragem dos dados
  const filteredData = data.filter(item => {
    if (!searchTerm) return true; // Se não houver termo de pesquisa, retorna todos os itens
    const value = item[filterCriteria]?.toString().toLowerCase();
    return value?.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      {!token ? (
        <>
          {!isRegistering ? (
            <form onSubmit={handleLogin}>
              <h1>CiMA</h1>
              {error && <p>{error}</p>}
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <p>Não tem uma conta? <button type="button" onClick={() => setIsRegistering(true)}>Cadastre-se</button></p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h1>Cadastro de Novo Usuário</h1>
              {error && <p>{error}</p>}
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirme a Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit">Cadastrar</button>
              <p>Já tem uma conta? <button type="button" onClick={() => setIsRegistering(false)}>Faça Login</button></p>
            </form>
          )}
        </>
      ) : (
        <div>
          <div className="navbar">
            <div className="filter-container">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}>
                <option value="sub">COI</option>
                <option value="equipamentos">Tag</option>
                <option value="descricao">Descrição</option>
                <option value="valor">Valor</option>
                <option value="unidade">Qualidade</option>
                <option value="qualidade">Unidade</option>
              </select>
            </div>
            <button id="logout" onClick={handleLogout}>Sair</button>
          </div>

          <h1>Dados da Tabela</h1>

          <div className="table-container">
            <table border="1">
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
                {filteredData.map((row, index) => (
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
           {/* Componente do chatbot */}
           <Chatbot />
        </div>
      )}
    </div>
  );
}

export default App;
