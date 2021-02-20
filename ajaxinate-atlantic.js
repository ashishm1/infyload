'use strict'; var Ajaxinate = function ajaxinateConstructor(config) { var settings = config || {}; var defaultSettings = { pagination: '.AjaxinatePagination', method: 'scroll', container: '.AjaxinateLoop', offset: 0, loadingText: 'Loading', callback: null, orientation: 'ul.product-list' }; this.settings = Object.assign(defaultSettings, settings); this.addScrollListeners = this.addScrollListeners.bind(this); this.addClickListener = this.addClickListener.bind(this); this.checkIfPaginationInView = this.checkIfPaginationInView.bind(this); this.stopMultipleClicks = this.stopMultipleClicks.bind(this); this.destroy = this.destroy.bind(this); this.containerElement = document.querySelector(this.settings.container); this.paginationElement = document.querySelector(this.settings.pagination); this.initialize(); }; Ajaxinate.prototype.initialize = function initializeTheCorrectFunctionsBasedOnTheMethod() { if (this.containerElement) { var initializers = { click: this.addClickListener, scroll: this.addScrollListeners }; initializers[this.settings.method](); } }; Ajaxinate.prototype.addScrollListeners = function addEventListenersForScrolling() { if (this.paginationElement) { document.addEventListener('scroll', this.checkIfPaginationInView); window.addEventListener('resize', this.checkIfPaginationInView); window.addEventListener('orientationchange', this.checkIfPaginationInView); } }; Ajaxinate.prototype.addClickListener = function addEventListenerForClicking() { if (this.paginationElement) { this.nextPageLinkElement = this.paginationElement.querySelector('a'); this.clickActive = true; if (this.nextPageLinkElement !== null) { this.nextPageLinkElement.addEventListener('click', this.stopMultipleClicks); } } }; Ajaxinate.prototype.stopMultipleClicks = function handleClickEvent(event) { event.preventDefault(); if (this.clickActive) { this.nextPageLinkElement.innerHTML = this.settings.loadingText; if (this.nextPageLinkElement) {this.nextPageUrl = this.nextPageLinkElement.href; this.clickActive = false; this.loadMore();} } }; Ajaxinate.prototype.checkIfPaginationInView = function handleScrollEvent() { var top = this.paginationElement.getBoundingClientRect().top - this.settings.offset; var bottom = this.paginationElement.getBoundingClientRect().bottom + this.settings.offset; if (top <= window.innerHeight && bottom >= 0) { this.nextPageLinkElement = this.paginationElement.querySelector('a'); this.removeScrollListener(); if (this.nextPageLinkElement) { this.nextPageLinkElement.innerHTML = this.settings.loadingText; var nextpagelink = document.querySelector('link[rel="next"]'); if(nextpagelink) {this.nextPageUrl = nextpagelink.href; this.loadMore();} } } }; Ajaxinate.prototype.loadMore = function getTheHtmlOfTheNextPageWithAnAjaxRequest() {
    this.request = new XMLHttpRequest(); this.request.onreadystatechange = function success() {
        if (this.request.readyState === 4 && this.request.status === 200) {
            var newContainer = this.request.responseXML.querySelectorAll(this.settings.orientation)[0];
            /*if(document.querySelectorAll('nav.pagination')){ document.querySelectorAll('nav.pagination')[0].remove();} */
            var newPagination = this.request.responseXML.querySelectorAll('ul.pagination')[0]; 
            
            this.containerElement.insertAdjacentHTML('beforeend', newContainer.innerHTML); 
            var productElements = document.querySelectorAll('.product-card-figure');
            for (var i = 0; i < productElements.length; i++) {
                var fel = productElements[i];            
				if(fel.querySelectorAll('img')[0]){
                    fel.querySelectorAll('img')[0].removeAttribute("srcset");
                }
                if(fel.querySelectorAll('img')[1]){
                    var lp = $(fel).find("img")[1];
                    $(lp).attr("srcset", "");
                    fel.querySelectorAll('img')[1].removeAttribute("srcset")
                }
                
            }
            var cont = document.getElementsByClassName('product-list');

            if (this.request.responseXML.querySelector('link[rel="next"]')){ 
                document.querySelector('link[rel="next"]').setAttribute("href", this.request.responseXML.querySelector('link[rel="next"]').href) 
            } 
            else { 
                document.querySelector('link[rel="next"]').remove(); 
                /*document.querySelectorAll('#LazyLoader-Pagination')[0].remove();*/
            } 
            this.paginationElement.innerHTML = newPagination.innerHTML; 
            if (this.settings.callback && typeof this.settings.callback === 'function') { 
                this.settings.callback(this.request.responseXML); 
            }
            this.initialize();
        }
    }.bind(this); this.request.open('GET', this.nextPageUrl); this.request.responseType = 'document'; this.request.send();
}; Ajaxinate.prototype.removeClickListener = function removeClickEventListener() { this.nextPageLinkElement.addEventListener('click', this.stopMultipleClicks); }; Ajaxinate.prototype.removeScrollListener = function removeScrollEventListener() { document.removeEventListener('scroll', this.checkIfPaginationInView); window.removeEventListener('resize', this.checkIfPaginationInView); window.removeEventListener('change', this.checkIfPaginationInView); }; Ajaxinate.prototype.destroy = function removeEventListenersAndReturnThis() { var destroyers = { click: this.removeClickListener, scroll: this.removeScrollListener }; destroyers[this.settings.method](); return this; };
