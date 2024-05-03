import { useNavigate } from 'react-router-dom';

export const isAuthenticated = (navigate) => {
  const token = localStorage.getItem('jwtToken');
  if (localStorage.getItem('jwtToken') == null || localStorage.getItem('jwtToken') == undefined) {
    navigate('/admin/login'); // Перенаправляем пользователя на страницу аутентификации
    return false; // Возвращаем false, чтобы явно указать, что пользователь не авторизован
  }
  return true; // Возвращаем true, если пользователь авторизован
};