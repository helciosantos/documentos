function search() {
    var cpf = document.getElementById('inputCPF').value;
    // console.log(cpf);
    validation(cpf);
}

function validation(cpfValue){
    var storage = firebase.storage();
    //Retorna uma promesses que será processada
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            listFiles(cpfValue);
            next(cpfValue); 
        } else{
            alert('CPF não cadastrado');
        }   
    }).catch(function(error){
        console.log('ERRO', error);
    });
    

}

function listFiles(cpfValue){
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;
    var storage = firebase.storage();
    var arquivos;
    var nomesArquivos = [];
    var linksArquivos = [];
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        arquivos = todosArquivos.items;
        console.log(arquivos);
    
        for (let i=0; i<arquivos.length; i++){
            nomesArquivos.push(arquivos[i].name);
            storage.ref(cpfValue+'/'+nomesArquivos[i]).getDownloadURL().then(function(url){
                console.log(url);
                
            });
            
        }
    });
}

function next(cpfValue){
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    
}

function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById('inputCPF').value = '';
}