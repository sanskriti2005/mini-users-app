getData()
const userDataContainer = document.querySelector("#user-data");
const addBtn = document.querySelector("#add-btn");
const usernameField = document.querySelector("#user-name")
let dataToBeDsiplayed = [];

// PERFORMING READ THING
async function getData() {
    // fetching data from the endpoint
    try {
        let res = await fetch("http://localhost:3000/users");
        let data = await res.json();
        // displaying the data recieved from the endpoint
        displayData(userDataContainer, data);
    } catch (err) {
        console.log("Error: ", err);
    }
}

function displayData(container, arr) {
    container.innerHTML = ``;
    arr.forEach(element => {
        let userCard = document.createElement("div");
        let cardInfo = `<h5 class="user">${element.name}</h5>
        <button class="remove-btn" data-id="${element.id}">Remove User</button>
        <button class="update-btn" data-id="${element.id}">Update User</button>`;
        userCard.innerHTML = cardInfo;
        container.append(userCard);
    });

    // all fo these event listeners are called inside the display data function because a lot of the elements are added dynamically!!!
    const deleteBtn = document.querySelectorAll(".remove-btn");
    deleteBtn.forEach(button => button.addEventListener("click", removeUser));

    const updateBtn = document.querySelectorAll(".update-btn");
    updateBtn.forEach(button => button.addEventListener("click", updateUserUI));
}


// THE CREATE THING
// This is not inside the display data function because it is not dynamically added AAA
addBtn.addEventListener("click", postData);
async function postData() {
    try {
        let res = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: `${usernameField.value}` })
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}


// THE DELETE THING
async function removeUser(event) {
    let userEle = event.target.dataset.id;
    try {
        let res = await fetch(`http://localhost:3000/users/${userEle}`, {
            method: "DELETE",
        })
        if (res.ok) {
            alert("User Successfully Deleted!");
        } else {
            alert("Could not Delete User");
        }
    } catch (err) {
        console.log(err);
    }
}


// THE UPDATE THING
async function updateUserUI(event) {
    let buttonEle = event.target;
    let buttonEleId = event.target.dataset.id;
    let inputField = document.createElement("input");
    inputField.setAttribute("type", "text");

    let confirmUpdateBtn = document.createElement("button");
    confirmUpdateBtn.textContent = "Update"
    confirmUpdateBtn.classList.toggle("confirm-update-btn");
    confirmUpdateBtn.setAttribute("data-id", buttonEleId);


    buttonEle.replaceWith(inputField, confirmUpdateBtn);

    confirmUpdateBtn.addEventListener("click",patchUserName);

    async function patchUserName(event) {
        const updatedVal = inputField.value
        try {
            let res = await fetch(`http://localhost:3000/users/${buttonEleId}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ "name": `${updatedVal}` })
            })
            if(res.ok){
                alert(`User Updated Succesfully!`);
            }
        } catch(err){
            console.log(err)
        }
    }
}


