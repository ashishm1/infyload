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
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-doni.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addAjax(){

    var orientation;
    //var productgrid = $('.grid-uniform.grid--spacer')
    //div#CollectionSection.box.wrapper.grid-uniform.grid--spacer

    var productgrid = $('div.product-collection-grid').find('.row');
    if(productgrid.length > 0) {
        var pgrid = productgrid[0]
        pgrid.setAttribute("id", "LazyLoader-Loop");
        orientation = 'div.product-collection-grid';
        }
    
    ll = $('.shop-bottom');
    if (ll.length > 0) {
        pagegrid = ll[0]
        pagegrid.setAttribute("id", "LazyLoader-Pagination")
        } 
        
    
    $('body').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}