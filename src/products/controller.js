import { fetchSimilarProducts } from "./service.js";


export async function getSimilarProducts(req, res, next) {
    try {
        const productId = req.params.productId;

        const product = await fetchSimilarProducts(productId)
        res.status(200).json(`Llegando a controller: ${product}`);
    } catch (err) {
        next(err);
    }
}
