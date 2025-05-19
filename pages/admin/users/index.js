import React, { useState, useEffect } from "react";
import Layout from "../layout";
import axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",  // Campo nuevo para el nombre de usuario
    first_name: "",
    last_name: "",
    document_number: "",
    phone_number: "",
    password: "",
    password2: "",
  });
  const [editingRow, setEditingRow] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "", // Campo nuevo para el nombre de usuario en edición
    first_name: "",
    email: "",
    password: "",
  });

  // Función para obtener los usuarios desde el endpoint
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://pro.brasper.site/api/v1/auth/staff/register/`);
      const verifiedUsers = response.data.data;
      console.log(verifiedUsers);
      setUsers(verifiedUsers);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      toast.error("Error al cargar los usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar los cambios en el formulario de nuevo usuario
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Función para agregar un nuevo usuario
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/staff/register/`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.is_verified) {
        setUsers([...users, response.data]); // Agregar solo si el usuario es verificado
        toast.success("Usuario creado exitosamente");
      } else {
        toast.warn("El usuario ha sido creado, pero no está verificado.");
      }
      setNewUser({
        email: "",
        username: "", // Restablecer username a vacío
        first_name: "",
        last_name: "",
        document_number: "",
        phone_number: "",
        password: "",
        password2: "",
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      toast.error("Error al crear el usuario");
    }
  };

  // Función para manejar los cambios en los inputs de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Función para iniciar la edición de una fila
  const handleEditClick = (user) => {
    setEditingRow(user.id);
    setEditFormData({
      username: user.username, // Asignar el username para edición
      first_name: user.first_name,
      email: user.email,
      password: "", // Dejar el campo de la contraseña vacío para la edición
    });
  };

  // Función para guardar los cambios
  const handleSaveClick = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...editFormData } : user
    );
    setUsers(updatedUsers);
    setEditingRow(null);
    toast.success("Usuario actualizado");
  };

  // Función para cancelar la edición
  const handleCancelClick = () => {
    setEditingRow(null);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <h1>Usuarios</h1>
          </div>
          <div className="col text-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
            >
              Agregar Usuario
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Correo</th>
              <th scope="col">Número de Documento</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Fecha de Creación</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{editingRow === user.id ? <input type="text" name="username" value={editFormData.username} onChange={handleInputChange} /> : user.username}</td>
                <td>{editingRow === user.id ? <input type="text" name="first_name" value={editFormData.first_name} onChange={handleInputChange} /> : user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{editingRow === user.id ? <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} /> : user.email}</td>
                <td>{user.document_number}</td>
                <td>{user.phone_number}</td>
                <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                <td>
                  {editingRow === user.id ? (
                    <>
                      <button type="button" className="btn btn-success me-2" onClick={() => handleSaveClick(user.id)}>Guardar</button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="btn btn-success me-2" onClick={() => handleEditClick(user)}>Editar</button>
                      <button type="button" className="btn btn-danger">Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para agregar nuevo usuario */}
        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addUserModalLabel">Agregar Usuario</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddUser}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={newUser.username} onChange={handleNewUserChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" name="email" value={newUser.email} onChange={handleNewUserChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombres</label>
                    <input type="text" className="form-control" name="first_name" value={newUser.first_name} onChange={handleNewUserChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellidos</label>
                    <input type="text" className="form-control" name="last_name" value={newUser.last_name} onChange={handleNewUserChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Número de Documento</label>
                    <input type="text" className="form-control" name="document_number" value={newUser.document_number} onChange={handleNewUserChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="phone_number" value={newUser.phone_number} onChange={handleNewUserChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" value={newUser.password} onChange={handleNewUserChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña</label>
                    <input type="password" className="form-control" name="password2" value={newUser.password2} onChange={handleNewUserChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Agregar Usuario</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
