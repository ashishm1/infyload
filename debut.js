try{
    const script2 = document.createElement('script');
    document.getElementsByTagName('head')[0].appendChild(script2);
    script2.onload = handlertag;
    script2.onreadystatechange = handlertag;
    script2.type = "text/javascript";
    script2.src = "https://code.jquery.com/jquery-3.5.1.min.js";
}
catch(err){
    console.log(err);
}


function handlertag() {
    try{
        const lazyscript = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(lazyscript);
        lazyscript.onload = addAjax;
        lazyscript.onreadystatechange = addAjax;
        lazyscript.type = "text/javascript";
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-debut.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addAjax(){
    var orientation;
    
    if($('ul.grid').length > 0) {
        $('ul.grid').attr("id", "LazyLoader-Loop");
        orientation = 'ul.grid';
        }
    else if($('ul.list-view-items').length > 0) {
        $('ul.list-view-items').attr("id", "LazyLoader-Loop");
        orientation = 'ul.list-view-items'
        }
    
    ll = $('a.btn--narrow').length;
    if (ll > 1) {
        tt = $('a.btn--narrow')[1]; tt.parentElement.setAttribute("id", "LazyLoader-Pagination")
        } 
    else if ($('a.btn--narrow').length > 0 ) {
        $('a.btn--narrow').parent().attr("id", "LazyLoader-Pagination")
        }
    document.querySelectorAll('ul.pagination')[0].querySelectorAll('li')[1].innerText = "";
    document.querySelectorAll('ul.pagination')[0].querySelectorAll('li')[0].remove();
    
    $('main').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}



