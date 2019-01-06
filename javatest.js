let submitButton = document.getElementById('submit');
let resetButton = document.getElementById('reset')
let hintButton = document.getElementById('hint')

function getAndStoreValue (inputElement) {
    console.log(inputElement.value)
    inputElement.value = ''
    alert('Thanks')
   
}

submitButton.addEventListener('click', function () {

    let inputElement = document.querySelector('input')
    
    getAndStoreValue(inputElement)

    
})

