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
    const url = 'https://reqres.in/api/users?delay=3&page='+numeroPage;
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
       myHtml +='<div class="card"><div class="card-header"><h5 class="card-title">'+element.first_name+'</h5><h5 class="card-title"> ' +element.last_name+'</h5></div><div class="card-body">'+'<img src="'+element.avatar+'"></div><div class="card-footer">'+element.email+'</div></div>'
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

document.addEventListener("DOMContentLoaded", function() {
    getUsers(1);
  });
