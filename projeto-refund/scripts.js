// referencia dos elementos do formulario
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

// referencia os elementos das despesas
const expenseList = document.querySelector("ul")
const expenseResult = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

// filtra o campo de preço
amount.addEventListener("input", () => {
    let value = amount.value
    // filtra o input
    value = Number(amount.value.replace(/\D+/g,""))
    // formatando
    amount.value = formatCurrencyBRL(value / 100)
})
// função que formata o preço
function formatCurrencyBRL(value){
    return value = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })
}
// captura os dados do formulario
form.addEventListener("submit",(event) => {
    // nao recarrega a pagina
    event.preventDefault()
    // novo obj com os dados da despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        amount: amount.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        create_at: new Date(),
    }
    createExpense(newExpense)
})
// cria e adiciona uma nova despesa
function createExpense(newExpense){
    try {
        // cria o item (li)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // cria o icone
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt",`Ícone de ${newExpense.category_name}`)

        // cria a div de infos
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
 
        // cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.textContent = newExpense.amount
        
        // cria o icone que remove
        const expenseIconRemove = document.createElement("img")
        expenseIconRemove.classList.add("remove-icon")
        expenseIconRemove.setAttribute("src","./img/remove.svg")
        expenseIconRemove.setAttribute("alt","remover")


        // adiciona os filhos da div de infos
        expenseInfo.append(expenseName,expenseCategory)

        // adiciona os filhos do item (li)
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseIconRemove)

        // adiociona o item (li) a lista (ul)
        expenseList.append(expenseItem)

        // limpa os campos
        formClear()

        // atualiza os totais
        updateTotals()

        // deleteta a despesa
        expenseIconRemove.addEventListener("click", () => {
            expenseList.removeChild(expenseItem)
            updateTotals()
        })

    } catch (error) {
        alert("Não foi Possível adicionar sua despesa.")
        console.log(error)
    }
}

// atualiza os totais
function updateTotals(){
    try {
        // recupera todos os li da ul
        const itens = expenseList.children
 
        // exibi a quantidade de despesas
        expenseQuantity.textContent = `${itens.length} ${itens.length > 1?"despesas":"despesa"}`
 
        // var de controle
        let total = 0
 
        // percorre cada li 
        for (let item=0;item < itens.length;item++){
            // referencia cada li (pegando seu HTML)
            const itemAmount = itens[item].querySelector(".expense-amount")
            // pegando o texto dentro da tag e filtrando
            let value = itemAmount.textContent.replace(/[^\d,]/g,"").replace(",",".")
            // converte o valor
            value = parseFloat(value)
            // incrementa
            total += Number(value)
        }  
        // exibir o valor total
        expenseResult.textContent = formatCurrencyBRL(total)

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}

function formClear(){
    amount.value = ""
    expense.value = ""
    category.value = ""

    expense.focus()
}