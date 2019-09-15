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
  document.querySelector('.product-name').innerHTML = product.name;
  document.querySelector('.product-description').innerHTML = product.description;
  document.querySelector('.product-price').innerHTML = `${product.price == 149.99 ? 'Out of stock' : `$${product.price}`}`;
}