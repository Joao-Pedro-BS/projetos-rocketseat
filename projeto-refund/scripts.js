// referencia dos elementos HTML
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

amount.addEventListener("input", () => {
    let value = amount.value
    // filtra o input
    value = Number(amount.value.replace(/\D+/g,""))
    // formatando
    amount.value = formatCurrecyBRL(value / 100)
})

function formatCurrecyBRL(value){
    return value = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })
}

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
    console.log(newExpense)
})