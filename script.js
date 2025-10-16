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
  showMyDesserts();
  showBasket();
}

function showMyDishes() {
  let contentRef = document.getElementById("menuItems");
  contentRef.innerHTML = "";

  for (let index = 0; index < myDishes.length; index++) {
    contentRef.innerHTML += getMainDishesTemplate(index);
  }
}

function showBasketButton() {
  let contentRef = document.getElementById("orderFooter");
  contentRef.innerHTML = "";
  contentRef.innerHTML = getButtonDeclaration();
}




function addItemToBasket(button) {
  const index = button.getAttribute('data-info');
  const selectedItem = { ...myDishes[index] };
  myDischesitemExistsInBasket(selectedItem);
  saveBasket();
  showBasket();
  showBasketButton();
  
}

function myDischesitemExistsInBasket(selectedItem) {
 let itemExists = false;
  myMainBasket.forEach((basketItem, basketIndex) => {
    if (basketItem.name === selectedItem.name) {
      myMainBasket[basketIndex].basketAmount += 1;
      myMainBasket[basketIndex].price =
        selectedItem.price * myMainBasket[basketIndex].basketAmount;
      itemExists = true;
    }
  });
  if (!itemExists) {
    selectedItem.basketAmount = 1;
    myMainBasket.push(selectedItem);
  }
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
  contentRef.innerHTML = "";

  for (let index = 0; index < sideDishes.length; index++) {
    contentRef.innerHTML += getSideDishesTemplate(index);
  }
}


function addSideDishesItemToBasket(button) {
  const index = button.getAttribute('data-info');
  const selectedItem = { ...sideDishes[index] };
  sideDishesItemExistsInBasket(selectedItem);
  saveBasket();
  showBasket();
  showBasketButton();
}

function sideDishesItemExistsInBasket(selectedItem) {
    let itemExists = false;
  myMainBasket.forEach((basketItem, basketIndex) => {
    if (basketItem.name === selectedItem.name) {
      myMainBasket[basketIndex].basketAmount += 1;
      let priceItem = selectedItem.price * myMainBasket[basketIndex].basketAmount;
      itemExists = true;
    price = priceItem; 
    }
  });
  if (!itemExists) {
    selectedItem.basketAmount = 1;
    myMainBasket.push(selectedItem);
  }
}

function showMyDesserts() {
  let contentRef = document.getElementById("dessertContainer");
  contentRef.innerHTML = ""; /* clear Field */

  for (let index = 0; index < myDessertDishes.length; index++) {
    contentRef.innerHTML += getDessertDishesTemplate(index);
  }
}




function addDessertItemToBasket(button) {
  const index = button.getAttribute('data-info');
  const selectedItem = { ...myDessertDishes[index] };
  myDessertItemExistsInBasket(selectedItem);
  saveBasket();
  showBasket();
  showBasketButton();
}

function myDessertItemExistsInBasket(selectedItem) {
   let itemExists = false;
  myMainBasket.forEach((basketItem, basketIndex) => {
    if (basketItem.name === selectedItem.name) {
      myMainBasket[basketIndex].basketAmount += 1;
      myMainBasket[basketIndex].price = selectedItem.price * myMainBasket[basketIndex].basketAmount;
      itemExists = true;
    }
  });
  if (!itemExists) {
    selectedItem.basketAmount = 1;
    myMainBasket.push(selectedItem);
  }
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
    calculateCostofBasket(myMainBasket);
    contentRef.innerHTML = getAmountBasketTotalTemplate();
}

function sendOrder() {
  if(myMainBasket.length === 0) {
    alert("Bitte wählen Sie Ihre Bestellung aus!");
  }
  else {
    alert("Ihre Bestellung wird in kürze zugestellt.");
  }
  
}


function toggleBasket() {
  const basket = document.querySelector(".purchaseBasket");
  const overlay = document.getElementById("overlay");

  basket.classList.toggle("active");
  overlay.classList.toggle("active");
  showTotalSums();

  document.body.style.overflow = basket.classList.contains("active")
    ? "hidden"
    : "auto";
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", () => {
    const basket = document.querySelector(".purchaseBasket");
    const overlay = document.getElementById("overlay");

    basket.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});
