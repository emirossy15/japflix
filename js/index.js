let products= [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/japflix_api/movies-data.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            console.log(resultObj.data);
            products = resultObj.data;
        }
        else{ 

            console.log("ise here");
        }
    });

    document.getElementById("btnBuscar").addEventListener("click", function(){
        let searchString = document.getElementById("inputBuscar").value;
        if(!!searchString.trim().length > 0){
            let searchedMovies = products.filter(product => product.title.toLowerCase().includes(searchString.toLowerCase()));
            console.log("searched movies are ",searchedMovies);
            for(let i = 0; i < searchedMovies.length; i++){
                let movie = searchedMovies[i];
                let movieDiv = `
                    <div class="movieDiv" data-toggle="modal" data-target="#exampleModal">
                        <div class="movieTitle" onclick="openModal(${movie.id})">
                            <h4>${movie.title}</h4>
                            <p class="subtitle">${movie.overview}</p>
                        </div>
                        <div class="movieRate">
                            <small>${drawStars(movie.vote_average / 2)}</small>
                        </div>
                    </div>
                `;
                let lista = document.getElementById("lista");
                lista.innerHTML += movieDiv;
            } 
        }
    });

});



let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

function drawStars(stars){

    let number = parseInt(stars);
    let html="";
    for(let i =1; i<=number;i++){
        html +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        html +=`<span class="fa fa-star"></span>`
    }    
    return html;

}

function openModal(product_id){
    let product = products.find(product => product.id == product_id);
    let title = document.getElementById("modal-title");
    title.innerHTML = product.title;
    let description = document.getElementById("modal-description");
    description.innerHTML = product.overview;

    let genres = document.getElementById("modal-genres");
    for(let i = 0; i < product.genres.length;i++){
        let genre = product.genres[i];
        if (i > 0)
            genres.innerHTML += ", ";
        genres.innerHTML += genre.name;
        
    }
    description.innerHTML = product.overview;
    $('#exampleModal').modal('show');


    let year = document.getElementById("movie-year");
    year.innerHTML += product.release_date.slice(0, 4);;


    let duration = document.getElementById("movie-duration");
    duration.innerHTML += product.runtime;


    let budget = document.getElementById("movie-budget");
    budget.innerHTML += product.budget;


    let revenue = document.getElementById("movie-revenue");
    revenue.innerHTML += product.revenue;
}