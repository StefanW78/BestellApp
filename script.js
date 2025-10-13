let myMainBasket = [];
let dishesContainer = document.getElementsByClassName("orderButtonDishes");
let count = 0;
let totalItemPrice = 0.00;
let totalItemPriceEU = 0.00;
let deliveryCosts = 5.00;
let displayDeliveryCosts = deliveryCosts.toFixed(2).replace('.',',') + "€";




function init() {
  showMyDishes();
  showSideDishes();
  showBasket();
}

function showMyDishes() {
  let contentRef = document.getElementById("menuItems");
  contentRef.innerHTML = ""; /* clear Field */

  for (let index = 0; index < myDishes.length; index++) {
    contentRef.innerHTML += getMainDishesTemplate(index);
  }
}




function addItemToBasket(button) {
  // 1. reading attribute
  const index = button.getAttribute('data-info');

  // 2. pick up Element from array with an copy of myDishes[index]
  const selectedItem = { ...myDishes[index] };

  
    // 3. check if is in the array
 let itemExists = false;

  myMainBasket.forEach((basketItem, basketIndex) => {
    if (basketItem.name === selectedItem.name) {
      // Item exists, raise quantity
      myMainBasket[basketIndex].basketAmount += 1;
      myMainBasket[basketIndex].price =
        selectedItem.price * myMainBasket[basketIndex].basketAmount;
      itemExists = true;
    }
  });

  // Item not in, push in
  if (!itemExists) {
    selectedItem.basketAmount = 1;
    myMainBasket.push(selectedItem);
  }



  // 4. give it in the basket array
  
  saveBasket();
  showBasket();
  
}

function loadBasket() {
  const saved = localStorage.getItem('myMainBasket');
  if (saved) {
    myMainBasket = JSON.parse(saved);
    showBasket();
  }
}

function saveBasket() {
  localStorage.setItem('myMainBasket', JSON.stringify(myMainBasket));
}


function showSideDishes() {
  let contentRef = document.getElementById("sideDishesContainer");
  contentRef.innerHTML = ""; /* clear Field */

  for (let index = 0; index < sideDishes.length; index++) {
    contentRef.innerHTML += getSideDishesTemplate(index);
  }
}


function addSideDishesItemToBasket(button) {
  // 1. reading attribute
  const index = button.getAttribute('data-info');

  // 2. pick up Element from array
  const selectedItem = { ...sideDishes[index] };


  // 3. check if is in the array
  let itemExists = false;

  myMainBasket.forEach((basketItem, basketIndex) => {
    if (basketItem.name === selectedItem.name) {
      // Item exists, raise Quantity
      myMainBasket[basketIndex].basketAmount += 1;
      let priceItem =
        selectedItem.price * myMainBasket[basketIndex].basketAmount;
      itemExists = true;
    price = priceItem;
      
    }
  });

  // If Item does not exists
  if (!itemExists) {
    selectedItem.basketAmount = 1;
    myMainBasket.push(selectedItem);
  }

  // 4. give it in the basket array
  saveBasket();
  showBasket();
}


function showBasket() {
  if (myMainBasket.length != 0) {
    showTotalSums(myMainBasket);
    
  }
  
  let contentRef = document.getElementById("purchaseBasketTotal");
  contentRef.innerHTML = ""; /* clear Field */


  for (let index = 0; index < myMainBasket.length; index++) {
    totalItemPrice = Number(myMainBasket[index].price);
    totalItemPrice = totalItemPrice.toFixed(2);
    totalItemPriceEU = totalItemPrice.replace('.', ',');
    contentRef.innerHTML += getpurchaseBasketTotalTemplate(index);
  }
}


function raiseBasket(button) {
  const index = button.getAttribute('data-info');
  const singlePrice = myMainBasket[index].price / myMainBasket[index].basketAmount;
  myMainBasket[index].basketAmount += 1;
  myMainBasket[index].price = singlePrice * myMainBasket[index].basketAmount;
  //  show it
  saveBasket();
  showBasket();
}

function reduceBasket(button) {
  const index = button.getAttribute('data-info');
  const singlePrice = myMainBasket[index].price / myMainBasket[index].basketAmount;
  myMainBasket[index].basketAmount -= 1;
  if (myMainBasket[index].basketAmount != 0){
    myMainBasket[index].price = singlePrice * myMainBasket[index].basketAmount;
  //  show it
  saveBasket();
  showBasket();
  showTotalSums();
  }
  else {
    removeItem(button);
  }

  
}

// loading localStorage 
function loadBasket() {
  const saved = localStorage.getItem('myMainBasket');
  if (saved) {
    basket = JSON.parse(saved);
    showBasket();
  }
}

function removeItem(button) {
  const index = button.getAttribute('data-info');
  myMainBasket.splice(index, 1);
  saveBasket();  
  showBasket();
  showTotalSums();

}

function calculateCostofBasket(myMainBasket) {
   totalItemPrice = 0;
  myMainBasket.forEach(function (object){
    totalItemPrice += Number(object.price);
  })
  
let displayTotalItemPrice = totalItemPrice.toFixed(2).replace('.', ',') + '€';
  return displayTotalItemPrice;
  
}

function totalCosts(totalItemPrice, deliveryCosts) {
  const totalCostsNumber = totalItemPrice + deliveryCosts;
  let displayTotalCostNumber = totalCostsNumber.toFixed(2).replace('.', ',') + '€';
  return displayTotalCostNumber;
}

function showTotalSums() {
  let contentRef = document.getElementById("amountBasketContainer");
  if (myMainBasket.length === 0) {
    contentRef.innerHTML = ""; /* clear Field */
  }
  else {
    
    calculateCostofBasket(myMainBasket);
  
  contentRef.innerHTML = ""; /* clear Field */

    contentRef.innerHTML = getAmountBasketTotalTemplate();
  }
  
}



document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("openBasketButton");
  const basket = document.querySelector(".purchaseBasket");
  const overlay = document.getElementById("overlay");

  // basket open/close with button
  openButton.addEventListener("click", () => {
    basket.classList.toggle("active");
    overlay.classList.toggle("active");
    
    //no background scoll
    document.body.style.overflow = basket.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // close Overlay
  overlay.addEventListener("click", () => {
    basket.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});