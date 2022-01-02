(function () {
    'use strict'

    document.addEventListener(`DOMContentLoaded`, event => {
        newObj.init(`formInputs`)
    })

    const newObj = {
        ul: null,
        container: null,

        init(jsonKey) {

            if (!localStorage.getItem(jsonKey)) throw new Error(`LocalStorage has not such data`);

            this.container = document.querySelector(`.container`);
            const data = JSON.parse(localStorage.getItem(jsonKey))

            this.checkData(data);
           
            return this.createElements(data);
        },

        checkData(dataObject) {
            for (let i in dataObject) {
                if (!dataObject[i]) {
                    console.log(dataObject[i]);
                    this.createErrorMessage()
                    this.createClearButton(this.container);
                    throw new Error(`Some inputs were not filled`);
                }
            }
        },

        createErrorMessage() {
            const h1 = document.createElement(`h1`);
            h1.innerHTML = `ERROR 404`;
            h1.style.textAlign = `center`;
            const p = document.createElement(`p`);
            p.innerHTML = `We have not found some imputs data`;
            p.style.textAlign = `center`;
            this.container.style.marginTop = `30vh`

            this.container.prepend(h1)
            this.container.append(p)
        },

        createElements(innerData) {

            this.ul = document.createElement(`ul`);
            this.container.prepend(this.ul);
            let li;
            
            for (let i in innerData) {
                
                if (!innerData[i]) continue;
                
                li = document.createElement(`li`);
                this.addLiStyle(li);
                li.innerHTML = `${i}: ${innerData[i]}`;
                this.ul.append(li)
            }
            
            return this.addUlStyle(this.ul)
        },

        addUlStyle(ulItem) {
            this.container.style.textAlign = `center`;
        
            ulItem.style.cssText = `
            list-style: none;
            display: inline-block;
            border: 1px solid #777;
            padding: 20px;
            border-radius: 10px;
            `;
            return this.createClearButton(this.ul)   
        },

        createClearButton(block) {
            const button = document.createElement(`button`);
            button.innerHTML = `Clear localStorage`
            button.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            block.after(button);

            button.addEventListener(`click`, event => {
                localStorage.clear()
                document.location.href = "./index.html"
            })

        },

        addLiStyle(li) {
            li.style.cssText = `
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;
            margin: 10px 0 10px;
            text-align: left;
            `;
        }
    }


})()