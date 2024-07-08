document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-container");
  const totalPriceElement = document.getElementById("total-price");

  function displayCart() {
    let cart = getCart();
    let cartTotal = 0;
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.textContent = "$0.00";
    } else {
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100">
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: $${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
          `;

        cartContainer.appendChild(cartItemDiv);
      });

      totalPriceElement.textContent = `$${cartTotal.toFixed(2)}`;
    }

    addRemoveItemListeners();
  }

  function addRemoveItemListeners() {
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemIndex = button.dataset.index;
        removeItemFromCart(itemIndex);
        displayCart();
      });
    });
  }

  function removeItemFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  function getCart() {
    const cartStr = sessionStorage.getItem("cart");
    return cartStr ? JSON.parse(cartStr) : [];
  }

  displayCart();
});
