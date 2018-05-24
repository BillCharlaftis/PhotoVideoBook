class list{
    constructor(parent){
        this.root = document.createElement("ul");
        this.root.id = "list";
        this.root.classList.add("w3-ul");
        this.root.classList.add("w3-card-4");
        parent.appendChild(this.root);
    }

    createListRow(id,name, comment){
        let li = document.createElement("li");
        li.id = id;
        li.width="25vw";
        li.classList.add("w3-bar");
        li.classList.add("w3-animate-opacity");
        let img = document.createElement("img");
        img.src = '/pic/expert/'+id;
        img.classList.add("w3-bar-item");
        img.classList.add("w3-circle");
        img.classList.add("w3-hide-small");
        img.style.width="85px";
        let div = document.createElement("div");
        div.classList.add("w3-bar-item");
        let h2 = document.createElement("h2");
        h2.classList.add("w3-large");
        h2.appendChild(document.createTextNode(name));
        h2.appendChild(document.createElement("br"));
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(comment));
        li.appendChild(img);
        li.appendChild(div);
        div.appendChild(h2);
        div.appendChild(p);
        return li;
    }

    createList(json){
        for(var i in json) {
            this.root.appendChild(this.createListRow(json[i].id,json[i].brand,json[i].description));
         }
    }
}