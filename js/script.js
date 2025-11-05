// Almacenamiento de productos en localstorage
function addTocart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //Verificar que el producto exista
    let existingProduct = cart.find(item => item.productName === productName)

    if (existingProduct) {
        // Si el producto existe, vas a aumentar una unidad
        existingProduct.quantity += 1;
    }
    else {
        // si no existe, añadir por primera vez
        cart.push({ productName, price, quantity: 1 })
    }

    //Actualizar el carrito 
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} se añadio al carrito`)

}

//funcion para eliminar los items
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //array que excluya el elemento a eliminar
    const newCart = cart.filter(item => item.productName !== productName);

    //Guardar el nuevo array 
    localStorage.setItem('cart', JSON.stringify(newCart))

    //Recargar la página
    window.location.reload();
}

// Vaciar todo el carrito 
function clearCart() {
    //eliminar todos los productos del localstorage
    localStorage.removeItem('cart')

    //Recargar la página
    window.location.reload()
}

//cargar el carrito en cart.html
if (window.location.pathname.includes('cart.html')) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartContainer = document.getElementById('cart')
    //cambiar cart por total
    const totalContainer = document.getElementById('total')

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p> El carrito esta vacio </p>';
    }
    else {
        let total = 0
        //Por cada producto añadido
        cart.forEach(item => {
            //Crear un contenedor para los items
            const itemContainer = document.createElement('div');
            itemContainer.className = 'cart-item';

            //Texto del producto 
            const itemText = document.createElement('span');
            //añadi un item.price y las llave al item.quantity
            itemText.textContent = `${item.productName} (${item.price} x${item.quantity})- $${item.price * item.quantity}`;

            //Crear un boton para eliminar 
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar'

            //asignar la función
            removeButton.onclick = () => removeFromCart(item.productName)

            //Añadir el texto y el boton del contenedor 
            itemContainer.appendChild(itemText);
            itemContainer.appendChild(removeButton)

            //Añadir el item al contenedor del carrito
            cartContainer.appendChild(itemContainer)

            //sumar el subototal (precio *cantidad) 
            total += (item.price * item.quantity)
        });
        totalContainer.textContent = total;

        //añadir un boton para vaciar el carrito
        if (cart.length > 0) {
            const clearButton = document.createElement('button');
            clearButton.textContent = 'Vaciar Carrito';
            clearButton.onclick = clearCart;
            clearButton.style.marginTop = '20px'
            cartContainer.appendChild(clearButton)
        }
    }
}