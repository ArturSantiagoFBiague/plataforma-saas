import { useState } from 'react';

const EditUserModal = ({ user, onClose, onSave }) => {
    const [userData, setUserData] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(userData); // Chamada para salvar as alterações
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Editar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="border p-2 mb-4 w-full"
                        placeholder="Nome"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="border p-2 mb-4 w-full"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="border p-2 mb-4 w-full"
                        placeholder="Telefone"
                    />
                    <select
                        name="role"
                        value={userData.role}
                        onChange={handleInputChange}
                        className="border p-2 mb-4 w-full"
                    >
                        <option value="USER">Usuário</option>
                        <option value="ADMIN">Administrador</option>
                    </select>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white p-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
