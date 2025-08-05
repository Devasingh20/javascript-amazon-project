
import { cart, addToCart } from '../data/cart.js'
import { products, loadProductsFetch } from '../data/products.js'

renderPage();
async function renderPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    throw new Error('Unespected error.');
  }
  renderProductsGrid();
  renderFilteredProducts(products);
}


function renderProductsGrid() {
  let productHTML = '';
  //external libraries hello();

  products.forEach((product) => {
    productHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
         ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsURL()}">
          <div class="product-rating-count link-primary1">
            ${product.rating.count} ratings
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        ${product.warrantyInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
          
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`
  })
  document.querySelector('.js-product-grid').innerHTML = productHTML;




  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })
    console.log("total quantity in cart : ", cartQuantity);
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
  updateCartQuantity();

  const savedQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
  document.querySelector('.js-cart-quantity').innerHTML = savedQuantity;


  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();


      console.log(cart);

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addedMessage.classList.add('visible');
      setTimeout(() => {
        addedMessage.classList.remove('visible');
      }, 2000);

    })
  })
  return renderProductsGrid;
}



function renderFilteredProducts(filteredProducts) {

  const url = new URLSearchParams(window.location.search);
  const search = url.get('search');



  if (search) {
    filteredProducts = products.filter((product) => {

      //search by kerword
      // let matchingKeyword = false;

      // product.keywords.forEach((keyword) => {
      //   if (keyword.toLowerCase().includes(search.toLowerCase())) {
      //     matchingKeyword = true;
      //   }
      // });

      // return matchingKeyword ||

      //search by name
       return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }



  let filteredProductsHTML = '';

  filteredProducts.forEach((product) => {
    filteredProductsHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
         ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsURL()}">
          <div class="product-rating-count link-primary1">
            ${product.rating.count} ratings
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        ${product.warrantyInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
          
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`
  })
  document.querySelector('.js-product-grid').innerHTML = filteredProductsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })
    console.log("total quantity in cart : ", cartQuantity);
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
  updateCartQuantity();

  const savedQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
  document.querySelector('.js-cart-quantity').innerHTML = savedQuantity;


  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();


      console.log(cart);

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addedMessage.classList.add('visible');
      setTimeout(() => {
        addedMessage.classList.remove('visible');
      }, 2000);

    })
  })

  document.querySelector('.js-search-button').addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value
    window.location.href = `amazon.html?search=${search}`;
  });

document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });

  return renderFilteredProducts;
}
