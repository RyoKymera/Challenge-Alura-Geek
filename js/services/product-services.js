const BASE_URL = "http://localhost:3001/products"

const ProductList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos: ", error)
    }
};

const CreateProducts = async(name, price, image) =>{
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, price, image})
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear productos: ", error);
    }
}

const DeleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/${productId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
        return await response.json();
    } catch (error) {
        console.log("Error al eliminar producto: ", error);
        throw error;
    }
};

export const ServicesProducts = {
    ProductList,
    CreateProducts,
    DeleteProduct,
};