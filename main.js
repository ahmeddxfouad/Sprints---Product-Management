// Product class and management system
function Product(name, price, category) {
  this.name = name;
  this.price = price;
  this.category = category;
}

// Product Management System
let products = [];

function addProduct(product) {
  const existingProduct = products.find(p => p.name === product.name);
  if (!existingProduct) {
    products.push(product);
    console.log(`Added`);
  } else {
    console.log(`Already exists`);
  }
  displayProducts();
}

function editProduct(productName, updatedDetails) {
  const product = products.find(p => p.name === productName);
  if (product) {
    Object.assign(product, updatedDetails);
    console.log(`Updated`);
  } else {
    console.log(`Not found`);
  }
  displayProducts();
}

function deleteProduct(productName) {
  const productIndex = products.findIndex(p => p.name === productName);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    console.log(`Deleted`);
  } else {
    console.log(`Not found`);
  }
  displayProducts();
}

function displayProducts() {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<li>No products available.</li>";
    return;
  }

  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${product.name} - $${product.price.toFixed(2)} (${product.category})`;
    productList.appendChild(li);
  });
}

// Event Listeners
const addForm = document.querySelector("#add-form");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#product-name").value;
  const price = parseFloat(document.querySelector("#product-price").value);
  const category = document.querySelector("#product-category").value;

  if (name && !isNaN(price) && category) {
    addProduct(new Product(name, price, category));
    addForm.reset();
  } else {
    alert("Please fill in all fields correctly.");
  }
});

const editForm = document.querySelector("#edit-form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#edit-name").value;
  const price = parseFloat(document.querySelector("#edit-price").value);
  const category = document.querySelector("#edit-category").value;

  if (name) {
    const updatedDetails = {};
    if (!isNaN(price)) updatedDetails.price = price;
    if (category) updatedDetails.category = category;

    editProduct(name, updatedDetails);
    editForm.reset();
  } else {
    alert("Please provide the product name to edit.");
  }
});

const deleteForm = document.querySelector("#delete-form");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#delete-name").value;

  if (name) {
    deleteProduct(name);
    deleteForm.reset();
  } else {
    alert("Please provide the product name to delete.");
  }
});

