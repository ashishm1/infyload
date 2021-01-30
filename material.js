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
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-material.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addAjax(){

    var orientation;
    
    if($('div.cat-grid').length > 0) {
        var prodgrid = $('div.cat-grid')[0]
        prodgrid.setAttribute("id", "LazyLoader-Loop");
        orientation = 'div.cat-grid';
        }
    
    
    ll = $('div.advanced-pagination').length;
    if (ll > 0) {
        tt = $('div.advanced-pagination')[0]; tt.setAttribute("id", "LazyLoader-Pagination")
        } 
        
    //Remove Left arrow
    //document.querySelectorAll('advanced-pagination')[0].querySelectorAll('li')[1].innerText = "";
    //document.querySelectorAll('advanced-pagination')[0].querySelectorAll('li')[0].remove();
    
    $('body').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}