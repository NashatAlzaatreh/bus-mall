'use strict'

//  get elements
let leftImageElemanet = document.getElementById('left-image');
let centerImageElemanet = document.getElementById('center-image');
let rightImageElemanet = document.getElementById('right-image');

const maxAttepts = 25;
let counter = 0;

// constructor of products 
function Product(name, bath) {
    this.name = name;
    this.bath = bath;
    // this.selected=0;
    this.shown = 0;
    this.pickNumber = 0;
    Product.globArr.push(this);
}

// products array
Product.globArr = [];

// making the objects by loop
let productsNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

for (let i = 0; i < productsNames.length; i++) {
    new Product(`${productsNames[i]}`, `img/${productsNames[i]}.jpg`);

}
console.log(Product.globArr);

// random index for images

function generateRandomIndex() {
    return Math.floor(Math.random() * Product.globArr.length);

}

let leftIndex;
let centerIndex;
let rightIndex;

function renderThreeImeges() {
    leftIndex = generateRandomIndex();
    centerIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();
    
    // sure it's not equales 
    while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex) {
        leftIndex = generateRandomIndex();
        centerIndex = generateRandomIndex();
    }
    // console.log(leftIndex);
    // console.log(centerIndex);
    // console.log(rightIndex);

    // make images appears in the web page

    leftImageElemanet.src = Product.globArr[leftIndex].bath;
    centerImageElemanet.src = Product.globArr[centerIndex].bath;
    rightImageElemanet.src = Product.globArr[rightIndex].bath;

}

renderThreeImeges();

//  click images 

leftImageElemanet.addEventListener ('click', handelClick); 
centerImageElemanet.addEventListener ('click', handelClick);
rightImageElemanet.addEventListener ('click', handelClick); 

function handelClick (event){
    counter++ ; 

    if (counter <= maxAttepts) {
        if (event.target.id === 'left-image') {
            // how much the image picked
            Product.globArr[leftIndex].pickNumber++
            // Product.globArr[leftIndex].selected++
            // how much the image shown
            Product.globArr[leftIndex].shown++
            Product.globArr[centerIndex].shown++
            Product.globArr[rightIndex].shown++
        }
        else if (event.target.id === 'center-image'){
            Product.globArr[centerIndex].pickNumber++
            // Product.globArr[centerIndex].selected++
            // how much the image shown
            Product.globArr[leftIndex].shown++
            Product.globArr[centerIndex].shown++
            Product.globArr[rightIndex].shown++
        }
        else if (event.target.id === 'right-image') {
            Product.globArr[rightIndex].pickNumber++
            // Product.globArr[rightIndex].selected++
            // how much the image shown
            Product.globArr[leftIndex].shown++
            Product.globArr[centerIndex].shown++
            Product.globArr[rightIndex].shown++
        }
        // new call to clickable images 
        renderThreeImeges();

    } 
    else {
        // renderList ();
        
    }

}


// function renderList (){
//     let ul = document.getElementById('productList');
//         for (let i = 0; i < Product.globArr.length; i++) {
//             let li = document.createElement('li');
//             ul.appendChild(li);
//             li.textContent = `${Product.globArr[i].name} had ${Product.globArr[i].pickNumber} votes, and was seen ${Product.globArr[i].shown} times.`
//         }
//         leftImageElemanet.removeEventListener('click', handelClick);
//         centerImageElemanet.removeEventListener('click', handelClick);
//         rightImageElemanet.removeEventListener('click', handelClick);
// }



const productsListButton  = document.getElementById('submit');
productsListButton.addEventListener('click', submitList);

function submitList (event){
    let ul = document.getElementById('productList');
        for (let i = 0; i < Product.globArr.length; i++) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.textContent = `${Product.globArr[i].name} had ${Product.globArr[i].pickNumber} votes, and was seen ${Product.globArr[i].shown} times.`
        }
        leftImageElemanet.removeEventListener('click', handelClick);
        centerImageElemanet.removeEventListener('click', handelClick);
        rightImageElemanet.removeEventListener('click', handelClick);
        // see one list
        productsListButton.removeEventListener('click', submitList);

}

