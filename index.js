
document.addEventListener("DOMContentLoaded", addShowTableMenu);
const divShowTabla = document.getElementById("tablaMenu"); //div que se vera el contenido en pantallas pequeñas

//con doble click se remueve el contenido, me parecio mas intuitivo, de rabia ya le das doble click si algo no funciona como esperas en el caso del usuario y si asi era como funcionaba en estes caso, es un gol.
document.getElementById("options").addEventListener("dblclick", () => {
        divShowTabla.innerHTML = "";
        divShowTabla.classList.remove("card");
    
    });
    
//agregar tabla en pantallas pequeñas dentro del nav
function addShowTableMenu() {
    
    document.getElementById("options").addEventListener("click", () => { //con un click se muestra el contenido
        let temp = `
              <ul class="list-group list-group-flush" id="options">
                <li class="list-group-item"><a onclick="getCharacters()" class="link-dark" href="#">Characters</a></li>
                <li class="list-group-item"><a onclick="getSeries()" class=" link-dark" href="#">Series</a></li>
                <li class="list-group-item"><a onclick="getStories()"class=" link-dark" href="#">Stories</a></li>
                <li class="list-group-item"><a class="link-dark" href="#">Spoiler</a></li>
             </ul>
        `
        divShowTabla.innerHTML = temp;
        divShowTabla.classList.add("card"); //esto lo hago, porque quedaba la linea gris del diseño de la card cuando no hay contenido.
    });
};
//llamado a la api, tress endpoints diferentes
//permisos 
const apiKeyPub = "71c92e80a22a96f80468fc68ad8eabbe";
const ts = "1";
const hash = "804eca9f59eb6dc6772e2676789b431b"; //lo genera una pagina con la api publica, la privada y el ts.
//endpoints
const UrlSeries = `https://gateway.marvel.com:443/v1/public/series?ts=1&apikey=${apiKeyPub}&hash=${hash}`;
const UrlCharacters = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apiKeyPub}&hash=${hash}`;
const UrlStories = `https://gateway.marvel.com:443/v1/public/stories?ts=1&apikey=${apiKeyPub}&hash=${hash}`;
//primer fetch endpoint de series
async function getSeries() {
    const response = await fetch(UrlSeries);
    if (!response.ok) throw new Error('Error muchacha', response.status);
    const data = await response.json();
    //console.log(data.data.results);
    const { results } = data.data  //  me quedo con el array results
    showSeries(results);
};
//segundo fetch endpoint de personajes
async function getCharacters() {
    const response = await fetch(UrlCharacters);
    if (!response.ok) throw new Error('error')
    const data = await response.json();
    //console.log(data.data.results)
    const { results } = data.data  //  me quedo con el array results 
    showCharacters(results);
};
//tercer fetch endpoint de historias 
async function getStories() {
    const response = await fetch(UrlStories);
    if (!response.ok) throw new Error("error")
    const data = await response.json();
    //console.log(data.data.results)
    const { results } = data.data  //  me quedo con el array results
    showStories(results);
};
//Mostrar la informacion de la api, en esta caso sobre historias
async function showStories(array) { //propiedades: title, type, description 
    let tempStories = "";
    const divStories = document.getElementById("containerStories");
    for (let i = 0; i < 8; i++) {//solo ocho porque el diseño previsto pedia ocho parrafos y contiene veinte objetos
        const element = array[i];
        tempStories += `
            <div class="text-bg-light col-lg-4 col-md-6 col-sm-12 mt-2 mb-2">
                <p>Story Title:${element.title} Type:${element.type} ${element.description}</p>
            </div>
            `;
    }
    divStories.innerHTML = tempStories;
};
//Muestro info de personajes
async function showCharacters(array) {  //porpiedades: description,comics.available,series.available,stories.available
    let tempCharacters = "";
    const divCharacters = document.getElementById("containerCharacters");
    for (let i = 0; i < 8; i++) { //solo ocho porque el diseño previsto pedia ocho parrafos y contiene veinte objetos
        const element = array[i];
        tempCharacters += `
            <div class="text-bg-light col-lg-4 col-md-6 col-sm-12 mt-2 mb-2">
                <p>Name's Character:${element.name} Count History's Character:${element.stories.available}Count Series' Character: ${element.series.available} Count Comics' Character:${element.comics.available} ${element.description}</p>
            </div>
            `;
    }
    divCharacters.innerHTML = tempCharacters;
};
//muestro info acerca de las series
async function showSeries(array) { //propiedades: description, endYear,title
    let tempSeries = "";
    const divSeries = document.getElementById("containerSeries");
    for (let i = 0; i < 8; i++) { //solo ocho porque el diseño previsto pedia ocho parrafos y contiene veinte objetos
        const element = array[i];
        tempSeries += `
            <div class="text-bg-light col-lg-4 col-md-6 col-sm-12 mt-2 mb-2">
            <p>Title Serie:${element.title} Year: ${element.endYear} ${element.description}</p>
            </div>
            `;
    }
    divSeries.innerHTML = tempSeries;
};
    

//Detalles que quiero agregar, por ahora pienso, un proximamente: que solo aprezcan los ocho parrafos relacionados con lo que el usuario selecciono en el menu, no que se vayan mostrando todos y sumando uno detras del otro como ahora.


