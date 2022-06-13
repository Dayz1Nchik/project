
let close = document.querySelector(".close")


function NewUser(){
    let form = document.querySelector(".new")
    form.classList.add("toggle")
}

function closeUser(){
    let form = document.querySelector(".new")
    form.classList.remove("toggle")
}

async function main(){
    let group = window.location.pathname
    let monthes = await fetch('/api' + group).then(response => response.json())
    console.log(monthes)
    
}

main()

