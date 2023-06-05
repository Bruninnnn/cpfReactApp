import React from "react";
import stylesregister from "./Register.module.css";

function FormRegister() {
    return (
        <div className={stylesregister.body}>
            <div className={stylesregister.container}>
                <div className={stylesregister.form_image}>
                    
                </div>
                <div className={stylesregister.form}>
                    <form action="#">
                        <div className={stylesregister.form_header}>
                            <div className={stylesregister.title}>
                                <h1>Cadastre-se</h1>
                            </div>
                            <div className={stylesregister.login_button}>
                                <button><a href="control.html">Entrar</a></button>
                            </div>
                        </div>
                        <div className={stylesregister.input_group}>
                            <div className={stylesregister.input_box}>
                                <label for="completname">Nome Completo</label>
                                <input type="text" id="completname" name="completname" placeholder="Nome Completo" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="email">E-mail</label>
                                <input type="email" id="email" name="email" placeholder="Informe seu e-mail" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="password">Senha</label>
                                <input type="password" id="password" name="password" placeholder="Informe sua senha" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="number">CEP</label>
                                <input type="cep" id="number" name="cep" placeholder="xxxxx-xxx" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="street">Rua</label>
                                <input type="text" id="street" name="street" placeholder="Informe sua rua" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="">Número</label>
                                <input type="number" id="number" name="number" placeholder="Informe seu número" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="">Bairro</label>
                                <input type="text" id="rua" name="rua" placeholder="Informe seu bairro" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="">Complemento</label>
                                <input type="text" id="complement" name="rua" placeholder="Informe um complemento" required />
                            </div>

                            <div className={stylesregister.input_box}>
                                <label for="city">Cidade</label>
                                <input type="text" id="city" name="city" placeholder="Informe sua cidade" required />
                            </div>

                            <div className={stylesregister.continue_button}>
                                <button><a href="login.html">Continuar</a></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormRegister;