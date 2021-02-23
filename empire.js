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
        lazyscript.onload = addBtp;
        lazyscript.onreadystatechange = addBtp;
        lazyscript.type = "text/javascript";
        lazyscript.src = "https://cdn.jsdelivr.net/gh/ashishm1/infyload@main/ajaxinate-empire.js";
    }
    catch(err){
        console.log(err);
    }
    }

function addBtp() {
    try{
        const btp = document.createElement('link');
        btp.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
        document.getElementsByTagName('head')[0].appendChild(btp);
        btp.onload = addAjax;
        btp.onreadystatechange = addAjax;
        btp.rel = "stylesheet";
        btp.type = "text/css";
        btp.crossorigin = "anonymous";
    }
    catch(err){
        console.log(err);
    }
}

function addAjax(){

    var orientation;
    
    if($('ul.productgrid--items').length > 0) {
        var prodgrid = $('ul.productgrid--items')[0]
        prodgrid.setAttribute("id", "LazyLoader-Loop");
        orientation = 'ul.productgrid--items';
        }
    
    ll = $('nav.pagination--container').length;
    if (ll > 0) {
        tt = $('nav.pagination--container')[0]; tt.setAttribute("id", "LazyLoader-Pagination")
        tt.innerHTML = `<div class="spinner-start text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>`;

        } 
        
    //Remove Left arrow
    //document.querySelectorAll('div.pagination--container')[0].querySelectorAll('li')[1].innerText = "";
    //document.querySelectorAll('div.pagination--container')[0].querySelectorAll('li')[0].remove();
    
    $('body').append(`<script>var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});document.addEventListener("DOMContentLoaded", function() { var endlessScroll = new Ajaxinate({container: "#LazyLoader-Loop", pagination: "#LazyLoader-Pagination", orientation: "${orientation}"});});</script>`)


}
