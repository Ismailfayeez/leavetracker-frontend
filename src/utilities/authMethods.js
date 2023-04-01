export const handleLogout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
