
let close = document.querySelector(".close")


function NewReview(){
    let form = document.querySelector(".new")
    form.classList.add("toggle")
}

function closeReview(){
    let form = document.querySelector(".new")
    form.classList.remove("toggle")
}
function filtration1(){
    let rev = document.querySelector(".review")
    rev.classList.add("toggle1")
}
function filtration2(){
    let rev = document.querySelector(".review")
    let clas = document.querySelector("#parent")
    let clas2 = document.querySelector("#vipusknik")
    clas.classList.toggle("toggle1")
    clas2.classList.toggle("toggle1")
    console.log(clas)
}
function filtration3(){
    let rev = document.querySelector(".review")
    let clas = document.querySelector("#student")
    let clas2 = document.querySelector("#vipusknik")
    clas.classList.toggle("toggle1")
    clas2.classList.toggle("toggle1")
}
function filtration4(){
    let rev = document.querySelector(".review")
    let clas = document.querySelector("#student")
    let clas2 = document.querySelector("#parent")
    clas.classList.toggle("toggle1")
    clas2.classList.toggle("toggle1")
}

// function filtration11(){
//     // let rev = document.querySelector(".review")
//     // let clas = document.getElementsByName("a⭐⭐⭐⭐").style.display = "none"
//     // let clas1 = document.getElementsByName("a⭐⭐⭐").style.display = "none"
//     // let clas2= document.getElementsByName("a⭐⭐").style.display = "none"
//     // let clas3 = document.getElementsByName("a⭐").style.display = "none"
//     // let clas4 = document.getElementsByName("none").style.display = "none"
//     // clas.classList.toggle("toggle1")
//     // clas1.classList.toggle("toggle1")
//     // clas2.classList.toggle("toggle1")
//     // clas3.classList.toggle("toggle1")
//     // clas4.classList.toggle("toggle1")
//     // clas5.classList.toggle("toggle1")
// }
