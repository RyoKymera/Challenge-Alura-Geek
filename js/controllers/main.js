import { ServicesProducts } from "../services/product-services.js";

const ProductContainer = document.querySelector("[data-products]");
const form = document.querySelector("[data-form]");
const clearFormButton = document.querySelector(".buttons-2");


function CreateCard({name, price, image, id}){
    const Card = document.createElement("article");
    Card.classList.add("main-products-style");
    Card.innerHTML = `
        <img src="${image}" alt="Producto en venta" class="main-products-image">
        <p class="text-description">${name}</p>
        <div class="text-price">
            <p>$ ${price}</p>
            <button class="Delete-Button" data-id="${id}">
                <img src="./image/Delete.png" alt="Eliminar producto">
            </button>
        </div>
    `
    const deleteButton = Card.querySelector(".Delete-Button");
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const productId = deleteButton.getAttribute("data-id");

        try {
            await ServicesProducts.DeleteProduct(productId);
            Card.remove();
        } catch (error) {
            console.log(error);
        }
    });
    return Card;
}



const RenderProducts = async () => {
    try {
        const ListProducts = await ServicesProducts.ProductList();
        ListProducts.forEach((product) => {
            const ProductCard = CreateCard(product);
            ProductContainer.appendChild(ProductCard);
        })
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const NewProduct = await ServicesProducts.CreateProducts(name, price, image);
        const NewCard = CreateCard(NewProduct);
        ProductContainer.appendChild(NewCard);
    } catch (error) {
        console.log(error);
    }

    form.reset();
})

clearFormButton.addEventListener("click", () => {
    form.reset();
});

RenderProducts();