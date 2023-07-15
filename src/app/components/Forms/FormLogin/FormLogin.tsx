import { Link } from "react-router-dom";
import styles from "./FormLogin.module.scss"

export function FormLogin() {
    function handleLogin() {
        console.log('login')
    }
  return (
    <form>
      <label htmlFor="inputName">
        <input type="text" name="name" id="inputName" />
      </label>
      <label htmlFor="inputPassword">
        <input type="text" name="password" id="inputPassword" />
      </label>
          <button className={styles.btnLogin} onClick={handleLogin}>Login</button>
          <Link to=''>Crear usuario</Link>
    </form>
  );
}
