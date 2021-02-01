'use strict'; var Ajaxinate = function ajaxinateConstructor(config) { var settings = config || {}; var defaultSettings = { pagination: '.AjaxinatePagination', method: 'scroll', container: '.AjaxinateLoop', offset: 0, loadingText: '', callback: null, orientation: '.card-list.grid' }; this.settings = Object.assign(defaultSettings, settings); this.addScrollListeners = this.addScrollListeners.bind(this); this.addClickListener = this.addClickListener.bind(this); this.checkIfPaginationInView = this.checkIfPaginationInView.bind(this); this.stopMultipleClicks = this.stopMultipleClicks.bind(this); this.destroy = this.destroy.bind(this); this.containerElement = document.querySelector(this.settings.container); this.paginationElement = document.querySelector(this.settings.pagination); this.initialize(); }; Ajaxinate.prototype.initialize = function initializeTheCorrectFunctionsBasedOnTheMethod() { if (this.containerElement) { var initializers = { click: this.addClickListener, scroll: this.addScrollListeners }; initializers[this.settings.method](); } }; Ajaxinate.prototype.addScrollListeners = function addEventListenersForScrolling() { if (this.paginationElement) { document.addEventListener('scroll', this.checkIfPaginationInView); window.addEventListener('resize', this.checkIfPaginationInView); window.addEventListener('orientationchange', this.checkIfPaginationInView); } }; Ajaxinate.prototype.addClickListener = function addEventListenerForClicking() { if (this.paginationElement) { this.nextPageLinkElement = this.paginationElement.querySelector('a'); this.clickActive = true; if (this.nextPageLinkElement !== null) { this.nextPageLinkElement.addEventListener('click', this.stopMultipleClicks); } } }; Ajaxinate.prototype.stopMultipleClicks = function handleClickEvent(event) { event.preventDefault(); if (this.clickActive) { this.nextPageLinkElement.innerHTML = this.settings.loadingText; if (this.nextPageLinkElement) {this.nextPageUrl = this.nextPageLinkElement.href; this.clickActive = false; this.loadMore();} } }; Ajaxinate.prototype.checkIfPaginationInView = function handleScrollEvent() { var top = this.paginationElement.getBoundingClientRect().top - this.settings.offset; var bottom = this.paginationElement.getBoundingClientRect().bottom + this.settings.offset; if (top <= window.innerHeight && bottom >= 0) { this.nextPageLinkElement = this.paginationElement.querySelector('a'); this.removeScrollListener(); if (this.nextPageLinkElement) { this.nextPageLinkElement.innerHTML = this.settings.loadingText; var nextpagelink = document.querySelector('link[rel="next"]'); if(nextpagelink) {this.nextPageUrl = nextpagelink.href; this.loadMore();} } } }; Ajaxinate.prototype.loadMore = function getTheHtmlOfTheNextPageWithAnAjaxRequest() {
    this.request = new XMLHttpRequest(); this.request.onreadystatechange = function success() {
        if (this.request.readyState === 4 && this.request.status === 200) {
            var newContainer = this.request.responseXML.querySelectorAll(this.settings.orientation)[0];
            console.log(newContainer.firstElementChild.childNodes); /*if(document.querySelectorAll('nav.pagination')){ document.querySelectorAll('nav.pagination')[0].remove();} */
            var plength = newContainer.querySelectorAll('.card.critical-clear').length;
            // console.log(len);
            
            // var plength = newContainer.children.children.length;
            console.log(plength);
            var productElements = newContainer.querySelectorAll('.card.critical-clear');
            for (var i = 0; i < plength; i++) {
                var fel = productElements[i];
                // fel.querySelector('noscript').remove();
                // fel.querySelector('img').removeAttribute("srcset");
                fel.setAttribute("class", "product-block detail-mode-permanent  main-image-loaded");
                if(i%2 == 0){
                    this.containerElement.firstElementChild.appendChild(fel);
                }
                else {
                    this.containerElement.lastChild.appendChild(fel);
                }
            }
            // var even = 0;
            // for(var i = 0; i < plength; i = i+2) {
            //     if(even%2 == 0){
            //         this.containerElement.firstElementChild.appendChild(productElements[i]);
            //         // this.containerElement.firstElementChild.insertAdjacentHTML('beforeend', productElements[i]);
            //     }
            //     else {
            //         this.containerElement.lastChild.appendChild(productElements[i]);
            //         // this.containerElement.lastChild.insertAdjacentHTML('beforeend', productElements[i]);
            //     }
            //     even++
            // }

            // card critical-clear has-animated card--reveal
            var newPagination = this.request.responseXML.querySelectorAll('div.pagination')[0]; 
            // var nodes = newContainer.innerHTML.childNodes;
            // console.log(newContainer.childNodes);
            // newContainer.querySelectorAll
            //var child = newContainer.firstElementChild.firstElementChild; 
            // for(var i = 2; i < plength; i++){
            //     if(i%2 == 0){
            //         console.log(child.innerHTML);
            //         this.containerElement.firstElementChild.insertAdjacentHTML('beforeend', child.innerHTML);
            //     }
            //     else {
            //         console.log(child.innerHTML);
            //         this.containerElement.lastChild.insertAdjacentHTML('beforeend', child.innerHTML);
            //     }
            //     child = child.nextSibling;
            // }
            // this.containerElement.firstElementChild.insertAdjacentHTML('beforeend', newContainer.firstElementChild.innerHTML); 
            // this.containerElement.lastChild.insertAdjacentHTML('beforeend', newContainer.lastChild.innerHTML);
            if (this.request.responseXML.querySelector('link[rel="next"]')){ 
                document.querySelector('link[rel="next"]').setAttribute("href", this.request.responseXML.querySelector('link[rel="next"]').href) 
            } else { 
                document.querySelector('link[rel="next"]').remove(); 
                /*document.querySelectorAll('#LazyLoader-Pagination')[0].remove();*/
            } 
            this.paginationElement.innerHTML = newPagination.innerHTML; 
            if (this.settings.callback && typeof this.settings.callback === 'function') { this.settings.callback(this.request.responseXML); }
            this.initialize();
        }
    }.bind(this); this.request.open('GET', this.nextPageUrl); this.request.responseType = 'document'; this.request.send();
}; Ajaxinate.prototype.removeClickListener = function removeClickEventListener() { this.nextPageLinkElement.addEventListener('click', this.stopMultipleClicks); }; Ajaxinate.prototype.removeScrollListener = function removeScrollEventListener() { document.removeEventListener('scroll', this.checkIfPaginationInView); window.removeEventListener('resize', this.checkIfPaginationInView); window.removeEventListener('change', this.checkIfPaginationInView); }; Ajaxinate.prototype.destroy = function removeEventListenersAndReturnThis() { var destroyers = { click: this.removeClickListener, scroll: this.removeScrollListener }; destroyers[this.settings.method](); return this; };