const loader = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'


//Récupération du numero de page

function ShowUsers(){
    let nbPage = document.getElementById("numberPageUsers").value;
   
     getUsers(nbPage);
    
       
}
 // appel Ajax
function getUsers(numeroPage){
   document.getElementById("catalogue-card").innerHTML=loader;

    
    const xhr = new XMLHttpRequest(); 
    const url = 'https://reqres.in/api/users?delay=2&page='+numeroPage;
    xhr.open('GET', url);

    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === 4) {
            if (xhr.status===200){
                // gestion du retour de l'appel Ajax
                console.log('response = ' + xhr.response);
                const object= JSON.parse(xhr.response);
setUsersInPage(object);
                                
            }       
            else if(xhr.status === 404){
                alert(`impossible de trouver l'URL`)
            }
            else{
            alert(`une erreur est survenue`)
            }
};
            });
    xhr.send();
        }
// On affiche le résultat de l'appel Ajax dans la page
function setUsersInPage(listUsers){
    let myHtml=""
    listUsers.data.forEach(element =>{
       myHtml +='<div class="card"><div class="card-header"><h5 class="card-title">'+element.first_name+'</h5><h5 class="card-title"> ' +element.last_name+'</h5></div><div class="card-body">'+'<img src="'+element.avatar+'"></div><div class="card-footer"><div>'+element.email+'</div><div><button class ="change orange" onclick="editUser()"> </button><button class ="change rouge"onclick="deleteUser()"></button></div></div></div>'
    });
    document.getElementById("catalogue-card").innerHTML=myHtml

    // création de la pagination
    let nbPage = listUsers.total_pages;
    let currentPage = listUsers.page;
    let htmlPagination ="Page ";
   

    for (let i = 1; i<=nbPage; i++){
        if (i == currentPage){
            htmlPagination += '<button class="btn-page active" disabled >'+i+'</button>'
        }
        else{
            htmlPagination += '<button class="btn-page" onclick=getUsers('+i+')>'+i+'</button>'
        }
       
    }
    document.getElementById("pagination").innerHTML=htmlPagination;
    //Bloquer la recherche aux pages existantes
    document.getElementById("numberPageUsers").setAttribute('max',nbPage);

}
// au chargement affiché la page 1
document.addEventListener("DOMContentLoaded", function() {
    getUsers(1);
  });

function createUSer(){
    // requete POST 
    const xhr = new XMLHttpRequest(); 
    const url = 'https://reqres.in/api/users';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === 4) {
            if (xhr.status===201){
                // gestion du retour de l'appel Ajax
                console.log('response = ' + xhr.response);
                const object= JSON.parse(xhr.response);
                console.log(object)
                                
            }       
            else if(xhr.status === 404){
                alert(`impossible de trouver l'URL`)
            }
            else{
            alert(`une erreur est survenue`)
            }
        };
    });
// contenu de la requête
    /*let myForm ={
        name:"Amandine",
        job:"Dev-Student"
    }*/
    let myForm = new FormData();
    myForm.append('name', 'Amandine');
    myForm.append('job', 'Dev-Student');
    let object = {};
    myForm.forEach((value,key) => object[key]=value);
    let json =JSON.stringify(object);
    xhr.send(json);
}

function createUserApiFetch(){
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
   
    const body = JSON.stringify({
        name: document.getElementById("Nom").value,
        job: document.getElementById("Job").value
    }); 
    
    const init = { 
        method: 'POST',
        headers: headers,
        body: body };
    
    fetch('https://reqres.in/api/users', init)
        .then(response => {
            return response.json();
        })
        .then(response => {
            alert(response)
            console.log(response)
        })
        .catch(error => alert("Erreur : " + error));
}

function deleteUser(){
    const headers = new Headers();
   
    const init = { 
        method: 'DELETE',
        headers: headers
    };
    
    fetch('https://reqres.in/api/users/7', init)
        .then(response => {
            if(response.status == 204){
                alert("L'utilisateur a bien été supprimé");
            }
            else{
                alert("Impossible de supprimer l'utilisateur");
            }
        })
        .catch(error => alert("Erreur : " + error));
}

function editUser(){
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Authentification", "Bearer POUYDPOSY ODISUYD FGD KJFDF P")
   
    const body = JSON.stringify({
        name: document.getElementById("Nom").value,
        job: document.getElementById("Job").value
    }); 
    
    const init = { 
        method: 'PUT',
        headers: headers,
        body: body };
    
    fetch('https://reqres.in/api/users/2', init)
        .then(response => {
            return response.json();
        })
        .then(response => {
            alert(response)
            console.log(response)
        })
        .catch(error => alert("Erreur : " + error));
}

