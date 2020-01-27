function search() {
    var cpf = document.getElementById('inputCPF').value;
    console.log(cpf);
    validation(cpf);
}

function validation(cpfValeu){
    document.getElementById('tituloDocumentos').innerHTML - 'Certificados de: '+cpfValeu;
}