import styles from "./AccessLogin.module.css";
import React from "react";

function AccessLogin() {
  return (
    <div className={styles.mainLogin}>
      <div className={styles.centerLogin}>
        <div className={styles.cardLogin}>
          <h1>LOGIN</h1>
        
        <div className={styles.textfield}>
          <label for="email">Email</label>
          <input type="text" placeholder="Email" id="email" required />
        </div>
        <div className={styles.textfield}>
          <label for="senha">Senha</label>
          <input type="password" placeholder="Senha" id="senha" required />
        </div>
        <div className={styles.textfieldRemember}>
          <input type="checkbox" id="lembrar" />
          <span>Relembrar Senha</span>
        </div>
        <button
          type="submit"
          onclick="login(); return false"
          className={styles.btnLogin}
        >
          Login
        </button>
        <div className={styles.textfieldCreateAccount}>
          <p>
            Ainda não tem conta? <a href="register.html">Criar Conta</a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AccessLogin;
