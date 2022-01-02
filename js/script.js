(function () {

    'use strict'

    const form = {
        formId: null,
        obj: {},
        formInputs: {},
        chbox: null,

        init(putFormId) {

            this.formId = document.querySelector(putFormId);
            if (!this.formId || this.formId.nodeName !== `FORM`) throw new Error(`ID is not valid`);
            
            this.formInputs = document.querySelectorAll(`input:not([name=terms])`); // ?? fix it
            this.chbox = document.querySelector(`.form-check-input`)
            

            this.addListener(this.chbox, `change`, this.onChangeEvent);
            return this.addListener(this.formId, `submit`, this.submitEvent);

        },

        addListener(elem, eventType, callbackFunc) {
            elem.addEventListener(eventType, callbackFunc.bind(this));
        },

        onChangeEvent() {
            this.chbox.style.boxShadow = `0 0 0 0.25rem rgb(13 110 253 / 25%)`;
            this.chbox.style.borderColor = `#86b7fe`;
            this.addListener(this.chbox, `blur`, this.blurEvent);

            return this.chbox.checked;
        },

        blurEvent(event) {
            event.target.style.boxShadow = ``;
            event.target.style.borderColor = ``;
        },

        submitEvent(event) {
            event.preventDefault();

            this.formInputs.forEach(item => {
                this.obj[item.name] = item.value;
            });
            
            if (this.onChangeEvent()) return this.toLocalStorage(this.obj)
            else {
                this.chbox.style.boxShadow = `0 0 0 0.25rem hsla(0, 94%, 79%, 0.548)`;
                this.chbox.style.borderColor = `hsla(0, 94%, 79%, 0.548)`;
            } 
        },


        toLocalStorage(object) {
            const storageJson = JSON.stringify(object);
            localStorage.setItem(`formInputs`, storageJson);
            document.location.href = "./result.html";
        }
    }

    form.init(`#form`);


})()

