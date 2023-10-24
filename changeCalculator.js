const form = document.forms["form1"]
const submit = document.getElementById("submit")

const addError = (element, message) => {
    const sibling = element.nextElementSibling
    if (sibling.tagName === "SPAN") {
        return
    }
    const error = document.createElement("span")
    error.innerHTML = message
    element.insertAdjacentElement("afterend", error)
}

const removeError = (element) => {
    const sibling = element.nextElementSibling
    if (sibling.tagName === "SPAN") {
        sibling.remove()
    }
}

form.onsubmit = (event) => {

    let valid = true

    if (form.money.value !== "" && !isNaN(parseInt(form.money.value)) && form.total.value !== "" && !isNaN(parseInt(form.total.value))) {
        removeError(form.money)
        removeError(form.total)
        valid = true
        if (parseFloat(form.total.value) > parseFloat(form.money.value)) 
        {
            addError(form.money, "Money value has to be greater than total.")
            valid = false
        }
        else 
        {
            removeError(form.money)
            valid = true
        }
    }

    else {
        if (form.total.value === "" || isNaN(parseInt(form.total.value))) 
        {
            addError(form.total, "Total value is required.")
            valid = false
        }

        if (form.money.value === "" || isNaN(parseInt(form.money.value))) 
        {
            addError(form.money, "Money value is required.")
            valid = false
        }
    }

    if (!valid) {
        event.preventDefault()
        console.log("Invalid")
    }

    if (valid) {
        let total = parseFloat(form['total'].value)
        let given = parseFloat(form['money'].value)

        event.preventDefault()

        const changeElement = document.getElementById("change")
        let changeValue = parseFloat((given - total).toFixed(2))
        changeElement.innerHTML = `${changeValue} $`

        const twenties = document.getElementById("twenties")
        const tens = document.getElementById("tens")
        const fives = document.getElementById("fives")
        const ones = document.getElementById("ones")
        const quarters = document.getElementById("quarters")
        const dimes = document.getElementById("dimes")
        const nickels = document.getElementById("nickels")
        const pennies = document.getElementById("pennies")

        twenties.innerHTML = Math.floor(changeValue / 20)
        changeValue = Number((changeValue %= 20).toFixed(2))

        tens.innerHTML = Math.floor(changeValue / 10)
        changeValue = Number((changeValue %= 10).toFixed(2))

        fives.innerHTML = Math.floor(changeValue / 5)
        changeValue = Number((changeValue %= 5).toFixed(2))

        ones.innerHTML = Math.floor(changeValue / 1)
        changeValue = Number((changeValue %= 1).toFixed(2))

        quarters.innerHTML = Math.floor(changeValue / 0.25)
        changeValue = Number((changeValue %= 0.25).toFixed(2))

        dimes.innerHTML = Math.floor(changeValue / 0.1)
        changeValue = Number((changeValue %= 0.1).toFixed(2))

        nickels.innerHTML = Math.floor(changeValue / 0.05)
        changeValue = Number((changeValue %= 0.05).toFixed(2))

        pennies.innerHTML = Math.floor(changeValue / 0.01)
    }
}

// set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark')
    {
        setTheme('theme-light');
    }
    else
    {
        setTheme('theme-dark');
    }
}

// set theme on load
(function() {
    if (localStorage.getItem('theme') === 'theme-dark') 
    {
        setTheme('theme-dark');
    } 
    else 
    {
        setTheme('theme-light');
    }
}) ();