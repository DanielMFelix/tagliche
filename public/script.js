//document.addEventListener("DOMContentLoaded",
    //function(event) {

//        document.querySelector("button")
  //          .addEventListener("click", function(){
    //            var i = this.value
      //          $ajaxUtils
        //            .sendGetRequest("weeks.json",
          //              function(request){
            //                assignment =JSON.parse(request.responseText);
              //              console.log(assignment);

                         //  document.querySelector("#title")
                         //   .innerHTML = i + ".WOCHE";

                         //   create_days(i)
                           
                            //document.querySelector("#assignment")
                            //.innerHTML = assignment[i].first.assignment;

                            //document.querySelector("#text")
                            //.innerHTML = assignment[i].first.text;

                            //document.querySelector("#author")
                            //.innerHTML = "(" + assignment[i].first.author + ")";

                            //document.querySelector("#list")
                            //.innerHTML = assignment[i].first.list;

                            //document.querySelector("#question")
                            //.innerHTML = assignment[i].first.question;

                            //document.querySelector("#beispiel")
                            //.innerHTML = assignment[i].first.beispiel;

                            //document.querySelector("#answer")
                            //.innerHTML = '<input type="text" placeholder="Schreiben Sie hier Ihre Antwort">'

                           // console.log("button is:" + i)


                        //});
                

        
          //  });

   // }
//);

document.addEventListener("DOMContentLoaded",
    function(event) {
        $ajaxUtils.sendGetRequest(
            home,
            function(request){
                document.querySelector("#content")
                .innerHTML = request.responseText;
            },false);}
        );

var home = "snippets/home.html";
var daily = "snippets/daily.html";
var daily_assignment = "snippets/daily-assignment.html";
var konjugator = "snippets/konjugator.html";
var login = "snippets/login.html";


function insertHtml(selector,html){
    targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
};

function showLoading(selector){
    var html =  "<div class='text-center'>";
    html += "<img src='img/taglichegif2.gif'></div>";
    insertHtml(selector,html);
};


function create_buttons_weeks(){
    texto="<div id='buttons-box' class='container'><h1 id='title'></h1>";
    texto += '<h4 id="theme-text"></h4>'
    for (var i = 1;i<41; i++){
        texto = texto + "<button href='#sectiondays' value="+i+" onclick='week("+i+");'>"+i+"</button>"
    }
    texto += "<section id='sectiondays'><div id='days'></div></div></section>"
    document.querySelector("#content")
    .innerHTML = texto;
};

function week(i){
    $ajaxUtils
        .sendGetRequest("weeks.json",
            function(request){
                assignment =JSON.parse(request.responseText);
                console.log(assignment);

                document.querySelector("#title")
                    .innerHTML = i + ".WOCHE "

                

                if (assignment[i]["theme"].Title){

                    document.querySelector("#title")
                    .innerHTML += "<div id='theme-title'><a>" + assignment[i]["theme"].Title +"</a></div>";
                }else{
                    document.querySelector("#title")
                    .innerHTML += "<div id='theme-title'><a></a></div>";

                }

                if (assignment[i]["theme"].text){
                    document.querySelector("#theme-text")
                    .innerHTML = assignment[i]["theme"].text;
                }else{
                    document.querySelector("#theme-text")
                    .innerHTML ="";

                }

                create_days(i)
            })
};


function create_assignment(i,k){
    $ajaxUtils
        .sendGetRequest("weeks.json",
            function(request){
                assignment =JSON.parse(request.responseText);

                console.log("k é=" + k + "i é=" + i);
                console.log("assignment é:", assignment[i]);
                console.log("letra k é:",k);
                console.log("Com a letra k:", assignment[i][k]);
                console.log(typeof k);

                texto = "";

                // if (assignment[i]["theme"].Title){
                //     texto += "<div id='theme-title'><a>" + assignment[i]["theme"].Title + "</a></div>";
                // }

                // if (assignment[i]["theme"].text){
                //     texto += "<div id='theme-text'><a>" + assignment[i]["theme"].text + "</a></div>";
                // }

                if (assignment[i][k].assignment){
                    texto += "<div  id='assignment'><a>" + assignment[i][k].assignment + "</a></div>";
                }

                if(assignment[i][k].text){
                    texto  += "<div id='text'><a>" + assignment[i][k].text + "</a>";
                

                    if (assignment[i][k].author){
                        texto += "<a id='author'> (" + assignment[i][k].author + ") </a></div>";
                    }
                    else{ texto += "</div>";
                }}
                
                if (assignment[i][k].list){
                    texto += "<div id='list'><a>" 
                    const lista = assignment[i][k].list
                    for (j in lista){
                        texto += lista[j] + " - ";
                    }
                    
                    texto += "</a></div>";
                }

                if(assignment[i][k].question){
                    texto += "<div id='question'><a>" + assignment[i][k].question +"</a></div>";
                }

                if (assignment[i][k].beispiel){
                    texto += "<div id='beispiel'><a>BEISPIEL: "  + assignment[i][k].beispiel+"</a></div>";
                }

                

                console.log("!!!!!!!!!!!!!ANSWER É!!!!!!", answer);

             
                 texto += '<form action="saveAnswer" method="POST"><div id="answer"><input type="text" name="answer" placeholder="Schreiben Sie hier Ihre Antwort"></div>';
                 texto += '<article name="getId" value='+i+' days='+k+' database-id='+i+'><button type="submit" name="buttonSaver" value=[{"whatDay":"'+k+'","week":'+i+'}]>Schicken</button></article></form>';

                document.querySelector("#content1")
                .innerHTML = texto;
                document.getElementById("content1").scrollIntoView();
                var answer = "";
                
            
                answer += database(i,k,answer);

            });

}


days=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag"];
order=["null","montag","dienstag","mittwoch","donnerstag","freitag"];

function create_days(i){
    var texto = ""
    for (var k=1; k<6; k++){
        texto = texto + "<button onclick="+"create_assignment("+"'"+i+"',"+"'"+order[k]+"'"+");>" + days[k] + "</button>";
    }
    texto += "<div id='content1' class='container'></div>"
    document.querySelector("#days")
    .innerHTML = texto;
    document.getElementById("days").scrollIntoView();
    console.log(texto)
    
};

function loadkonjugator(){
    $ajaxUtils.sendGetRequest(
        konjugator,
        function(request){
            document.querySelector("#content")
            .innerHTML = request.responseText;
        },
        false);
        
};

function login_call(){
    $ajaxUtils.sendGetRequest(
        login,
        function(request){
            document.querySelector("#myModal")
            .innerHTML = request.responseText;
            document.getElementById("myModal").style.display = "block";
        },
        false);
    
};

// modal functions // 

document.addEventListener("click", 
    function(event){
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
    
}
)

function welcomeMessage(){
    document.getElementById("welcomeMessage").innerHTML = user_name;
}

function docWrite(variable) {
    document.write(variable);
}

//index-log//
document.addEventListener("DOMContentLoaded",
    function(event) {
        console.log("beforeload");
        $ajaxUtils
        .sendGetRequest("/username",
            function(request){
                username = request.responseText;
                if (username[0] == username[0].toLowerCase()){
                    username = username.replace(/^./,username[0].toUpperCase());
                }
                document.getElementById("welcomeMessage")
                .innerHTML = "Hallo " + username + "!";
                console.log(username);
            })
        });
 
function database(i,k,answer){               
    $ajaxUtils
        .sendGetRequest("/database",
            function(request){
                datab = JSON.parse(request.responseText);
                answer += datab[i-1][k];
                console.log("answer de dentro da função", answer)
                request.exerciseAnswer = answer
                if (answer==null){
                    answer="";
                }
                document.getElementsByTagName("input")[0].setAttribute("value",answer);
                return answer

                }
        
        )};