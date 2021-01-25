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
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-ella.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addAjax(){

    var orientation;
    
    if($('div.product-list').length > 0) {
        var prodgrid = $('div.product-list')[0]
        prodgrid.setAttribute("id", "LazyLoader-Loop");
        orientation = 'div.product-list';
        }
    else if($('div.products-grid.row').length > 0) {
        var prodgrid = $('div.products-grid.row')[0]
        prodgrid.setAttribute("id", "LazyLoader-Loop");
        orientation = 'div.products-grid.row'
        }
    
    
    
    ll = document.querySelector(orientation).nextElementSibling;
    if (ll) {
        ll.setAttribute("id", "LazyLoader-Pagination")
        } 
        
    //Remove Left arrow
    //document.querySelectorAll('ul.pagination')[0].querySelectorAll('li')[1].innerText = "";
    //document.querySelectorAll('ul.pagination')[0].querySelectorAll('li')[0].remove();
    
    $('main').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}