const cartContainer = document.querySelector("#cart--container");
const cartTotal = document.querySelector("#cart--total");
const check0ut = document.querySelector("#check-out");
let cartItem = [
  {
    productId: "1",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo power-bank",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "2",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/12/5214552/1.jpg?3462",
    productTitle: "Oraimo blender",
    productPrice: 4000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "3",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/7891652/1.jpg?1564",
    productTitle: "Oraimo clipper",
    productPrice: 2000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "4",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/19/6396991/1.jpg?4225",
    productTitle: "Oraimo cord",
    productPrice: 3000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "5",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo power-bank",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "6",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo power-bank",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "7",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo power-bank",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "8",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo power-bank",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },

  {
    productId: "9",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/29/3531721/1.jpg?8710",
    productTitle: "Oraimo power-bank",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },
];
let checkoutTotal;

// Var to make the price num human readable
let currencyDisplay = Intl.NumberFormat("en-us");
//function to display cart items

function displaycartItem() {
  //step one, map over products param
  cartContainer.innerHTML = cartItem
    .map((item) => {
      return `
<div class="single--product">
        <img
          src=${item.productImage}
          alt=""
          class="product--image"
        />

        <!-- Information below the image-->
        <div class="product--information">
          <h3 class="product--title">${item.productTitle}</h3>
          <p class="product--amount"> &#8358; ${currencyDisplay.format(
            item.productPrice
          )}</p>

          <!--product quantity button-->

          <div><button onclick=decreaseQuantity('${
            item.productId
          }')>-</button> <span>${
        item.productQuantity
      }</span> <button onclick=increaseQuantity('${
        item.productId
      }')>+</button></div>

      <button onclick="removeItemfromtheCart('${
        item.productId
      }')" class="remove">DELETE</button>  

      <span>
  <button class="love-button" onclick="updateProductLikeness('${
    item.productId
  }')">
    ${
      item.like === true
        ? `<i class="fas fa-heart" style="color: #ff0000;"></i>`
        : `<i class="far fa-heart"></i>`
    }
  </button>
</span>


      
        </div>
      </div> `;
    })
    .join("");
}
displaycartItem();
// function to increase the quantity of a product thats respond as you click on the plus button
function increaseQuantity(id) {
  cartItem.forEach((item) => {
    if (item.productId === id) {
      item.productQuantity = item.productQuantity + 1;
    }
  });
  calculateCartTotal();
  displaycartItem();
}
// function to decrease the quantity of a product thats respond as you click on the minus button
function decreaseQuantity(id) {
  cartItem.forEach((item) => {
    if (item.productId === id) {
      if (item.productQuantity > 1) {
        item.productQuantity = item.productQuantity - 1;
      }
    }
  });

  calculateCartTotal();
  displaycartItem();
}

//function to delete item from the cart as you click on the cart button
function removeItemfromtheCart(id) {
  // Use the findIndex method to find the index of the item with the given productId
  const itemIndex = cartItem.findIndex((item) => item.productId === id);

  if (itemIndex !== -1) {
    // Remove the item from the cart array using splice
    cartItem.splice(itemIndex, 1);
    displaycartItem(); // Update the cart display
    calculateCartTotal();
  }
}

//function to check if a customer like a product and let the color of the love icon change to red when clicked
function updateProductLikeness(id) {
  cartItem.forEach((item) => {
    if (item.productId === id && item.like === false) {
      item.like = true;
    } else if (item.productId === id && item.like === true) {
      item.like = false;
    }
  });
  displaycartItem();
}
// Function to calculate the total amount of items in the cart and display there price, the pricealso change as you decrease or increase the quantity in the cart
function calculateCartTotal() {
  // Use the reduce method to sum the prices of all items in the cart
  checkoutTotal = cartItem.reduce(
    (total, item) => total + item.productPrice * item.productQuantity,
    0
  );

  // Format the cart total with commas for better readability
  const formattedTotal = new Intl.NumberFormat("en-US").format(checkoutTotal);
  cartTotal.textContent = `₦${formattedTotal}`;
}

// Call the calculateCartTotal function
calculateCartTotal();
// click event when the check out button is clicked on
check0ut.addEventListener("click", proceedToCheckOut);
//function to proceed to check out and the alert on total price
function proceedToCheckOut() {
  console.log(cartItem, checkoutTotal);
  alert(
    "Thank you, your order has been taken" + " " + checkoutTotal.toString()
  );
}
