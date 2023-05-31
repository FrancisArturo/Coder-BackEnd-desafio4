const socket = io();

const formAdd = document.getElementById("formAdd");
const formEdit = document.getElementById("formEdit");
const formDelete = document.getElementById("formDelete");

const addProductTitle = document.getElementById("productTitle");
const addProductPrice = document.getElementById("productPrice");
const addProductDescription = document.getElementById("productDesc");
const addProductStock = document.getElementById("productSt");
const addProductCategory = document.getElementById("productCategory");
const addProductStatus = document.getElementById("productStatus");
const addProductCode = document.getElementById("productCode");



formAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        title: addProductTitle.value,
        description: addProductDescription.value,
        code: addProductCode.value,
        price: addProductPrice.value,
        status: addProductStatus.value,
        stock: addProductStock.value,
        category: addProductCategory.value  
    };
    socket.emit("addProduct", data);
    formAdd.reset();
});



