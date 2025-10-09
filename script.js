let myMainBasket = [];
let dishesContainer = document.getElementsByClassName("orderButtonDishes");
let count = 0;
let totalItemPrice = 0.00;
let deliveryCosts = 5.00;
let displayDeliveryCosts = deliveryCosts.toFixed(2).replace('.',',') + "€";

let myDishes = [ 
  {
    name: "Spaghetti Carbonara",
    price: 12.99,
    description: "Cremige Pasta mit Speck und Parmesan, verfeinert mit Sahne.",
    basketAmount: 0,
  },
  {
    name: "Pizza Margherita",
    price: "9.50",
    description: "Standard Pizza mit allem was dazu gehört.",
    basketAmount: 0,
  },
  {
    name: "Pizza Diavola",
    price: "12.99",
    description: "Pizza mit Salami, Sardellen Kapern und extra Käse.",
    basketAmount: 0,
  },
  {
    name: "Spaghetti Scampi",
    price: "14.99",
    description: "Cremige Pasta mit Scampi und Parmesan, stückige Tomaten und Lauch.",
    basketAmount: 0,
  },
  {
    name: "Steak mit Spargel",
    price: "17.99",
    description: "Safitges Steak mit Spargel und Vinaigrette.",
    basketAmount: 0,
  },
];

let sideDishes = [
  {
    name: "Pommes",
    price: 1.99,
    basketAmount: 0,
  },
  {
    name: "Pizza Brötchen",
    price: "3.50",
    basketAmount: 0,
  },
  {
    name: "Pizza Brötchen Käse",
    price: "3.99",
    basketAmount: 0,
  },
  {
    name: "Spaghetti",
    price: "2.99",
    basketAmount: 0,
  },
  {
    name: "Bratkartoffeln",
    price: "2.99",
    basketAmount: 0,
  },
];



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

function getMainDishesTemplate(index) {
  return `<div class="menuItem" tabindex="0">
                <div class="menuItemDescription">
                  <div class="menuItemHeadline">${myDishes[index].name}</div>
                  <div class="ingedientsDescription">
                    ${myDishes[index].description}
                  </div>
                  <div class="menuPrice primary">${myDishes[index].price}€</div>
                </div>
                <div class="orderButtonDishes" role="button" onclick="addItemToBasket(this)" data-info="${index}">
                  <svg
                    viewBox="0 0 24 24"
                    fill="transparent"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-plus-circle plusIcon"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
              </div>`;
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

function getSideDishesTemplate(index) {
  return `
                <div class="sideDishesItem" tabindex="0">
                  <div class="menuItemDescription">
                    <div class="SideDishHeadline">${sideDishes[index].name}</div>
                    <div class="sideDishPrice">${sideDishes[index].price}€</div>
                  </div>
                  <div class="orderButton" onclick="addSideDishesItemToBasket(this);" role="button" data-info="${index}">
                    <svg
                      viewBox="0 0 24 24"
                      fill="transparent"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus-circle plusIcon"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </div>`;
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
      myMainBasket[basketIndex].price =
        selectedItem.price * myMainBasket[basketIndex].basketAmount;
      itemExists = true;
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
    contentRef.innerHTML += getpurchaseBasketTotalTemplate(index);
  }
}

function getpurchaseBasketTotalTemplate(index) {
  return ` <div id="purchaseBasketTotal" class="purchaseBasketItem" tabindex="0">
              <div class="purchaseItem">
                <div class="purchaseItemHeadline fontBold">${myMainBasket[index].name}</div>
              </div>
              <div class="orderItemsAmount">
                <svg
                  onclick="reduceBasket(this)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-minus-circle minusIcon"
                  data-info="${index}"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <div class="amount colorGray">${myMainBasket[index].basketAmount}x</div>
                <svg
                  onclick="raiseBasket(this)"
                  viewBox="0 0 24 24"
                  fill="transparent"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus-circle plusIconBasket"
                  data-info="${index}"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <div class="cashAmount colorGray" >${myMainBasket[index].price}€</div>
                <svg
                  onclick="removeItem(this)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="basketIcon"
                  data-info="${index}"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.7071 3.29289C11.0976 3.68342 11.0976 4.31658 10.7071 4.70711L7.41421 8H16.5858L13.2929 4.70711C12.9024 4.31658 12.9024 3.68342 13.2929 3.29289C13.6834 2.90237 14.3166 2.90237 14.7071 3.29289L19.4142 8H23C23.5523 8 24 8.44772 24 9C24 9.55228 23.5523 10 23 10H22.8346L21.2825 18.5367C21.0231 19.9631 19.7807 21 18.3308 21H5.66915C4.21929 21 2.9769 19.9631 2.71754 18.5367L1.16542 10H1C0.447715 10 0 9.55228 0 9C0 8.44772 0.447715 8 1 8H4.58579L9.29289 3.29289C9.68342 2.90237 10.3166 2.90237 10.7071 3.29289ZM3.19821 10L4.68528 18.1789C4.77174 18.6544 5.18587 19 5.66915 19H18.3308C18.8141 19 19.2283 18.6544 19.3147 18.1789L20.8018 10H3.19821ZM7.3356 12.0136C7.88037 11.9228 8.3956 12.2908 8.48639 12.8356L8.98639 15.8356C9.07719 16.3804 8.70917 16.8956 8.1644 16.9864C7.61963 17.0772 7.1044 16.7092 7.01361 16.1644L6.51361 13.1644C6.42281 12.6196 6.79083 12.1044 7.3356 12.0136ZM16.6644 12.0136C17.2092 12.1044 17.5772 12.6196 17.4864 13.1644L16.9864 16.1644C16.8956 16.7092 16.3804 17.0772 15.8356 16.9864C15.2908 16.8956 14.9228 16.3804 15.0136 15.8356L15.5136 12.8356C15.6044 12.2908 16.1196 11.9228 16.6644 12.0136ZM12 12C12.5523 12 13 12.4477 13 13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13C11 12.4477 11.4477 12 12 12Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>`;
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

function getAmountBasketTotalTemplate() {
  return `<div id="amountBasket" class="calulations">
            <span class="colorGray">Zwischensumme</span>
            <span class="colorGray">${calculateCostofBasket(myMainBasket)}</span>
          </div>
          <div id="deliveryCosts" class="calulations">
            <span class="colorGray">Lieferkosten</span>
            <span class="colorGray">${displayDeliveryCosts}</span>
          </div>
          <div class="calulations fontBold">
            <span class="totalAmount">Gesamt</span>
            <span class="totalAmount">${totalCosts(totalItemPrice, deliveryCosts)}</span>
          </div>
          <footer class="footerBasket">
            <button class="basketButton" onclick="closeDialog()">
              Warenkorb schließen
            </button>
          `;

}



function showDialog() {
  
  let contentRef = document.getElementById("menusSection");
  contentRef.innerHTML = ""; /* Immer leeren bevor es losgeht!!! */

  contentRef.innerHTML = getDialogTemplate();
}

function getDialogTemplate() {
  return `<section class="purchaseBasketSmall">
          <div class="purchase-basket">
            <span><h3 class="headlineBasket">Warenkorb</h3></span>
            <div class="purchaseBasketItem" tabindex="0" onclick="">
              <div class="purchaseItem">
                <div class="purchaseItemHeadline fontBold">Pizza Krabben</div>
              </div>
              <div class="orderItemsAmount">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-minus-circle minusIcon"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <div class="amount colorGray">11x</div>
                <svg
                  viewBox="0 0 24 24"
                  fill="transparent"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus-circle plusIconBasket"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <div class="cashAmount colorGray">64,90€</div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="basketIcon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.7071 3.29289C11.0976 3.68342 11.0976 4.31658 10.7071 4.70711L7.41421 8H16.5858L13.2929 4.70711C12.9024 4.31658 12.9024 3.68342 13.2929 3.29289C13.6834 2.90237 14.3166 2.90237 14.7071 3.29289L19.4142 8H23C23.5523 8 24 8.44772 24 9C24 9.55228 23.5523 10 23 10H22.8346L21.2825 18.5367C21.0231 19.9631 19.7807 21 18.3308 21H5.66915C4.21929 21 2.9769 19.9631 2.71754 18.5367L1.16542 10H1C0.447715 10 0 9.55228 0 9C0 8.44772 0.447715 8 1 8H4.58579L9.29289 3.29289C9.68342 2.90237 10.3166 2.90237 10.7071 3.29289ZM3.19821 10L4.68528 18.1789C4.77174 18.6544 5.18587 19 5.66915 19H18.3308C18.8141 19 19.2283 18.6544 19.3147 18.1789L20.8018 10H3.19821ZM7.3356 12.0136C7.88037 11.9228 8.3956 12.2908 8.48639 12.8356L8.98639 15.8356C9.07719 16.3804 8.70917 16.8956 8.1644 16.9864C7.61963 17.0772 7.1044 16.7092 7.01361 16.1644L6.51361 13.1644C6.42281 12.6196 6.79083 12.1044 7.3356 12.0136ZM16.6644 12.0136C17.2092 12.1044 17.5772 12.6196 17.4864 13.1644L16.9864 16.1644C16.8956 16.7092 16.3804 17.0772 15.8356 16.9864C15.2908 16.8956 14.9228 16.3804 15.0136 15.8356L15.5136 12.8356C15.6044 12.2908 16.1196 11.9228 16.6644 12.0136ZM12 12C12.5523 12 13 12.4477 13 13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13C11 12.4477 11.4477 12 12 12Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div id="amountBasket" class="calulations">
            <span class="colorGray">Zwischensumme</span>
            <span class="colorGray">99,90€</span>
          </div>
          <div id="deliveryCosts" class="calulations">
            <span class="colorGray">Lieferkosten</span>
            <span class="colorGray">5,00€</span>
          </div>
          <div class="calulations fontBold">
            <span class="totalAmount">Gesamt</span>
            <span class="totalAmount">104,90€</span>
          </div>
          <footer class="footerBasket">
            <button class="basketButton" onclick="closeDialog()">
              Warenkorb schließen
            </button>
          </footer>
        </section>`;
}

const dialogRef = document.getElementById("basketDialog");

function openDialog(event) {
  dialogRef.showModal();
  dialogRef.classList.add("opened");
}

function closeDialog(event) {
  event.stopPropagation();
  dialogRef.close();
  dialogRef.classList.remove("opened");
}

function clickPrevention(event) {
  event.stopPropagation();
}

