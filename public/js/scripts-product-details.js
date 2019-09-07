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
  url: `/api/items/product/${id}`,
  dataType: 'json',
  success: function(responseProduct) {
    console.log('Me llego: ' + JSON.stringify(responseProduct));

    document.querySelector('.product-details').innerHTML = `${responseProduct.map(productTemplate).join('')}`;
  },
  error: function() {
    alert('no pude completar la comunicacion!!');
  },
  complete: function() {
    console.log('Ya termine!!');
  }
});

function productTemplate(product) {
    return `<div class="col-12 col-sm-6">
                <div class="img-product mt-2 mb-5 text-center">
                    <img class="img-fluid" src="https://via.placeholder.com/365x369" alt="" />
                    <!--<div class="add-toCart ">Agregar al Carrito</div>-->
                </div>
            </div>

            <div class="col-12 col-sm-6">
                <div class="product-info text-center">
                    <h3>${product.name}</h3>
                    <div class="desc-product ">
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                <div class="btn add-toCart">Agregar al Carrito</div>
            </div>
        </div>
  </div>`
}