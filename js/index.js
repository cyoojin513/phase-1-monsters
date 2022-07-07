document.addEventListener("DOMContentLoaded", () => {


    //submit button
    const divCreateNew = document.querySelector("div#create-monster")
    const formCreateNew = document.createElement("form")
    const submitName = document.createElement("input")
    const submitAge = document.createElement("input")
    const submitDescription = document.createElement("input")
    const submitBtn = document.createElement("input")

    formCreateNew.id = "create-new-monster"

    // formCreateNew.innerHTML = 
        // "<input type=text id='submit-name'>name</input><input type=number id='submit-age'>age</input><input type=text id='submit-description>description</input>"

    submitName.id = "submit-name"
    submitName.placeholder = "name"
    submitName.type = "text"

    submitAge.id = "submit-age"
    submitAge.placeholder = "age"
    submitAge.type = "number"

    submitDescription.id = "submit-description"
    submitDescription.placeholder = "description"
    submitDescription.type = "text"

    submitBtn.type = "submit"

    formCreateNew.append(submitName, submitAge, submitDescription, submitBtn)
    divCreateNew.append(formCreateNew)
    

    //activate submit button
    formCreateNew.addEventListener('submit', (e) => {
        e.preventDefault()
        const newMonster = {
            name: e.target["submit-name"].value,
            age: e.target["submit-age"].value,
            description: e.target["submit-description"].value
        }
        postingNew(newMonster)
        creatingList(newMonster)
    })




    //show the list of monsters
    function creatingList(e) {
        const divContainer = document.querySelector('div#monster-container')
        const h2Name = document.createElement("h2")
        const h4Age = document.createElement("h4")
        const pDescription = document.createElement("p")

        h2Name.textContent = e.name
        h2Name.dataset.id = e.id
        h4Age.textContent = e.age
        pDescription.textContent = e.description

        divContainer.append(h2Name, h4Age, pDescription)

    }



    //post request
    function postingNew(newBio) {
        return fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newBio)
        }).then(res => res.json())
    }


     //fetch resources
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
    .then(res => res.json())
    .then(e => {e.forEach(creatingList)})


    
    //activate page button
    const pageForward = document.querySelector('button#forward')
    const pageBack = document.querySelector('button#back')

    pageForward.addEventListener('click', e => {loadLimitedMonster(+1)})
    pageBack.addEventListener('click', e => {loadLimitedMonster(-1)})


    function loadLimitedMonster(page){
        return fetch(`http://localhost:3000/monsters/?_limit=50&_page=1${page}`)
        .then(res => res.json())
        .then(e => {e.forEach(updatingList)})
    }


    function updatingList(e) {
        const divContainer = document.querySelector('div#monster-container')
        const h2Name = document.createElement("h2")
        const h4Age = document.createElement("h4")
        const pDescription = document.createElement("p")

        const h2 = document.querySelector('div#monster-container h2')
        const h4 = document.querySelector('div#monster-container h4')
        const p = document.querySelector('div#monster-container p')

        divContainer.removeChild(h2)
        divContainer.removeChild(h4)
        divContainer.removeChild()

        h2Name.textContent = e.name
        h2Name.dataset.id = e.id
        h4Age.textContent = e.age
        pDescription.textContent = e.description

        divContainer.append(h2Name, h4Age, pDescription)

    }


})