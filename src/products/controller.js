import { fetchSimilarProducts } from "./service.js";

export async function getSimilarProducts(req, res, next) {
    try {
        const productId = req.params.productId;

        if (isNaN(productId)) {
            const err = new Error("El identificador del producto debe ser un número válido");
            err.status = 400;
            throw err;
        }

        const similarProducts = await fetchSimilarProducts(productId);
        res.status(200).json(similarProducts);

    } catch (err) {
        next(err);
    }
}
