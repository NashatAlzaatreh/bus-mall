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
// check index
let checkRepeatleft;
let checkRepeatCenter;
let checkRepeatRight;


function renderThreeImeges() {

    leftIndex = generateRandomIndex();
    centerIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();



    // sure it's not equales and not repets
    while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex || leftIndex === checkRepeatleft || leftIndex === checkRepeatCenter || leftIndex === checkRepeatRight || centerIndex === checkRepeatCenter || centerIndex === checkRepeatleft || centerIndex === checkRepeatRight || rightIndex === checkRepeatRight || rightIndex === checkRepeatleft || rightIndex === checkRepeatCenter) {
        leftIndex = generateRandomIndex();
        centerIndex = generateRandomIndex();
        rightIndex = generateRandomIndex();


    }

    // console.log('after check', leftIndex, centerIndex, rightIndex);
    checkRepeatleft = leftIndex;
    checkRepeatCenter = centerIndex;
    checkRepeatRight = rightIndex;


    // make images appears in the web page

    leftImageElemanet.src = Product.globArr[leftIndex].bath;
    centerImageElemanet.src = Product.globArr[centerIndex].bath;
    rightImageElemanet.src = Product.globArr[rightIndex].bath;

}

renderThreeImeges();

//  click images 

let section = document.getElementById('sec-one')

section.addEventListener('click', handelClick);
function handelClick(event) {
    // console.log(event);
    counter++;

    if (counter <= maxAttepts) {
        if (event.target.id === 'left-image') {
            // how much the image picked
            Product.globArr[leftIndex].pickNumber++
            // how much the image shown
            Product.globArr[leftIndex].shown++
            Product.globArr[centerIndex].shown++
            Product.globArr[rightIndex].shown++
        }
        else if (event.target.id === 'center-image') {
            Product.globArr[centerIndex].pickNumber++
            // how much the image shown
            Product.globArr[leftIndex].shown++
            Product.globArr[centerIndex].shown++
            Product.globArr[rightIndex].shown++
        }
        else if (event.target.id === 'right-image') {
            Product.globArr[rightIndex].pickNumber++
            // how much the image shown
            Product.globArr[leftIndex].shown++
            Product.globArr[centerIndex].shown++
            Product.globArr[rightIndex].shown++
        } else {
            counter--;
            return
        }
        // save to LS 
        saveToLs();
        // new call to clickable images 
        renderThreeImeges();

    }

}

// Local Storage 

function saveToLs() {
    // convert arr of objects
    const convertedArr = JSON.stringify(Product.globArr)
    localStorage.setItem('products', convertedArr);

}
function getFromLs() {
    const data = localStorage.getItem('products')
    // console.log(data);
    const parsedProducts = JSON.parse(data)
    if (parsedProducts !== null) {
        console.log(parsedProducts);
        Product.globArr = parsedProducts;
        renderThreeImeges();

    }

}

let shownArr = [];
let voteArr = [];
// making the button and the list 
const productsListButton = document.getElementById('submit');
productsListButton.addEventListener('click', submitList);

function submitList(event) {
    let ul = document.getElementById('productList');
    for (let i = 0; i < Product.globArr.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Product.globArr[i].name} had ${Product.globArr[i].pickNumber} votes, and was seen ${Product.globArr[i].shown} times.`
        shownArr.push(Product.globArr[i].shown);
        voteArr.push(Product.globArr[i].pickNumber);

    }
    // console.log(shownArr);
    // console.log(voteArr);
    makeChart();
    section.removeEventListener('click', handelClick);
    // see one list
    productsListButton.removeEventListener('click', submitList);

}
// making the chart 
function makeChart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: '# of Votes',
                data: voteArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            },
            {
                label: '# of Shown',
                data: shownArr,
                backgroundColor: [
                    'rgba(100, 200, 200, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


getFromLs();