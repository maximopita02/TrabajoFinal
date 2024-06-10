var imagenes = document.querySelectorAll('.imagen-tipo')
var todosLosTextos = document.querySelectorAll('.textoReciclado')
console.log(imagenes)
console.log(todosLosTextos)
imagenes.forEach((imagen)=>{
    imagen.addEventListener('click',(e) => {
        todosLosTextos.forEach((textos) => {
            textos.style.display = 'none'
        })
        imagenes.forEach((imagen)=>{
            imagen.classList.remove('selectedTipo')            
        })
        imagen.classList.add('selectedTipo')
        var texto = document.querySelector(`.${imagen.id}`)
        texto.style.display = 'block'
    })
})