let filter = document.querySelectorAll('.filter');
let categoryValue = '';

filter.forEach(element => {
  element.addEventListener('click', () => {
    categoryValue = element.attributes.value.value;
    //console.log(element.attributes.value.value);
    if (categoryValue == 'all') {
      loadItems();
    } else {
      filterItems();
    }
  });
});

function filterItems() {
  let hideDivs = document.querySelectorAll('.all-items');

  $.ajax({
    beforeSend: function() {
      console.log('Espera un momento....');
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    url: `/api/items/category/${categoryValue}`,
    dataType: 'json',
    success: function(responseProducts) {
      console.log('Me llego: ' + JSON.stringify(responseProducts));

      document.querySelector('#item-box').innerHTML = `${responseProducts.map(itemTemplate).join('')}`;
    },
    error: function() {
      alert('no pude completar la comunicacion!!');
    },
    complete: function() {
      console.log('Ya termine!!');
    }
  });
}
