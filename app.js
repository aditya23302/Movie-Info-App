$(document).ready(()=>{
    var apikey="67cc7953";
    $('#searchForm').submit(function(event){
        event.preventDefault()

        var movie=$("#searchText").val()

        var result="";

        var url="https://www.omdbapi.com/?apikey="+apikey;
        $.ajax({
            method:'Get',
            url:url+"&t="+movie,
            success:function(data){
                console.log(data);
				//console.log(data.Poster);
				//document.write();


                result=`
                    <img style="float:left" width=200 height=190 src="${data.Poster}"/>
                    <h2>Title:${data.Title}</h2>
                    <h2>Release Date:${data.Released}</h2>
                    <h2>Duration:${data.Runtime}</h2>
                    <h2>Genre:${data.Genre}</h2>
                    <h2>IMDB:${data.imdbRating}</h2>
                    <h2>Director:${data.Director}</h2>
                    <h2>Cast:${data.Actors}</h2>
                `;
                 $("#movie").html(result);
				 

            }

        })

    })
});