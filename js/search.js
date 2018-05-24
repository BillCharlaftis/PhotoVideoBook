class search {
    constructor() {
        this.rootDiv = document.createElement("div");
        this.rootDiv.classList.add("w3-container");
        this.rootDiv.classList.add("w3-light-grey");
        this.rootDiv.classList.add("w3-padding-32");
        this.rootDiv.classList.add("w3-padding-large");
        this.rootDiv.id = "search";
        var div1 = document.createElement("div");
        div1.id = "searchWrapper"
        div1.classList.add("w3-content");
        div1.style.maxWidth = "600px";
        div1.appendChild(this.createH4());
        div1.appendChild(this.createDivType());
        this.rootDiv.appendChild(div1);
        document.getElementById("content").appendChild(div1);
    }

    clear(){
        this.removeFadeOut(document.getElementById("searchWrapper"));
        this.removeFadeOut(document.getElementById("SearchButton"));
    }

    createH4() {
        var h4 = document.createElement("h4");
        var b = document.createElement("b");
        b.appendChild(document.createTextNode("Αναζήτηση Επαγγελματίων"));
        h4.classList.add("w3-center");
        h4.appendChild(b);
        h4.classList.add("w3-animate-opacity");
        return h4;
    }

    createDivType() {
        let that = this;
        var div = document.createElement("div");
        div.classList.add("w3-section");
        var label = document.createElement("label");
        label.appendChild(document.createTextNode("Τύπος Γεγονότος"));
        var select = document.createElement("select");
        select.id = "TypeSelect";
        select.classList.add("w3-input");
        select.classList.add("w3-border");
        select.classList.add("w3-white");
        var op0 = this.createOptions("-", "Επιλέξτε");
        var op1 = this.createOptions("wedding", "Γάμος");
        var op2 = this.createOptions("baptism", "Βάπτιση");
        var op3 = this.createOptions("weddingAndBaptism", "Γάμος και Βάπτιση");
        var op4 = this.createOptions("event", "Εκδήλωση");
        select.appendChild(op0);
        select.appendChild(op1);
        select.appendChild(op2);
        select.appendChild(op3);
        select.appendChild(op4);
        select.onchange = function () { that.selector(select.value) };
        div.appendChild(label);
        div.appendChild(select);
        div.classList.add("w3-animate-opacity");
        return div;
    }

    createOptions(value, text) {
        var op = document.createElement("option");
        op.value = value;
        op.appendChild(document.createTextNode(text));
        return op;
    }

    createDivDate() {
        let that = this;
        var div = document.createElement("div");
        div.id = "Date";
        div.classList.add("w3-section");
        div.classList.add("w3-animate-opacity");
        var label = document.createElement("label");
        label.appendChild(document.createTextNode("Ημέρα"));
        var input = document.createElement("input");
        input.classList.add("w3-input");
        input.classList.add("w3-border");
        input.type = "date";
        input.name = "date";
        input.required = true;
        input.onchange = function () { that.Dater(input.value) };
        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    createDivPlace() {
        var div = document.createElement("div");
        div.id = "Map";
        div.classList.add("w3-section");
        var label = document.createElement("label");
        label.appendChild(document.createTextNode("Τοποθεσία"));
        var input = document.createElement("input");
        input.id = "pac-input";
        input.classList.add("controls");
        input.classList.add("w3-border");
        input.classList.add("w3-input");
        input.type = "text";
        input.placeholder = "Τοποθεσία";
        var div1 = document.createElement("div");
        div1.classList.add("w3-input");
        div1.classList.add("w3-border");
        div1.classList.add("w3-white");
        div1.id = "map";
        div1.style.maxWidth = "600px";
        div1.style.height = "343px";
        div1.required = true;
        if (document.getElementById("gmaps") === null) {
            var script = document.createElement("script");
            script.id = "gmaps";
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAmMnxgN5Wji4f1VBc_XtPrOtCIyGQb1m0&callback=initMap&language=gr&region=GR&libraries=places";
        }
        div.appendChild(script);
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(div1);
        div.classList.add("w3-animate-opacity");
        return div;
    }

    createButton() {
        let that = this;
        var button = document.createElement("button");
        button.id = "SearchButton";
        button.appendChild(document.createTextNode("Αναζήτηση"));
        button.style.maxWidth = "600px";
        button.classList.add("w3-button");
        button.classList.add("w3-block");
        button.classList.add("w3-border");
        button.classList.add("w3-white");
        button.classList.add("w3-animate-opacity");
        button.classList.add("w3-content");
        button.onclick = function () { that.postSearchParams() };
        document.getElementById("content").appendChild(button);
    }

    createEventCheckbox() {
        var that = this;
        var div = document.createElement("div");
        div.id = "eventCheckboxDiv";
        div.classList.add("w3-section");
        var chbx = document.createElement("input");
        chbx.id = "eventCheckBox";
        chbx.name = "eventCheckBox";
        chbx.classList.add("w3-animate-opacity");
        chbx.type = "checkbox";
        chbx.onchange = function () { that.checker(chbx.checked) };
        var lbl = document.createElement("label");
        lbl.appendChild(document.createTextNode("Ακολουθεί Δεξίωση"));
        lbl.id = "eventCheckBoxLabel";
        lbl.name = "eventCheckBoxLabel";
        lbl.classList.add("w3-animate-opacity");
        div.appendChild(chbx);
        div.appendChild(lbl);
        return div;
    }

    checker(check) {
        this.eventChecked = check;
    }

    Dater(date) {
        this.date = date;
    }
    selector(option) {
        var div = document.getElementById("searchWrapper");
        this.selectOption = option;

        if (option === "wedding" || option === "baptism" || option === "weddingAndBaptism") {
            this.addMysteryFeatures(div);
        }

        if (option === "event") {
            this.addEventFeatures(div);
            if (document.getElementById("eventCheckboxDiv") !== null) {
                this.removeFadeOut(document.getElementById("eventCheckboxDiv"));
            }
            if (document.getElementById("SearchButton") === null) {
                div.appendChild(this.createButton());
            }
        }

        if (option === "-") {
            this.removeFeatures();
        }
    }

    addMysteryFeatures(div) {
        this.addEventFeatures(div);
        if (document.getElementById("eventCheckboxDiv") === null) {
            div.appendChild(this.createEventCheckbox());
        }
        if (document.getElementById("SearchButton") === null) {
            this.createButton();
        }
    }

    addEventFeatures(div) {
        if (document.getElementById("Date") === null) {
            div.appendChild(this.createDivDate());
            div.appendChild(this.createDivPlace());
        }
    }

    removeFeatures() {
        if (document.getElementById("Date") !== null) {
            this.removeFadeOut(document.getElementById("Date"));
            this.removeFadeOut(document.getElementById("Map"));
            this.removeFadeOut(document.getElementById("SearchButton"));
            this.removeFadeOut(document.getElementById("eventCheckboxDiv"));
        }
    }

    removeFadeOut(el) {
        el.style.transition = "opacity 0.8s ease";

        el.style.opacity = 0;
        setTimeout(function () {
            el.remove();
        }, 810);
    }

    postSearchParams() {
        if (this.date === undefined || mp.getPlace() === undefined) {
            new customAlert("Δεν έχουν συμπηρωθεί τα κατάληλα πεδία","close","Πρέπει να συμπηρωθούν όλα τα κατάληλα πεδία").alert();
        } else {
            var searchParams = { day: this.date, place: mp.getPlace(), event: this.eventChecked, type: this.selectOption };
            let xhr = new XMLHttpRequest();
            let url = "/search";
            xhr.open("post", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            let context = this;
            context.clear();
            xhr.onreadystatechange = function (e) {
                if (e.target.readyState === 4 && e.target.status === 200) {
                    let returnedJson = JSON.parse(xhr.responseText);
                    setTimeout(function(){new list(document.getElementById('content')).createList(returnedJson);}, 820)
                }
            };
            xhr.send(JSON.stringify(searchParams));
        }
    }
}

function init() {
    new search();
}

init();