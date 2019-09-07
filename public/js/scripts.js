loadItems();

function loadItems() {
  $.ajax({
    beforeSend: function() {
      console.log('Espera un momento....');
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    url: '/api/items',
    //data: { category: aretes },
    dataType: 'json',
    success: function(responseProducts) {
      console.log('Me llego: ' + JSON.stringify(responseProducts));
    
      document.querySelector('#item-box').innerHTML = `${responseProducts
        .map(itemTemplate)
        .join('')}`;
    },
    error: function() {
      alert('no pude completar la comunicacion!!');
    },
    complete: function() {
      console.log('Ya termine!!');
    }
  });
}

function itemTemplate(product) {
  return `<div class="col-12 col-sm-4 all-items">
              <a href="product-detail.html?id=${product.id}" >
                <div class="single-category" value="${product.id}">
                  <img src="https://via.placeholder.com/480x277" class="img-fluid"></img>
                  <span class="mt-2">
                    ${product.id} - ${product.name} : 
                    ${product.price == 149.99 ? 'Out of stock' : product.price}
                  </span>
                </div>
              </a>          
            </div>`;
}

/*const template = document.getElementById('card')
const lista = document.querySelector('#lista')

const data = [{ name: 'Titulo 1' }]

data.forEach(item => {
  const card = template.cloneNode()
  card.querySelector('.titulo').textContent = item.name

  lista.append(card)
})*/
