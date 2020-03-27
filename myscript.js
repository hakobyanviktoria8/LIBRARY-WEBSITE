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
                    let button = document.createElement("button");
                    button.append("Add To Card");
                    button.classList.add("addToCard");
                    var span = $('<span>');
                    span.append(button);
                    title.appendTo(span);
                    author.appendTo(span);
                    img.appendTo(span);
                    span.mouseenter(function(){
                      button.style.display = "block";
                    });
                    span.mouseleave(function(){
                        button.style.display = "none"
                    });
                    let day = new Date().getDate() +"/ "+ new Date().getMonth() +"/ "+new Date().getFullYear();

                    button.addEventListener("click", function() {
                        alert("arach");
                        let row = document.createElement("div");
                        row.classList.add("row");
                        row.style.borderTop= "1px solid #CACCD5";
                        row.style.marginTop= "10px";
                        let coldiv0= document.createElement("div");
                        coldiv0.classList.add("col-md-3");
                        coldiv0.innerHTML="";
                        coldiv0.append(response.items[i].volumeInfo.title);
                        // console.log(title.value);
                        let coldiv1= document.createElement("div");
                        coldiv1.classList.add("col-md-3");
                        coldiv1.style.fontSize = "15px";
                        coldiv1.innerHTML = day;
                        let coldiv2= document.createElement("div");
                        coldiv2.classList.add("col-md-3");
                        if(!coldiv2.innerHTML ){
                            coldiv2.innerHTML="1 month"
                        }  else {
                            coldiv2.innerHTML=returnT.value
                        }
                        let coldiv3= document.createElement("div");
                        coldiv3.classList.add("col-md-3");
                        if(!coldiv3.innerHTML ){
                            coldiv3.innerHTML="Normal"
                        }  else {
                            coldiv3.innerHTML=myOpinion.value
                        }
                        row.append(coldiv0);
                        row.append(coldiv1);
                        row.append(coldiv2);
                        row.append(coldiv3);
                        $("#modalCard").append(row);
                    });
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