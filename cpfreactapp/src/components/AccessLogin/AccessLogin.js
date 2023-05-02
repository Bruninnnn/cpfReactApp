import './AccessLogin/module.index.css';

function AccessLogin() {
    return (
        <div className="main-login">
            <div className="center-login">
                <div className="card-login">
                    <h1>LOGIN</h1>
                </div>
                <div className="textfield">
                    <label for="email">Email</label>
                    <input type="text" placeholder="Email" id="email" required />   
                </div>
                <div className="textfield">
                    <label for="senha">Senha</label>
                    <input type="password" placeholder="Senha" id="senha" required />
                </div>
                <div className="textfield-remember">
                    <input type="checkbox" id="lembrar"/>
                    <span>Relembrar Senha</span>
                </div>
                <button type="submit" onclick="login(); return false" className="btn-login">Login</button>
                <div className="textfield-createcount">
                    <p>Ainda não tem conta? <a href="register.html">Criar Conta</a></p>
                </div>    
            </div>
        </div>
    );
}
  
export default AccessLogin;