const Validation = (values) => {
    let errors = {}

    if (!values.email) {
        errors.email = alert('É necessário informar um Email')
    } 
    else if (values.email.length < 5) {
        errors.email = alert('O email deve ter no mínimo 5 caracteres')
    }

    const passwordRegex = /(?=.*[0-9])/;

    if (!values.password) {
        errors.password = alert('É necessário informar uma Senha')
    } 
    else if (values.password.length < 6) {
        errors.password = alert('Senha deve ter no mínimo 6 caracteres')
    }
    else if (!passwordRegex.test(values.password)) {
        errors.password = alert('Senha inválida. Contem apenas 1 número')
    }

    return errors;
}

export default Validation;