class customAlert {
    constructor(ALERT_TITLE, ALERT_BUTTON_TEXT, ALERT_MESSAGE) {
        this.ALERT_TITLE = ALERT_TITLE;
        this.ALERT_BUTTON_TEXT = ALERT_BUTTON_TEXT;
        this.ALERT_MESSAGE = ALERT_MESSAGE;
    }

    createModal() {
        if (document.getElementById("modalContainer")) {
            return;
        }

        let modalContainer = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
        modalContainer.id = "modalContainer";
        modalContainer.style.height = document.documentElement.scrollHeight + "px";
        modalContainer.style.backgroundColor = "rgba(95,95,95, 0.8)";
        modalContainer.style.position = "absolute";
        modalContainer.style.width = "100vw";
        modalContainer.style.height = "100vh";
        modalContainer.style.top = "0vh";
        modalContainer.style.left = "0vw";
        modalContainer.style.zIndex = "10000";
        modalContainer.style.position = "fixed";

        return modalContainer;
    }

    createAlertBox(modalContainer) {
        let alertBox = modalContainer.appendChild(document.createElement("div"));
        alertBox.id = "alertBox";
        alertBox.style.position = "relative";
        alertBox.style.width = modalContainer.style.width;
        alertBox.style.textAlign = "center";
        alertBox.style.minHeight = modalContainer.style.minHeight;
        alertBox.style.marginTop = "50px";
        alertBox.style.border = "1px solid #666";
        alertBox.style.backgroundColor = "#fff";
        alertBox.style.backgroundRepeat = "no-repeat";
        alertBox.style.backgroundPosition = "20px 30px";
        alertBox.style.borderBottom = "2px inset #F7B332";
        // alertBox.style.style.position = "fixed";

        if (document.all && !window.opera) {
            alertBox.style.top = document.documentElement.scrollTop + "px";
        }

        alertBox.style.left = (document.documentElement.scrollWidth - alertBox.offsetWidth) / 2 + "px";
        alertBox.style.visiblity = "visible";

        return alertBox;
    }

    createHeader() {
        let h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode(this.ALERT_TITLE));
        h1.style.margin = "0";
        h1.style.font = "bold 0.9em verdana,arial";
        h1.style.borderBottom = "2px inset #F7B332";
        h1.style.padding = "2px 0 2px 5px";

        return h1;
    }

    createCloseBtn(self, alertBox) {
        this.createCloseBtn(selft,alertBox, this.ALERT_MESSAGE);
    }

    createCloseBtn(self, alertBox ,txt) {
        let closeBtn = alertBox.appendChild(document.createElement("a"));
        closeBtn.id = "closeBtn";
        closeBtn.appendChild(document.createTextNode(txt));
        closeBtn.href = "#";
        closeBtn.focus();
        closeBtn.style.display = "block";
        closeBtn.style.position = "relative";
        closeBtn.style.margin = "5px auto";
        closeBtn.style.padding = "7px";
        closeBtn.style.border = "0 none";
        closeBtn.style.width = "70px";
        closeBtn.style.font = "0.7em verdana,arial";
        closeBtn.style.textTransform = "uppercase";
        closeBtn.style.textAlign = "center";
        closeBtn.style.borderRadius = "3px";
        closeBtn.style.textDecoration = "none";

        closeBtn.addEventListener("click", function () {
            self.removeCustomAlert();
            return false;
        });
        return closeBtn;
    }

    alert() {
        let modalContainer = this.createModal();
        let alertBox = this.createAlertBox(modalContainer);
        alertBox.appendChild(this.createHeader());

        let par = alertBox.appendChild(document.createElement("p"));
        par.id = "hide";
        par.appendChild(document.createTextNode(this.ALERT_MESSAGE));

        alertBox.appendChild(this.createCloseBtn(this, alertBox));
    }

    alert(div){
        let modalContainer = this.createModal();
        div.appendChild(this.createCloseBtn(this, modalContainer,"Άκυρο"));
        modalContainer.appendChild(div);
        
    }

    removeCustomAlert() {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
    }
}


