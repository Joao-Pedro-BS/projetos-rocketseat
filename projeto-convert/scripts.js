// valor das moedas
let priceUSD = 5.76
let priceEUR = 6.22
let priceGBP = 7.47

// referencia das tags
const form = document.querySelector("form")
const footer = document.querySelector("footer")
const amount = document.querySelector("#amount")
const result = document.querySelector("#result")
const currency = document.querySelector("#currency")
const description = document.querySelector("#description")

// manipulando o input
amount.addEventListener("input", () => {
    // filtrar o input
    amount.value = amount.value.replace(/\D+/g,"")
})

// manipulando o select
form.addEventListener("submit", (event) => {
    let currencyFlag
    // evita que a pagina recarregue
    event.preventDefault()
    // verifica a moeda    
    switch(currency.value){
        case "USD": convertCurrency(amount.value, priceUSD, "US$")
        break

        case "EUR": convertCurrency(amount.value, priceEUR, "€")
        break

        case "GBP": convertCurrency(amount.value, priceGBP, "£")
        break
    }
    // limpar os campos
    amount.value = ""
    currency.value = ""
})

// converter valores
function convertCurrency(amount, price, symbol){
    // atualizar a descrição
    description.innerHTML = `${symbol} 1 = R$ ${formatCurrencyBRL(price)}`
    // atualizando o resultado
    result.innerHTML = `${formatCurrencyBRL(amount*price)}`
    // exibindo o resultado
    footer.style.display = "block"
}

// formatar para BRL
function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })
}