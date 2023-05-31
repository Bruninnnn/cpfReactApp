import { TextField } from "@material-ui/core";
import React from "react";
import styles from "./Form.module.css";

function Form() {
  return (
    <div className={styles.mainRegister}>
      <div className={styles.centerRegister}>
        <div className={styles.cardRegister}>
          <h1>CRIAR CONTA</h1>
          <div className={styles.textfield}>
            <>
              <label for={styles.nome}>Nome Completo</label>
              <TextField type="text" placeholder="Nome" id="nome" required />
            </>

            {/* </div> */}
            {/* <div className={styles.textfield}> */}
            <>
              <label for="email">Email</label>
              <TextField type="text" placeholder="Email" id="email" required />
            </>

            {/* </div> */}
            {/* <div className={styles.textfield}> */}
            <>
              <label for="senha">Senha</label>
              <TextField
                type="password"
                placeholder="Senha"
                id="senha"
                required
              />
            </>
            {/* </div> */}
          </div>
          <div className={styles.textfieldNumber}>
            <label for="numero">Celular</label>
            <TextField
              type="text"
              placeholder="Celular"
              id="celular"
              required
            />
          </div>
          <button className={styles.btnRegister}>Criar Conta</button>
          <div className={styles.textfieldAccessLogin}>
            <p>
              Conta criada <a href="login.html">Acessar Conta</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
