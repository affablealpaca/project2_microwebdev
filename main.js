const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
  const addForm = card.querySelector(".addForm");
  addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = card.querySelector(".itemname").textContent;
    const productPrice = parseFloat(
      card.querySelector(".saleprice").textContent.replace("$", "")
    );
    const productImage = card.querySelector(".imgitem").src;
    const quantity = parseInt(card.querySelector(".quantityinput").value);

    const productData = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    };

    addToCart(productData);

    console.log(productData.name + " added to cart!");
  });
});

function getCart() {
  const cartStr = sessionStorage.getItem("cart");
  return cartStr ? JSON.parse(cartStr) : [];
}

function addToCart(product) {
  let cart = getCart();

  const existingProductIndex = cart.findIndex(
    (item) => item.name === product.name
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
}
