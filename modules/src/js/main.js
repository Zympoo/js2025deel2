// Import our custom CSS
import "/scss/styles.scss"
import User from "/js/userModel.js"
import { createUserCard } from "/js/userCard.js";

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
let gebruikers = [];

const inpName = document.getElementById('ex4_name');
const inpAge = document.getElementById('ex4_age');
function addUser(){
    gebruikers.push(new User(inpName.value, Number(inpAge.value)))
}

function updateList(){
    const list = document.getElementById('ex4_list');
    list.innerHTML = gebruikers.map(createUserCard).join('');
}

function handleStatus(){
    const outStatus = document.getElementById('ex4_status')

    outStatus.innerHTML = `${gebruikers.length + 1} gebruikers`;
    outStatus.classList = "alert alert-success mb-3"
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ex4_btn')?.addEventListener('click', () => {
        if(inpName.value !== "" && Math.sign(Number(inpAge.value)) === 1){
            handleStatus();
            addUser()
            updateList()
        }
    })
})