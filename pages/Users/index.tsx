import { useState } from "react";

const Users = () => {
  const [login, setLogin] = useState(true);

	// Form state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

	// Change view between login and register
  const handleLoginAndRegister = () => {
    setLogin(!login);
  };

	// Get api user and login
  const handleLogin = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();

    const success = checkUser(data);

		if(success.success){
			const {username, name, lastname, email, password, id} = success.user
			console.log(success.user)
      localStorage.setItem(
        "user",
        `{ ${id}, ${username}, ${name}, ${lastname}, ${email}, ${password} }`,
      );
		}
  };

	// Valide user exist in database
  function checkUser(data) {
    for (const user of data) {

      if (user.email === email) {
        if (user.password === password) {
          return { success: true, user: user }; // Credenciales correctas
        } else {
          return { success: false, error: "Contraseña incorrecta" }; // Contraseña incorrecta
        }
      }

    }

    return { success: false, error: "Email incorrecto" };
  }

  const handleRegister = async () => {
		// Register User in database
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, lastname, email, password}),
    });
 		
		// Login inter register user
    if (response.status === 201) {
			handleLogin() // -- Login
    } else {
      const data = await response.json();
      console.error(data.error || "Error en el registro");
    }
  };

  return (
    <div>
      {login ? (
        <>
          <p>Login</p>
          <label>
            Correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Iniciar sesión</button>
          <button onClick={handleLoginAndRegister}> Register </button>
        </>
      ) : (
        <>
          <p>Register</p>
          <label>
            Nombre de usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Apellido:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <br />
          <label>
            Correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleRegister}>Registrarse</button>
          <button onClick={handleLoginAndRegister}> Login </button>
        </>
      )}
    </div>
  );
};

export default Users;
