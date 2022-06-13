'use strict';

// SELECTORS
// Inputs
let addMonsterName = document.querySelector("#monsterName");
let addMonsterFamily = document.querySelector("#monsterFamily");
let addMonsterDiet = document.querySelector("#monsterDiet");
let addMonsterFlight = document.querySelector("#monsterFlight");
let addMonsterSwim = document.querySelector("#monsterSwim");
let addMonsterOrigin = document.querySelector("#monsterOrigin");
let searchMonsterFamily = document.querySelector("#searchByFamily");
let searchMonsterDiet = document.querySelector("#searchByDiet");
let updateMonsterName = document.querySelector("#updateMonsterName");
let updateMonsterFamily = document.querySelector("#updateMonsterFamily");
let updateMonsterDiet = document.querySelector("#updateMonsterDiet");
let updateMonsterFlight = document.querySelector("#updateMonsterFlight");
let updateMonsterSwim = document.querySelector("updateMonsterSwim");
let updateMonsterOrigin = document.querySelector("updateMonsterOrigin");

// Buttons
let addMonsterButton = document.querySelector("#addMonster");
let searchFamilyButton = document.querySelector("#searchFamily");
let searchDietButton = document.querySelector("#searchDiet");
let updateMonsterButton = document.querySelector("#updateMonster")

// Divs
let inputFormDiv = document.querySelector("#inputDiv");
let dataDiv = document.querySelector("#dataDiv");
let monsterAddForm = document.querySelector("#monsterAddForm");
let familySearchModal = document.querySelector("#familySearchModal");
let dietSearchModal = document.querySelector("dietSearchModal");
let modalFamilyContent = document.querySelector("#modalFamilyContent");
let modalDietContent = document.querySelector("#modalDietContent");
let monsterUpdateModal = document.querySelector("#monsterUpdateModal");
let modalUpdateContent = document.querySelector("#modalUpdateContent");


// FUNCTIONS
let setup = () => {
    dataDiv.innerHTML="<h3><b><u>Existing Monsters</u></b></h3>";
    axios.get("http://localhost:8080/monstermaker/getAll")
        .then((response) => {
            displayResult(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
}


let create = () => {

    let obj = {
        "monsterName":addMonsterName.value,
        "monsterFamily":addMonsterFamily.value,
        "monsterDiet":addMonsterDiet.value,
        "monsterFlight":addMonsterFlight.checked,
        "monsterSwim":addMonsterSwim.checked,
        "monsterOrigin":addMonsterOrigin.value
    }

    console.log(obj);

    axios.post("http://localhost:8080/monstermaker/create", obj)
        .then((response) => {
            console.log(response);
            setup();
        })
        .catch((err) => {
            console.error(err);
        });

}

let remove = (idVal) => {
    axios.delete(`http://localhost:8080/monstermaker/delete/${idVal}`)
        .then((response) => {
            displayResult(response.data);
            setup();
        })
        .catch((err) => {
            console.error(err);
        });
}

let updateModal = (idVal) => {
    console.log(idVal);
    axios.get(`http://localhost:8080/monstermaker/get/${idVal}`)
        .then((response) => {
            document.getElementById("updateMonsterName").value = response.data.monsterName;
            document.getElementById("updateMonsterFamily").value = response.data.monsterFamily;
            document.getElementById("updateMonsterDiet").value = response.data.monsterDiet;
            document.getElementById("updateMonsterFlight").value = response.data.monsterFlight;
            document.getElementById("updateMonsterSwim").value = response.data.monsterSwim;
            document.getElementById("updateMonsterOrigin").value = response.data.monsterOrigin;
            updateMonsterButton.removeEventListener("click", function(){update(idVal);});
            updateMonsterButton.addEventListener("click", function(){update(idVal);});
        })
}

let update = (idVal) => {
    let obj = {
        "monsterName":document.getElementById("updateMonsterName").value,
        "monsterFamily":document.getElementById("updateMonsterFamily").value,
        "monsterDiet":document.getElementById("updateMonsterDiet").value,
        "monsterFlight":document.getElementById("updateMonsterFlight").checked,
        "monsterSwim":document.getElementById("updateMonsterSwim").checked,
        "monsterOrigin":document.getElementById("updateMonsterOrigin").value
    }
    axios.put(`http://localhost:8080/monstermaker/update/${idVal}`, obj)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });
}



let searchByFamily = () => {
    axios.get(`http://localhost:8080/monstermaker/getByFamily/${searchMonsterFamily.value}`)
        .then((response) => {
                displayFamilySearchResult(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
}

let displayFamilySearchResult = (data) => {
    modalFamilyContent.innerHTML = "";
    for (let entry of data) {
        var entrySearchDiv = document.createElement("div");
        entrySearchDiv.setAttribute("class","entrySearchDiv");

        let tableSearchDiv = document.createElement("div");
        tableSearchDiv.setAttribute("class","searchTables");

        let monHeadSearchDiv = document.createElement("div");
        monHeadSearchDiv.setAttribute("class", "monHeadSearchDiv");
        let nameHeadSearchDiv = document.createElement("div");
        nameHeadSearchDiv.setAttribute("class", "nameHeadSearchDiv");
        let familyHeadSearchDiv = document.createElement("div");
        familyHeadSearchDiv.setAttribute("class", "familyHeadSearchDiv");
        let dietHeadSearchDiv = document.createElement("div");
        dietHeadSearchDiv.setAttribute("class", "dietHeadSearchDiv");
        let flightHeadSearchDiv = document.createElement("div");
        flightHeadSearchDiv.setAttribute("class", "flightHeadSearchDiv");
        let swimHeadSearchDiv = document.createElement("div");
        swimHeadSearchDiv.setAttribute("class", "swimHeadSearchDiv");
        let originHeadSearchDiv = document.createElement("div");
        originHeadSearchDiv.setAttribute("class", "originHeadSearchDiv");

        let monValueSearchDiv = document.createElement("div");
        monValueSearchDiv.setAttribute("class", "monValueSearchDiv");
        let nameValueSearchDiv = document.createElement("div");
        nameValueSearchDiv.setAttribute("class", "nameValueSearchDiv");
        let monName = document.createTextNode(`Monster Name: ${entry.monsterName}`);
        let familyValueSearchDiv = document.createElement("div");
        familyValueSearchDiv.setAttribute("class", "familyValueSearchDiv");
        let monFamily = document.createTextNode(`Family: ${entry.monsterFamily}`);
        let dietValueSearchDiv = document.createElement("div");
        dietValueSearchDiv.setAttribute("class", "dietValueSearchDiv");
        let monDiet = document.createTextNode(`Diet: ${entry.monsterDiet}`);
        let flightValueSearchDiv = document.createElement("div");
        flightValueSearchDiv.setAttribute("class", "flightValueSearchDiv");
        let monFlight = document.createTextNode(`Flight Ability: ${entry.monsterFlight}`);
        let swimValueSearchDiv = document.createElement("div");
        swimValueSearchDiv.setAttribute("class", "swimValueSearchDiv");
        let monSwim = document.createTextNode(`Swim Ability: ${entry.monsterSwim}`);
        let originValueSearchDiv = document.createElement("div");
        originValueSearchDiv.setAttribute("class", "originValueSearchDiv");
        let monOrigin = document.createTextNode(`Origin: ${entry.monsterOrigin}`);

        nameValueSearchDiv.appendChild(monName);
        monValueSearchDiv.appendChild(nameValueSearchDiv);
        familyValueSearchDiv.appendChild(monFamily);
        monValueSearchDiv.appendChild(familyValueSearchDiv);
        dietValueSearchDiv.appendChild(monDiet);
        monValueSearchDiv.appendChild(dietValueSearchDiv);
        flightValueSearchDiv.appendChild(monFlight);
        monValueSearchDiv.appendChild(flightValueSearchDiv);
        swimValueSearchDiv.appendChild(monSwim);
        monValueSearchDiv.appendChild(swimValueSearchDiv);
        originValueSearchDiv.appendChild(monOrigin);
        monValueSearchDiv.appendChild(originValueSearchDiv);
        monHeadSearchDiv.appendChild(originHeadSearchDiv);
        monHeadSearchDiv.appendChild(swimHeadSearchDiv);
        monHeadSearchDiv.appendChild(flightHeadSearchDiv);
        monHeadSearchDiv.appendChild(dietHeadSearchDiv);
        monHeadSearchDiv.appendChild(familyHeadSearchDiv);
        monHeadSearchDiv.appendChild(nameHeadSearchDiv);
        tableSearchDiv.appendChild(monValueSearchDiv);
        tableSearchDiv.appendChild(monHeadSearchDiv);
        entrySearchDiv.appendChild(tableSearchDiv);

        let btnSearchDiv = document.createElement("div");
        btnSearchDiv.setAttribute("class","buttonSearchDiv");

        let updateSearchBtn = document.createElement("button");
        updateSearchBtn.setAttribute("class","btn btn-warning");
        updateSearchBtn.setAttribute("value",`${entry.monsterId}`);
        updateSearchBtn.setAttribute("data-bs-toggle","modal");
        updateSearchBtn.setAttribute("data-bs-target","#monsterUpdateModal");
        updateSearchBtn.innerHTML="Update Entry";

        let deleteSearchBtn = document.createElement("button");
        deleteSearchBtn.setAttribute("class","btn btn-danger");
        deleteSearchBtn.setAttribute("value",`${entry.monsterId}`);
        deleteSearchBtn.innerHTML="Delete Entry";
        btnSearchDiv.appendChild(updateSearchBtn);
        btnSearchDiv.appendChild(deleteSearchBtn);
        tableSearchDiv.appendChild(btnSearchDiv);

        updateSearchBtn.addEventListener("click", function(){updateModal(entry.monsterId);});
        deleteSearchBtn.addEventListener("click", function(){remove(entry.monsterId);});

        let entryBreak = document.createElement("hr");

        entrySearchDiv.appendChild(entryBreak);
        modalFamilyContent.appendChild(entrySearchDiv);
    }
}

let searchByDiet = () => {
    axios.get(`http://localhost:8080/monstermaker/getByDiet/${searchMonsterDiet.value}`)
        .then((response) => {
                displayDietSearchResult(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
}

let displayDietSearchResult = (data) => {
    modalDietContent.innerHTML = "";
    for (let entry of data) {
        var entrySearchDiv = document.createElement("div");
        entrySearchDiv.setAttribute("class","entrySearchDiv");

        let tableSearchDiv = document.createElement("div");
        tableSearchDiv.setAttribute("class","searchTables");

        let monHeadSearchDiv = document.createElement("div");
        monHeadSearchDiv.setAttribute("class", "monHeadSearchDiv");
        let nameHeadSearchDiv = document.createElement("div");
        nameHeadSearchDiv.setAttribute("class", "nameHeadSearchDiv");
        let familyHeadSearchDiv = document.createElement("div");
        familyHeadSearchDiv.setAttribute("class", "familyHeadSearchDiv");
        let dietHeadSearchDiv = document.createElement("div");
        dietHeadSearchDiv.setAttribute("class", "dietHeadSearchDiv");
        let flightHeadSearchDiv = document.createElement("div");
        flightHeadSearchDiv.setAttribute("class", "flightHeadSearchDiv");
        let swimHeadSearchDiv = document.createElement("div");
        swimHeadSearchDiv.setAttribute("class", "swimHeadSearchDiv");
        let originHeadSearchDiv = document.createElement("div");
        originHeadSearchDiv.setAttribute("class", "originHeadSearchDiv");

        let monValueSearchDiv = document.createElement("div");
        monValueSearchDiv.setAttribute("class", "monValueSearchDiv");
        let nameValueSearchDiv = document.createElement("div");
        nameValueSearchDiv.setAttribute("class", "nameValueSearchDiv");
        let monName = document.createTextNode(`Monster Name: ${entry.monsterName}`);
        let familyValueSearchDiv = document.createElement("div");
        familyValueSearchDiv.setAttribute("class", "familyValueSearchDiv");
        let monFamily = document.createTextNode(`Family: ${entry.monsterFamily}`);
        let dietValueSearchDiv = document.createElement("div");
        dietValueSearchDiv.setAttribute("class", "dietValueSearchDiv");
        let monDiet = document.createTextNode(`Diet: ${entry.monsterDiet}`);
        let flightValueSearchDiv = document.createElement("div");
        flightValueSearchDiv.setAttribute("class", "flightValueSearchDiv");
        let monFlight = document.createTextNode(`Flight Ability: ${entry.monsterFlight}`);
        let swimValueSearchDiv = document.createElement("div");
        swimValueSearchDiv.setAttribute("class", "swimValueSearchDiv");
        let monSwim = document.createTextNode(`Swim Ability: ${entry.monsterSwim}`);
        let originValueSearchDiv = document.createElement("div");
        originValueSearchDiv.setAttribute("class", "originValueSearchDiv");
        let monOrigin = document.createTextNode(`Origin: ${entry.monsterOrigin}`);

        nameValueSearchDiv.appendChild(monName);
        monValueSearchDiv.appendChild(nameValueSearchDiv);
        familyValueSearchDiv.appendChild(monFamily);
        monValueSearchDiv.appendChild(familyValueSearchDiv);
        dietValueSearchDiv.appendChild(monDiet);
        monValueSearchDiv.appendChild(dietValueSearchDiv);
        flightValueSearchDiv.appendChild(monFlight);
        monValueSearchDiv.appendChild(flightValueSearchDiv);
        swimValueSearchDiv.appendChild(monSwim);
        monValueSearchDiv.appendChild(swimValueSearchDiv);
        originValueSearchDiv.appendChild(monOrigin);
        monValueSearchDiv.appendChild(originValueSearchDiv);
        monHeadSearchDiv.appendChild(originHeadSearchDiv);
        monHeadSearchDiv.appendChild(swimHeadSearchDiv);
        monHeadSearchDiv.appendChild(flightHeadSearchDiv);
        monHeadSearchDiv.appendChild(dietHeadSearchDiv);
        monHeadSearchDiv.appendChild(familyHeadSearchDiv);
        monHeadSearchDiv.appendChild(nameHeadSearchDiv);
        tableSearchDiv.appendChild(monValueSearchDiv);
        tableSearchDiv.appendChild(monHeadSearchDiv);
        entrySearchDiv.appendChild(tableSearchDiv);

        let btnSearchDiv = document.createElement("div");
        btnSearchDiv.setAttribute("class","buttonSearchDiv");

        let updateSearchBtn = document.createElement("button");
        updateSearchBtn.setAttribute("class","btn btn-warning");
        updateSearchBtn.setAttribute("value",`${entry.monsterId}`);
        updateSearchBtn.setAttribute("data-bs-toggle","modal");
        updateSearchBtn.setAttribute("data-bs-target","#monsterUpdateModal");
        updateSearchBtn.innerHTML="Update Entry";

        let deleteSearchBtn = document.createElement("button");
        deleteSearchBtn.setAttribute("class","btn btn-danger");
        deleteSearchBtn.setAttribute("value",`${entry.monsterId}`);
        deleteSearchBtn.innerHTML="Delete Entry";
        btnSearchDiv.appendChild(updateSearchBtn);
        btnSearchDiv.appendChild(deleteSearchBtn);
        tableSearchDiv.appendChild(btnSearchDiv);

        updateSearchBtn.addEventListener("click", function(){updateModal(entry.monsterId);});
        deleteSearchBtn.addEventListener("click", function(){remove(entry.monsterId);});

        let entryBreak = document.createElement("hr");

        entrySearchDiv.appendChild(entryBreak);
        modalDietContent.appendChild(entrySearchDiv);
    }
}


let displayResult = (data) => {
    for (let entry of data) {
        let entryDiv = document.createElement("div");
        entryDiv.setAttribute("class","entryDiv");
        dataDiv.appendChild(entryDiv);

        let tableDiv = document.createElement("div");
        tableDiv.setAttribute("class","tables");

        let monHeadDiv = document.createElement("div");
        monHeadDiv.setAttribute("class", "monHeadDiv");
        let nameHeadDiv = document.createElement("div");
        nameHeadDiv.setAttribute("class", "nameHeadDiv");
        let familyHeadDiv = document.createElement("div");
        familyHeadDiv.setAttribute("class", "familyHeadDiv");
        let dietHeadDiv = document.createElement("div");
        dietHeadDiv.setAttribute("class", "dietHeadDiv");
        let flightHeadDiv = document.createElement("div");
        flightHeadDiv.setAttribute("class", "flightHeadDiv");
        let swimHeadDiv = document.createElement("div");
        swimHeadDiv.setAttribute("class", "swimHeadDiv");
        let originHeadDiv = document.createElement("div");
        originHeadDiv.setAttribute("class", "originHeadDiv");

        let monValueDiv = document.createElement("div");
        monValueDiv.setAttribute("class", "monValueDiv");
        let nameValueDiv = document.createElement("div");
        nameValueDiv.setAttribute("class", "nameValueDiv");
        let monName = document.createTextNode(`Monster Name:\n${entry.monsterName}`);
        let familyValueDiv = document.createElement("div");
        familyValueDiv.setAttribute("class", "familyValueDiv");
        let monFamily = document.createTextNode(`Family: ${entry.monsterFamily}`);
        let dietValueDiv = document.createElement("div");
        dietValueDiv.setAttribute("class", "dietValueDiv");
        let monDiet = document.createTextNode(`Diet: ${entry.monsterDiet}`);
        let flightValueDiv = document.createElement("div");
        flightValueDiv.setAttribute("class", "flightValueDiv");
        let monFlight = document.createTextNode(`Flight Ability: ${entry.monsterFlight}`);
        let swimValueDiv = document.createElement("div");
        swimValueDiv.setAttribute("class", "swimValueDiv");
        let monSwim = document.createTextNode(`Swim Ability: ${entry.monsterSwim}`);
        let originValueDiv = document.createElement("div");
        originValueDiv.setAttribute("class", "originValueDiv");
        let monOrigin = document.createTextNode(`Origin: ${entry.monsterOrigin}`);

        nameValueDiv.appendChild(monName);
        monValueDiv.appendChild(nameValueDiv);
        familyValueDiv.appendChild(monFamily);
        monValueDiv.appendChild(familyValueDiv);
        dietValueDiv.appendChild(monDiet);
        monValueDiv.appendChild(dietValueDiv);
        flightValueDiv.appendChild(monFlight);
        monValueDiv.appendChild(flightValueDiv);
        swimValueDiv.appendChild(monSwim);
        monValueDiv.appendChild(swimValueDiv);
        originValueDiv.appendChild(monOrigin);
        monValueDiv.appendChild(originValueDiv);
        monHeadDiv.appendChild(originHeadDiv);
        monHeadDiv.appendChild(swimHeadDiv);
        monHeadDiv.appendChild(flightHeadDiv);
        monHeadDiv.appendChild(dietHeadDiv);
        monHeadDiv.appendChild(familyHeadDiv);
        monHeadDiv.appendChild(nameHeadDiv);
        tableDiv.appendChild(monValueDiv);
        tableDiv.appendChild(monHeadDiv);
        entryDiv.appendChild(tableDiv);

        let btnDiv = document.createElement("div");
        btnDiv.setAttribute("class","buttonDiv");

        let updateBtn = document.createElement("button");
        updateBtn.setAttribute("class","btn btn-warning");
        updateBtn.setAttribute("value",`${entry.monsterId}`);
        updateBtn.setAttribute("data-bs-toggle","modal");
        updateBtn.setAttribute("data-bs-target","#monsterUpdateModal");
        updateBtn.innerHTML="Update Entry";

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","btn btn-danger");
        deleteBtn.setAttribute("value",`${entry.monsterId}`);
        deleteBtn.innerHTML="Delete Entry";
        btnDiv.appendChild(updateBtn);
        btnDiv.appendChild(deleteBtn);
        tableDiv.appendChild(btnDiv);

        updateBtn.addEventListener("click", function(){updateModal(entry.monsterId);});
        deleteBtn.addEventListener("click", function(){remove(entry.monsterId);});
    }
}


// EVENT LISTENERS
addMonsterButton.addEventListener("click", create);
searchFamilyButton.addEventListener("click", searchByFamily);
searchDietButton.addEventListener("click", searchByDiet);
updateMonsterButton.addEventListener("click", update);