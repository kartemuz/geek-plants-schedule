export const isAuthenticated = (history) => {
    const token = localStorage.getItem('jwtToken');
    const isAuthenticated = !!token;
    if (!isAuthenticated) {
      document.location.href = '/admin/login/'; // Перенаправляем пользователя на страницу аутентификации
    }
    return isAuthenticated;
  };