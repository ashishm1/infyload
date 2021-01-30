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
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-streamline.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addAjax(){

    var productgrid = $('.grid.grid--uniform')
    if(productgrid.length > 0) {
        var pgrid = productgrid[0]
        pgrid.setAttribute("id", "LazyLoader-Loop");
        var orientation = '.grid.grid--uniform';
        }
    
    ll = $('div.pagination');
    if (ll.length > 0) {
        pagegrid = ll[0]
        pagegrid.setAttribute("id", "LazyLoader-Pagination")
        } 
        
    
    $('body').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}