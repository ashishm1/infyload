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
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-express.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addAjax(){

    var orientation;
    //var productgrid = $('.grid-uniform.grid--spacer')
    //div#CollectionSection.box.wrapper.grid-uniform.grid--spacer

    var productgrid = $('.featured-collections__products.collections__products')
    if(productgrid.length > 0) {
        productgrid[0].setAttribute("id", "LazyLoader-Loop");
        orientation = '.featured-collections__products.collections__products';
        }
    
    ll = $('nav.pagination')[0];
    pagegrid = ll.lastElementChild.lastElementChild.getElementsByClassName('icon-arrow-right').length;
    if (pagegrid > 0) {
        //tt = ll.lastElementChild.lastElementChild; tt.setAttribute("id", "LazyLoader-Pagination")
        $('nav.pagination')[0].setAttribute("id", "LazyLoader-Pagination")
        } 
        
    //Remove Left arrow
    //document.querySelectorAll('ul.pagination')[0].querySelectorAll('li')[1].innerText = "";
    //document.querySelectorAll('ul.pagination')[0].querySelectorAll('li')[0].remove();
    
    $('main').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}