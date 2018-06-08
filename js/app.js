


(function () {

    var allowed_pages = ["#home", "#menu", "#search", "#sobre", "#submeter", "#contactos", "#arquivo", "#perdidoseachados"];
    var app = {
        data: {
            currentPage: "",
        },
        get page() {
            return this.data.currentPage
        },
        set page(value) {
            if (allowed_pages.indexOf(value) != -1) {
                var previousPage = this.page;

                this.data.currentPage = value;
                if (document.querySelector(".page-active")) {
                    var element = document.querySelector(".page-active");
                    element.classList.remove("page-active")
                }
                //window.location.hash = value;
                document.querySelector("[data-page='" + this.data.currentPage + "']").classList.add("page-active")

                if (app.page == "#menu") {
                    document.querySelector("#toggle").checked = true;
                    document.querySelector("[data-sidebar]").href = previousPage;

                } else {
                    document.querySelector("#toggle").checked = false;
                    document.querySelector("[data-sidebar]").href = "#menu"

                }



                if (app.pagesHandlers[app.page]) {
                    app.pagesHandlers[app.page]()
                }

            } else {
                window.location.hash = "#home"
            }
        },
        pagesHandlers: {
            "#home": function () {
                document.querySelector("#footer").style.display = "none"

                if (app.page != "#home") {
                    document.querySelector(".slider").removeEventListener("mousemove", transitionBetweenImages)
                    return;
                }

                function transitionBetweenImages(e) {
                    if (app.page != "#home") {
                        return;
                    }
                    console.log(e)

                    var windowWidth = window.innerWidth;
                    var cursorX = e.clientX;
                    var currentPercentage = (cursorX / windowWidth) * 100;
                    document.querySelector(".slide-before").style.width = currentPercentage + "%"
                }

                if (document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.remove("invert-color")
                }

                document.querySelector(".slider").addEventListener("mousedown", function (e) {
                    document.querySelector(".slider").addEventListener("mousemove", transitionBetweenImages)
                })

                document.querySelector(".slider").addEventListener("mouseup", function (e) {
                    document.querySelector(".slider").removeEventListener("mousemove", transitionBetweenImages)
                })
            },
            "#menu": function () {

                var corCorrespondente = document.querySelector("a[href='" + window.location.hash + "']").getAttribute("data-color")
                localStorage.cor = corCorrespondente;
                document.dispatchEvent(evento)

                document.querySelector("#footer").style.display = "none"
                document.title = "Menu - Arquivo Nacional da Paisagem"
                document.querySelector(".slide-before").style.width = 50 + "%";
                document.querySelector(".page-title").style.display = "none"
                if (document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.remove("invert-color")
                }
            },
            "#sobre": function () {
                document.querySelector("#footer").style.display = "inline-block"

                document.querySelector(".page-title").textContent = "Sobre o Arquivo";
                document.querySelector(".page-title").style.display = "inline-block"
                document.title = "Sobre o Arquivo - Arquivo Nacional da Paisagem"
                if (!document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.add("invert-color")
                }
            },
            "#submeter": function () {
                document.querySelector("#footer").style.display = "inline-block"

                document.querySelector(".page-title").textContent = "Submissão de Registo";
                document.querySelector(".page-title").style.display = "inline-block"
                document.title = "Submissão de Registo - Arquivo Nacional da Paisagem"
                if (!document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.add("invert-color")
                }
            },
            "#contactos": function () {
                document.querySelector("#footer").style.display = "inline-block"
                document.querySelector(".page-title").textContent = "Contactos";
                document.querySelector(".page-title").style.display = "inline-block"
                document.title = "Contactos - Arquivo Nacional da Paisagem"
                if (!document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.add("invert-color")
                }
            },

            "#arquivo": function () {
                document.querySelector("#footer").style.display = "inline-block"

                document.querySelector(".page-title").textContent = "Arquivo";
                document.querySelector(".page-title").style.display = "inline-block"
                document.title = "Arquivo - Arquivo Nacional da Paisagem"
                if (!document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.add("invert-color")
                }
            },

            "#perdidoseachados": function () {
                document.querySelector("#footer").style.display = "inline-block"

                document.querySelector(".page-title").textContent = "Perdidos e Achados";
                document.querySelector(".page-title").style.display = "inline-block"
                document.title = "Perdidos e Achados - Arquivo Nacional da Paisagem"
                if (!document.querySelector(".page-menu").classList.contains("invert-color")) {
                    document.querySelector(".page-menu").classList.add("invert-color")
                }
            }
        }
    };

    // instanciate new modal
    var modal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['modal'],
    });

    modal.setContent(document.querySelector("#tingle-modal-content").outerHTML);

    var seeMoreAbout = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['modal'],
    });

    seeMoreAbout.setContent(document.querySelector("#seeMore").outerHTML);


    var evento = document.createEvent("Event");
    evento.initEvent("colorChange", true, true)

    window.addEventListener("hashchange", function () {
        app.page = window.location.hash
        app.color = window.location;
        var corCorrespondente = document.querySelector("a[href='" + window.location.hash + "']").getAttribute("data-color")
        localStorage.cor = corCorrespondente;
        document.dispatchEvent(evento)
    })

    document.addEventListener("colorChange", function () {
        document.querySelector(".overlay ").setAttribute("data-color", localStorage.cor)
        document.querySelector("video").setAttribute("src", "video/logo_" + localStorage.cor + ".webm");

    })

    app.page = window.location.hash;


    var corCorrespondente = document.querySelector("a[href='" + window.location.hash + "']").getAttribute("data-color")
    localStorage.cor = corCorrespondente;
    document.dispatchEvent(evento)


    document.querySelector(".arquivo-button").onclick = function () {
        modal.open();
    }

    document.querySelector(".tingle-close").onclick = function () {
        modal.close();
    }

    document.querySelector(".tingle-close-seemore").onclick = function () {
        seeMoreAbout.close();
    }
        
    document.querySelector(".arquivo-page").addEventListener("click", function (e) {
    if (e.target.classList.contains("thumbnail-wrapper")) {
        seeMoreAbout.open()
    }
})



})()


// Flexbox gallery

var images = [
    "img/galeria/01.jpg",
    "img/galeria/02.jpg",
    "img/galeria/03.jpg",
    "img/galeria/04.jpg",
    "img/galeria/05.jpg",
    "img/galeria/06.jpg",
    "img/galeria/07.jpg",
    "img/galeria/08.jpg",
    "img/galeria/09.jpg",
    "img/galeria/10.jpg",
    "img/galeria/11.jpg",
    "img/galeria/12.jpg",
    "img/galeria/13.jpg",
    "img/galeria/14.jpg",
    "img/galeria/15.jpg",
    "img/galeria/16.jpg",
    "img/galeria/12.jpg",
    "img/galeria/13.jpg",
    "img/galeria/14.jpg",
];



var gallery = document.getElementById("gallery");
var gallery2 = document.getElementById("gallery2");

for (var i = 0; i < images.length; i++) {
    var rand = Math.floor(Math.random() * 4)

    var thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.className = "thumbnail-wrapper";
    var orderedClass = "thumb-" + rand
    thumbnailWrapper.classList.add(orderedClass)


    var thumbnail = document.createElement("a");
    thumbnail.className = "thumbnail";
    thumbnail.setAttribute("style", 'background-image:url("' + images[i] + '");');
    thumbnail.setAttribute("href", images[i]);

    thumbnailWrapper.appendChild(thumbnail);
    gallery.appendChild(thumbnailWrapper);

}



for (var i = 0; i < images.length; i++) {
    var rand = Math.floor(Math.random() * 4)

    var thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.className = "thumbnail-wrapper";
    var orderedClass = "thumb-" + rand
    thumbnailWrapper.classList.add(orderedClass)

    var thumbnail = document.createElement("a");
    thumbnail.className = "thumbnail";
    thumbnail.setAttribute("style", 'background-image:url("' + images[i] + '");');
    thumbnail.setAttribute("href", images[i]);

    thumbnailWrapper.appendChild(thumbnail);
    gallery2.appendChild(thumbnailWrapper);

}
console.log(gallery);



// Expand description
document.querySelector('#lermais').addEventListener('click', function () {
    document.querySelector('.description.expanded').classList.toggle('expand');
});
