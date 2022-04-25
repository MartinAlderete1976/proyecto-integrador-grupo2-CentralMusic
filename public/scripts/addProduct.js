

const $select = document.getElementById('category');

const $btnFile = document.querySelectorAll('.btn-file')

const $selectCategory = document.querySelectorAll('#category');

const $select1 = document.getElementById('category')

const accesory = document.getElementsByClassName('accesory')

let category = $selectCategory[0]



let option = accesory[0]

$btnFile[0].style.backgroundColor = 'blue'

/*
function cambiarColor(){
    if(category.value === 'accesory') {
        category.value = 'accesory'
        $btnFile[0].style.backgroundColor = 'red'
    }    
    
}
*/

option.addEventListener('click', e => {
    console.log(e)
})



console.log(category.value)



    
  
    
     
 





//alert(category.value)
//console.log($btnFile)

//

$btnFile[0].innerHTML = 'Sacar imagenes'


let lblImage = $btnFile.item(0)

//console.log($selectCategory)







//console.log($select1)




