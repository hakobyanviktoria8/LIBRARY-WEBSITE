$(document).ready(function(){
    $("#myform").submit(function(){
        var search = $("#books").val();
        if(!search) {
            alert("Please enter book title or auther");
        } else{
            var url = "";
            var img = "";
            var title = "";
            var author = "";
            $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){
                let arr=[];
                for(let i=0; i<response.items.length; i++){
                    title=$('<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>');
                    author=$('<h6 class="center-align white-text"> By: ' + response.items[i].volumeInfo.authors + '</h6>');
                    img = $('<img class="aligning card z-depth-5" id="dynamic"><br>' +
                        '<a href=' + response.items[i].volumeInfo.infoLink + '>' +
                        '<button id="imagebutton" class="btn secondary aligning">Read More</button></a>');
                    url= response.items[i].volumeInfo.imageLinks.thumbnail;
                    img.attr('src', url);
                    var span = $('<span>');
                    title.attr("id",i);
                    title.appendTo(span);
                    author.appendTo(span);
                    img.appendTo(span);
                    arr.push(span);
                }
                for (let i=0; i< 6;i++){
                    $("#result").append(arr[i]);

                }
            });
        }
        return false;
    });
});