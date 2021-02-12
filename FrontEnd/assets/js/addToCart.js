var urlString = window.location.search;
var urlParam = new URLSearchParams(urlString);
const sousCtgId = urlParam.get('id');

console.log(sousCtgId)



const productDOM = document.querySelector("#card");
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart__centent");
const openCart = document.querySelector(".cart__icon");
const closeCart = document.querySelector(".close__cart");
const overlay = document.querySelector(".cart__overlay");
const cartTotal = document.querySelector(".cart__total");
const clearCartBtn = document.querySelector(".clear__cart");
const itemTotals = document.querySelector(".item__total");



async function getCategory() {
  try {
      const resCategory = await axios.get('http://localhost:3000/api/category/');
      // console.log(resCategory.data.categories[0].name);

      var row = "";
      for (let i = 0; i < resCategory.data.categories.length; i++) {
          console.log(resCategory.data.categories[i].name);
          row = `
          <div class="card">
          <div class="card-body">
          <div class="row">
           <div class="col-10">
           <h5 class="card-title">${resCategory.data.categories[i].name}</h5>
           </div>
           <div class="col-2">
           <a style="    text-decoration: none;" href="souCategory.html?id=${resCategory.data.categories[i]._id}" class="card-link fas fa-arrow-right"></a>

           </div>
          </div>
          </div>
        </div>
          `
          document.getElementById("category").innerHTML += row;

      }



  } catch (error) {
      console.error(error);
  }
}

getCategory()





let cart = [];

let buttonDOM = [];

class UI {
  displayProducts(products) {
    var results = "";
    
    for(let i = 0; i < products.length; i++){
      console.log(products[i]._id);
      results = `
      <div class="col-12 col-md-4 col-lg-4 col-xl-4 mb-2">
      <div class="card" style="width: 100%">
          <img src="http://localhost:3000/api/product/photo/${products[i]._id}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${products[i].name}</h5>
      <div class="row">
          <div class="col-12 d-grid">
              <a href="#" class="btn btn-primary">${products[i].price} DH</a>
          </div>
        
      </div>
      <div class="col-12 my-3">
          <div class="d-grid">
                  <button type="submit" class="btn btn-dark mt-3 addToCart" data-id= ${products[i]._id}>
                      <i class="fal fa-shopping-cart"></i>
                      ADD TO CART</button>
          </div>
      </div>
  </div>
</div>
</div>`;
productDOM.innerHTML += results;
    }
  
    
   
  }

  getButtons() {
    const buttons = [...document.querySelectorAll(".addToCart")];
    buttonDOM = buttons;
    buttons.forEach(button => {
      const id = button.dataset.id;
      const inCart = cart.find(item => item._id === id);

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", e => {
        e.preventDefault();
        e.target.innerHTML = "In Cart";
        e.target.disabled = true;

        // Get product from products
        const cartItem = { ...Storage.getProduct(id), amount: 1 };

        // Add product to cart
        cart = [...cart, cartItem];

        // save the cart in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setItemValues(cart);
        // display the cart item
        this.addCartItem(cartItem);
        // show the cart
      });
    });
  }

  setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.prix * item.amount;
      itemTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    itemTotals.innerText = itemTotal;
  }

  addCartItem({ price, name, _id }) {
    const div = document.createElement("div");
    div.classList.add("cart__item");

    div.innerHTML = `<img src="https://cdn.pixabay.com/photo/2016/05/25/10/43/hamburger-1414422_960_720.jpg">
          <div>
            <h3>${name}</h3>
            <h3 class="price">${price}DH</h3>
          </div>
          <div>
            <span class="increase" data-id=${_id}>
              <svg>
                <use xlink:href="./images/sprite.svg#icon-angle-up"></use>
              </svg>
            </span>
            <p class="item__amount">1</p>
            <span class="decrease" data-id=${_id}>
              <svg>
                <use xlink:href="images/sprite.svg#icon-angle-down"></use>
              </svg>
            </span>
          </div>
            <span class="remove__item" data-id=${_id}>
              <svg>
                <use xlink:href="images/sprite.svg#icon-trash"></use>
              </svg>
            </span>
        </div>`;
    cartContent.appendChild(div);
  }

  show() {
    cartDOM.classList.add("show");
    overlay.classList.add("show");
  }

  hide() {
    cartDOM.classList.remove("show");
    overlay.classList.remove("show");
  }

  setAPP() {
    cart = Storage.getCart();
    this.setItemValues(cart);
    this.populate(cart);

    openCart.addEventListener("click", this.show);
    closeCart.addEventListener("click", this.hide);
  }

  populate(cart) {
    cart.forEach(item => this.addCartItem(item));
  }

  cartLogic() {
    // Clear Cart
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
      this.hide();
    });

    // Cart Functionality
    cartContent.addEventListener("click", e => {
      const target = e.target.closest("span");
      const targetElement = target.classList.contains("remove__item");
      if (!target) return;

      if (targetElement) {
        const id = target.dataset.id;
        this.removeItem(id);
        cartContent.removeChild(target.parentElement);
      } else if (target.classList.contains("increase")) {
        const id =target.dataset.id;
        let tempItem = cart.find(item => item._id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this.setItemValues(cart);
        target.nextElementSibling.innerText = tempItem.amount;
      } else if (target.classList.contains("decrease")) {
        const id = target.dataset.id;
        let tempItem = cart.find(item => item._id === id);
        tempItem.amount--;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.previousElementSibling.innerText = tempItem.amount;
        } else {
          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);
        }
      }
    });
  }

  clearCart() {
    const cartItems = cart.map(item => item._id);
    cartItems.forEach(id => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter(item => item._id !== id);
    this.setItemValues(cart);
    Storage.saveCart(cart);

    let button = this.singleButton(id);
    button.disabled = false;
    button.innerText = "Add to Cart";
  }

  singleButton(id) {
    return buttonDOM.find(button => button.dataset.id === id);
  }
}

class Products {
  async getProducts() {
    try {
      const result = await fetch(`http://localhost:3000/api/product/${sousCtgId}`);
      const products = await result.json();
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

class Storage {
  static saveProduct(obj) {
    localStorage.setItem("products", JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product._id === id);
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const productList = new Products();
  const ui = new UI();

  ui.setAPP();

  const products = await productList.getProducts();
  ui.displayProducts(products);
  Storage.saveProduct(products);
  ui.getButtons();
  ui.cartLogic();

// serviceTable =document.getElementById('serviceTable');

// axios.get('http://localhost:8080/table')
// .then(function (response) {

// // check if codepromo in db 

// for (let i = 0; i < response.data.length; i++) {

//   if (response.data[i].isOcuped == false) {

//     serviceTable.innerHTML+=`<option value="${response.data[i].numTable}">${response.data[i].numTable}</option>`
    
//   }

// }

// }).catch(function (err) {
// console.log(err);
// });

})


// checkout = document.getElementById('checkout');

// checkout.addEventListener('click', () => {



//   let table = document.getElementById('serviceTable').value;
//   total = document.querySelector('.cart__total').innerText;
//   var intTotal = parseInt(total);
//   let codePromo = document.getElementById('codePromo').value;


//   let pourcentage = 0;


  // code promo 


//  axios.get('http://localhost:8080/Codepromo')
//     .then(function (response) {

//       // check if codepromo in db 

//       for (let i = 0; i < response.data.length; i++) {


//         if (codePromo === response.data[i].code && response.data[i].isValid == true) {

//           pourcentage = response.data[i].pourcentage;
//           codePromoId = response.data[i]._id;
//           let tmp = (intTotal * pourcentage) / 100;
//           let totalAfterCode = intTotal - tmp;

//           localStorage.setItem('total', totalAfterCode);

//           total = document.querySelector('.cart__total').innerHTML = totalAfterCode


//           // set isvalid to false in db 
//           axios.put(`http://localhost:8080/Codepromo/update/${codePromoId}`)
//             .then(function (response) {
//               console.log('updated');
//             })
//             .catch(function (err) {
//               console.log(err);
//             });


//         } else {
//           setTimeout(() => {console.log('code invalid or expaired ...!')},300)
 
//         }


//       }


//     }).catch(function (err) {
//       console.log(err);
//     });



// --------------------- service a table  --------------------------------------



// set ocuped to ture after checkout 


// axios.put(`http://localhost:8080/table/update/${table}`)
//             .then(function (response) {
//               console.log('updated');
//             })
//             .catch(function (err) {
//               console.log(err);
//             });


//   localStorage.setItem('total', total);
//   setTimeout(() => {
//     window.location.href = "payment.html";
//   },1000)

//   let xcart = Storage.getCart();

// })