// referencia de tags
const form = document.querySelector("form")
const list = document.querySelector("#list")
const inputPrincipal = document.querySelector("#itemList")
const alert = document.querySelector("#alert")

// funcao pra filtrar o campo
inputPrincipal.addEventListener("input", () => {
    inputPrincipal.value = inputPrincipal.value.replace(/\d+/g,"")
})

// função pra adicionar um item a lista
form.addEventListener("submit", (event) => {
    event.preventDefault()
    // criando novo item
    const newItem = document.createElement("div")
    newItem.classList.add("item")
    // estrutura do novo item
    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    
    const itemName = document.createElement("p")
    itemName.innerText = inputPrincipal.value

    const deleteItem = document.createElement("img")
    deleteItem.src = "./assets/images/trash-icon.svg"
    // adicionando a estrutura ao item
    newItem.appendChild(checkBox)
    newItem.appendChild(itemName)
    newItem.appendChild(deleteItem)
    // adicionando o item a lista
    list.appendChild(newItem)
    // limpar o campo
    inputPrincipal.value= ''
    
    deleteItem.addEventListener("click", () => {
        list.removeChild(newItem)
        notification()
    })
})

// função da notificação
function notification(){
    // adiciona a notificacao
    alert.style.display = "flex"
    // referencia o icon de fechar a notificacao
    const closeNotification = document.querySelector("#close-notification")
    closeNotification.onclick = () => {alert.style.display = "none"}
}