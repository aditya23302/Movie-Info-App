$(document).ready(()=>{

    $('#searchForm').on('submit',(event)=>{
        let searchText=$('#searchText').val();
        getMovies(searchText);
        event.preventDefault();
				 
            });

        });


    function getMovies(searchText){
        
        axios.get('https://www.omdbapi.com/?apikey=67cc7953&s='+searchText)
        .then((response)=>{
            console.log(response);
            let result="";

            let movies=response.data.Search;
            $.each(movies,(index,movie)=>{
                result+=`
                <div class="col-md-3">
                    <div class="well text-center">
                    <a onclick="movieSelected('${movie.imdbID}')" href="#"><img src="${movie.Poster}" height=200 width=200></a>
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">See Details</a>
                    </div>
                </div>
                `;
            });
            $('#movies').html(result);
        })
        .catch((err)=>{
            console.log(err);
        });
    
    }

    function movieSelected(id){
        sessionStorage.setItem('movieId',id);
        window.location='details.html';
        return false;
    }

    function getMovie(){
        let movieId=sessionStorage.getItem('movieId');
        axios.get('https://www.omdbapi.com/?apikey=67cc7953&i='+movieId)
        .then((response)=>{
            console.log(response);

            let movie=response.data;

            let output=`
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail" >
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>

                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" target="blank" class="btn-primary">View IMDB</a>
                    <a href="index.html" class="btn-default">Go Back</a>
                </div>
            </div>
            `;
            $('#movie').html(output);
            
        })
        .catch((err)=>{
            console.log(err);
        })

    }

