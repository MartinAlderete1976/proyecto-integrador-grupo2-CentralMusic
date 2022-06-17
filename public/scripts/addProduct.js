/*

const $product = document.getElementById('product');
const $formGuitarDetails = document.querySelectorAll('#guitar-details');
const $formCuerdaDetails = document.querySelectorAll('#cuerda-details');
const $formPedalDetails = document.querySelectorAll('#pedal-details');
const $formCableDetails = document.querySelectorAll('#cable-details');
const options = document.querySelectorAll('#product option')
const btn = document.querySelectorAll('#btn-create');

// guardo en variable los formularios porque las variable de arrbia me devuelve un nodelist
let formGuitarDetails = $formGuitarDetails[0]; //esto me devuelve el elemento y puedo usar la propiedad style
let formCuerdaDetails = $formCuerdaDetails[0];
let formPedalDetails = $formPedalDetails[0];
let formCableDetails = $formCableDetails[0];





$formGuitarDetails[0].style.display = 'none';
$formCuerdaDetails[0].style.display = 'none';
$formPedalDetails[0].style.display = 'none';
$formCableDetails[0].style.display = 'block'


// options[0].selected = false



$product.addEventListener('click', e => {
    switch(e.target.value){
        case 'Guitarras Electricas':
            formGuitarDetails.style.display = 'flex'
            
            formPedalDetails.style.display = 'none'
            formPedalDetails.setAttribute('method', '')
            formPedalDetails.setAttribute('action', '')
                    
            console.log(formPedalDetails)
               

                    

                      
            
        break;
        case 'Pedales':
            formGuitarDetails.style.display = 'none'
            formGuitarDetails.submit = false
           // formCuerdaDetails.style.display = 'none'
            formPedalDetails.style.display = 'flex'
            //formCableDetails.style.display = 'none'
        break;
        
        case 'Cuerdas':
            formGuitarDetails.style.display = 'none'
            formCuerdaDetails.style.display = 'flex'
            formPedalDetails.style.display = 'none'
            formCableDetails.style.display = 'none'
        break;
        
        case 'Cables para instrumentos':
            formGuitarDetails.style.display = 'none'
            formCuerdaDetails.style.display = 'none'
            formPedalDetails.style.display = 'none'
            formCableDetails.style.display = 'flex' 
        break;         
    }

    
})





formGuitarDetails.addEventListener('click', e => {
        
  

        
        

    
})

console.log(options[1])
//console.log(options)








/*
const $select = document.getElementById('category');

const $btnFile = document.querySelectorAll('.btn-file')

const $selectCategory = document.querySelectorAll('#category');

const $select1 = document.getElementById('category')

const accesory = document.getElementsByClassName('accesory')

let category = $selectCategory[0]



let option = accesory[0]

//$btnFile[0].style.backgroundColor = 'blue'

/*
function cambiarColor(){
    if(category.value === 'accesory') {
        category.value = 'accesory'
        $btnFile[0].style.backgroundColor = 'red'
    }    
    
}







    
  
    
     
 





//alert(category.value)
//console.log($btnFile)

//

//$btnFile[0].innerHTML = 'Sacar imagenes'


let lblImage = $btnFile.item(0)

//console.log($selectCategory)







//console.log($select1)



*/
