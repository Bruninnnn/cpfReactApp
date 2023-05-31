import { TextField } from "@material-ui/core";
import React from "react";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className="side-nav">
                    <div className="menu">
                        <span className="material-symbols-outlined">menu</span>
                        <h2>MENU</h2>    
                    </div>
                    <ul>
                        <li><button><span className="material-symbols-outlined">add_circle</span><p>Add</p></button></li>
                    </ul>
                    <ul>
                        <li><span className="material-symbols-outlined">logout</span><p>Sair</p></li>
                    </ul>
                </div>
            </div>
            <main>
                <h1>Controle Financeiro Pessoal</h1>
                <div className="balances">
                    <div class="receipt">
                        <span class="material-symbols-outlined">attach_money</span>
                        <div class="middle">
                            <div class="left">
                                <h3>Receita</h3>
                                <h1>0,00</h1>
                            </div>
                        </div>
                    </div>
                    <div class="balance">
                        <span class="material-symbols-outlined">toll</span>
                        <div class="middle">
                            <div class="left">
                                <h3>Saldo</h3>
                                <h1>0,00</h1>
                            </div>
                        </div>
                    </div>
                    <div class="cost">
                        <span class="material-symbols-outlined">money_off</span>
                        <div class="middle">
                            <div class="left">
                                <h3>Despesas</h3>
                                <h1>0,00</h1>
                            </div>
                        </div>
                    </div>
                </div>
                
                <dialog>
                    <div class="header-imputs">
                        <button onclick="teste()"><span onclick="document.getElementById('id01').style.display='none'" class="close" title="Fechar aba">&times;</span></button>
                    </div>
                    <form class="center-imputs">
                        <div class="main-imputs">
                            <div class="textfield">
                                <label for="value">Valor:</label>
                                <input type="text" placeholder="Valor" id="amount" required/>
                            </div>
                            <div class="textfield">
                                <label for="description">Descrição:</label>
                                <input type="text" placeholder="Descrição" id="description" required/>
                            </div>
                            <div class="textfield">
                                <label for="type">Tipo:</label>
                                <div class="textfield-type">
                                    <select className="type" id="type" required>
                                        <option value="" disabled selected>Selecione...</option>
                                        <option value="1">Entrada</option>
                                        <option value="2">Saída</option>
                                    </select>
                                </div>
                            </div>
                            <div class="textfield">
                                <label for="category">Categoria</label>
                                <div class="textfield-category">
                                    <select className="category" id="category" required>
                                        <option disabled selected>Selecione...</option>
                                        <option value="1">Alimentação</option>
                                        <option value="2">Compras</option>
                                        <option value="3">Casa</option>
                                        <option value="4">Saúde</option>
                                        <option value="5">Lazer</option>
                                        <option value="6">Transporte</option>
                                        <option value="7">Outros</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="imputs">
                        <button id="btn-register" type="button" class="btn-primary">CONCLUIR</button>
                    </div>
                </dialog>
                <div class="recent-orders">
                    <h2>Extrato</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Valor</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R$ 32,75</td>
                                <td>Almoço</td>
                                <td>Alimentação</td>
                                <td><span class="material-symbols-outlined">keyboard_arrow_down</span></td>
                            </tr>
                            <tr>
                                <td>R$ 875,90</td>
                                <td>Dividas</td>
                                <td>Outros</td>
                                <td><span class="material-symbols-outlined">keyboard_arrow_down</span></td>
                            </tr>
                            <tr>
                                <td>R$ 1500,45</td>
                                <td>Salário</td>
                                <td>Outros</td>
                                <td><span class="material-symbols-outlined">keyboard_arrow_up</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>

    );
}

export default Home;