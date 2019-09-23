let pagination = document.querySelectorAll('.page-link');
let paginationNumber;

pagination.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        paginationNumber = element.attributes.value.value;
        paginationNumber == 1 ? loadItems() : nextPage();
    });
});

function nextPage(){
    $.ajax({
        beforeSend: function() {
          console.log('Espera un momento....');
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        url: `/api/products/page/${paginationNumber}`,
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