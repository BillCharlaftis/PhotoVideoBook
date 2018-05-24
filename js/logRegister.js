class logRegister {
    constructor() {
        let rootDiv = document.createElement("div");
        rootDiv.classList.add("w3-container");
        rootDiv.classList.add("w3-light-grey");
        rootDiv.classList.add("w3-padding-32");
        rootDiv.classList.add("w3-padding-large");
        rootDiv.style.backgroundColor = "#fff";
        rootDiv.style.width = '25vw';
        rootDiv.style.margin = '30px auto';
        rootDiv.style.padding = '10px';
        rootDiv.style.borderRadius = '10px';
        rootDiv.appendChild(this.createContent());
        this.modal = new customAlert();
        this.modal.alert(rootDiv);
    }

    createContent() {
        let div = document.createElement("div");
        div.classList.add("w3-row");
        div.appendChild(this.aDiv("Είσοδος"));
        div.appendChild(this.aDiv("Εγραφή"));
        div.appendChild(this.loginTab());
        div.appendChild(this.regTab());
        div.appendChild(this.messageContainer());
        return div;
    }

    aDiv(txt) {
        let that = this;
        let a = document.createElement("a");
        a.href = "javascript:void(0)";
        a.id = txt;
        a.onclick = function () { that.changeTab(a.id) };
        let div = document.createElement("div");
        div.classList.add("w3-third");
        div.classList.add("w3-padding");
        div.style.borderWidth = "0 0 10px";
        div.style.borderColor = "#F7B332";
        div.appendChild(document.createTextNode(txt));
        a.appendChild(div);
        return a;
    }

    loginTab() {
        let log = document.createElement('div');
        log.id = "login";
        log.classList.add("w3-container");
        log.style.display = "block";
        log.appendChild(this.createLoginForm());
        return log;
    }

    createLoginForm() {
        let loginForm = document.createElement('div');
        loginForm.style.margin = '50px 20px 20px 20px';
        loginForm.id = 'loginForm';
        this.labelBrInputBr(loginForm, "E-mail", "logMail", "email");
        this.labelBrInputBr(loginForm, "Password", "logPass", "password");
        loginForm.appendChild(this.createSubmitButton());
        loginForm.appendChild(document.createElement("br"));
        return loginForm;
    }

    regTab() {
        let reg = document.createElement('div');
        reg.id = 'register';
        reg.classList.add("w3-container");
        reg.style.display = "none";
        reg.appendChild(this.createRegForm());
        return reg;
    }

    createRegForm() {
        let registerForm = document.createElement('div');
        registerForm.style.margin = '50px 20px 20px 20px';
        registerForm.id = 'registerForm';
        this.labelBrInputBr(registerForm, "First Name", "name", "text");
        this.labelBrInputBr(registerForm, "Last Name", "surname", "text");
        this.labelBrInputBr(registerForm, "E-mail", "mail", "email");
        this.labelBrInputBr(registerForm, "Password", "pass", "password");
        registerForm.appendChild(this.createSubmitButton());
        registerForm.appendChild(document.createElement("br"));
        return registerForm;
    }

    labelBrInputBr(form, lblText, InputId, InputType) {
        var label = document.createElement("label");
        label.appendChild(document.createTextNode(lblText))
        form.appendChild(label);
        form.appendChild(document.createElement("br"));
        var input = document.createElement("input");
        input.id = InputId;
        input.type = InputType;
        input.placeholder = lblText;
        input.style.borderColor = "#F7B332";
        input.style.borderWidth = "0 0 2px";
        input.style.width = "100%";
        input.style.padding = "5px";
        input.style.margin = "5px";
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
    }

    createSubmitButton() {
        var submit = document.createElement("button")
        submit.style.border = "#F7B332";
        submit.style.width = "100%";
        submit.style.padding = "5px";
        submit.style.margin = "5px";
        submit.appendChild(document.createTextNode("Είσοδος"));
        let that = this;
        submit.onclick = function () { that.post() };
        return submit;
    }

    messageContainer() {
        var p = document.createElement("p");
        p.id = "message";
        p.style.width = "100%";
        p.style.padding = "5px";
        p.style.textAlign = "center";
        p.appendChild(document.createTextNode("Συμπληρώστε όλα τα παραπάνω πεδία "));
        return p;
    }

    changeTab(id) {
        let log = document.getElementById("login");
        let reg = document.getElementById("register");
        if (id === "Είσοδος") {
            reg.style.display = "none";
            log.style.display = "block";
        } else {
            log.style.display = "none";
            reg.style.display = "block";
        }
    }

    post() {
        var Json, url;
        if (document.getElementById("login").style.display === "block") {
            console.log("Login");
            Json = { mail: document.getElementById("logMail").value, password: document.getElementById("logPass").value };
            url = "/login";
        } else {
            console.log("Register");
            Json = { name: document.getElementById("name").value, surname: document.getElementById("surname").value, mail: document.getElementById("mail").value, password: document.getElementById("pass").value };
            url = "/register";
        }

        console.log(Json);
        let xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        var that = this;
        xhr.onreadystatechange = function (e) {
            if (e.target.readyState === 4 && e.target.status === 200) {
                that.choose(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(JSON.stringify(Json));
    }

    choose(returnedValue) {
        console.log(returnedValue.code);
        if (returnedValue.code === 200) {
            this.modal.removeCustomAlert();
            // document.getElementById("LoginOrProfile").innerHTML = getCookie("first_name");
            console.log(getCookie("first_name"));
        }
        if (returnedValue.code === 201) {
            this.changeTab("Είσοδος");
        }
    }
}

function initLogRegister() {
    new logRegister();
}

