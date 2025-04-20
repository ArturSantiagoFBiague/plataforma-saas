import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/users';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', role: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById(id);
      setUserData(data);
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, userData);
    navigate('/admin/dashboard');
  };

  return (
    <div>
      <h1>Editar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Telefone"
        />
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
        >
          <option value="USER">Usuário</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditUserPage;
