let cartItems = [];

// Função para abrir a modal e exibir os itens do carrinho
function openCartModal() {
    let cartModal = document.getElementById("cart-modal");
    let cartItemsContainer = document.getElementById("cart-items");
    let clearCartButton = document.getElementById("clear-cart-btn");
    let totalPriceElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = ''; 

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.className = "flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-4"; // Mudança para flex-col em telas pequenas
        let itemTotalPrice = item.quantity * parseFloat(item.price); 
        totalPrice += itemTotalPrice;
    
        itemDiv.innerHTML = `
            <div class="flex justify-center sm:justify-start">
                <img src="${item.imgSrc}" alt="${item.name}" class="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-md">
            </div>
            <div class="ml-0 sm:ml-4 flex-1 mt-2 sm:mt-0">
                <p class="font-semibold text-center sm:text-left">${item.name}</p>
            </div>
            <div class="flex items-center space-x-2 mt-2 sm:mt-0">
                <p class="font-semibold">R$ ${itemTotalPrice.toFixed(2)}</p>
                <div class="flex space-x-2">
                    <button onclick="updateQuantity(${index}, -1)" class="bg-gray-400 text-white px-2 py-1 rounded-lg">-</button>
                    <span class="font-semibold">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="bg-gray-400 text-white px-2 py-1 rounded-lg">+</button>
                </div>
                <button onclick="removeItemFromCart(${index})" class="bg-red-500 text-white px-2 py-1 rounded-lg"><i class="fas fa-trash-alt"></i>
</button> 
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    
    

    
    totalPriceElement.innerText = `R$ ${totalPrice.toFixed(2)}`;

    
    if (cartItems.length > 0) {
        clearCartButton.classList.remove("hidden");
    } else {
        clearCartButton.classList.add("hidden");
    }

    cartModal.classList.remove("hidden");
}

// Função para fechar a modal
function closeCartModal() {
    document.getElementById("cart-modal").classList.add("hidden");
}


function addItemToCart(name, description, price, imgSrc) {
 
    let numericPrice = parseFloat(price.replace('R$', '').replace(',', '.').trim());
    
    if (isNaN(numericPrice)) {
        showToast("Preço inválido!");
        return;
    }

   
    let existingItem = cartItems.find(item => item.name === name && item.price === numericPrice);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, description, price: numericPrice, imgSrc, quantity: 1 });
    }

    showToast(`${name} foi adicionado ao seu carrinho!`);
}


function updateQuantity(index, change) {
    if (cartItems[index].quantity + change <= 0) {
        cartItems.splice(index, 1); 
    } else {
        cartItems[index].quantity += change; 
    }
    openCartModal();
}


function removeItemFromCart(index) {
    cartItems.splice(index, 1); 
    openCartModal();
}


function clearCart() {
    cartItems = []; 
    openCartModal();
}


function finalizarCompra() {
    alert("Compra finalizada com sucesso!");
    closeCartModal();
}


function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000); 

   
    const style = document.createElement('style');
    style.innerHTML = `
        .toast-message {
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
        }
    `;
    document.head.appendChild(style);
}
