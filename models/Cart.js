module.exports = function Cart(oldCart){
    
        this.items = oldCart.items || {};
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice  = oldCart.totalPrice || 0;


    this.add = function(item, product_id) {
        let storedItem = this.items[product_id];
        console.log(storedItem);
        if(!storedItem) {
            storedItem = this.items[product_id] = {item: item, quantity: 0};
        }
        storedItem.quantity++;
        storedItem.price = storedItem.item.product_price * storedItem.quantity;
        this.totalQty++;
        this.totalPrice += storedItem.item.product_price;
    };

    this.generateArray = function(){
        let array = [];
        for(let id in this.items){
            array.push(this.items[id]);
        }
        return array;
    };

};

//let cart = new Cart({items:"test", totalQty: 1, price: 200});
//console.log(cart);