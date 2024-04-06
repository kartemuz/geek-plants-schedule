import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка наличия токена в localStorage при загрузке страницы
    const token = localStorage.getItem('token');
    if (token) {
      // Если токен существует, пользователь авторизован
      setAuthenticated(true);
    } else {
      // Если токен отсутствует, пользователь не авторизован
      setAuthenticated(false);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setErrorMessage('Авторизация успешна'+response.data.token);
      setToken(response.data.token);
      // Успешный вход
      console.log(response.data);
      // Дополнительные действия после успешной аутентификации
    } catch (error) {
      if (error.response.status === 401) {
        // Ошибка аутентификации
        setErrorMessage('Неправильное имя пользователя или пароль.');
      } else {
        // Другие ошибки
        console.error('Произошла ошибка:', error.message);
      }
    }
  };

  const handleProtected = async () => {
    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  return (
    <div>
      <div>{errorMessage}</div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {token && <button onClick={handleProtected}>Protected Route</button>}
    </div>
  );
}

export default App;