let url = new URL(window.location.href);
let id = url.searchParams.get('id');

$.ajax({
  beforeSend: function() {
    console.log('Espera un momento....');
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  url: `/api/products/product/${id}`,
  dataType: 'json',
  success: function(responseProduct) {
    console.log('Me llego: ' + JSON.stringify(responseProduct));
  
    productTemplate(responseProduct);
  },
  error: function() {
    alert('no pude completar la comunicacion!!');
  },
  complete: function() {
    console.log('Ya termine!!');
  }
});

function productTemplate(product) {
  let buttonState = product.stock == 0 ? 'disabled' : '';
  let buttonMessage = product.stock == 0 ? 'Out of stock' : 'Agregar al Carrito';
  
  document.querySelector('.product-name').innerHTML = product.name;
  document.querySelector('.product-description').innerHTML = product.description;
  document.querySelector('.product-price').innerHTML = `${product.price == 149.99 ? 'Out of stock' : `$${product.price}`}`;
  //document.querySelector('.add-toCart').innerHTML = `<a href="/api/products/add-to-cart/${product.id}">Agregar al Carrito </a>`;
  document.querySelector('.add-toCart').innerHTML = `<form action="/api/products/add-to-cart/${product.id}" method="post">
                                                          <button type="submit" name="${product.id}" value="${product.id}" class="btn-link" ${buttonState}>${buttonMessage}</button>
                                                     </form>`;
};