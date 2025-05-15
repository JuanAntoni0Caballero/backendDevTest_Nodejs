import logger from '../config/logger.js'
import { fetchWithTimeout } from '../utils/fetchWithTimeout.js';

export async function fetchSimilarProducts(productId) {
    const similarIds = await getSimilarProductIds(productId);
    return await getProductDetailsByIds(similarIds);
}

async function getSimilarProductIds(productId) {

    const BASE_URL = process.env.BASE_URL;
    const response = await fetch(`${BASE_URL}/${productId}/similarids`);

    if (response.status === 404) {
        const error = new Error('Product not found');
        error.status = 404;
        throw error;
    }

    if (response.status === 500) {
        const error = new Error(`Failed to fetch similar IDs (status ${response.status})`);
        error.status = 500;
        throw error;
    }

    return await response.json();
}

export async function getProductDetailsByIds(ids) {
    const BASE_URL = process.env.BASE_URL;

    const productDetailsPromises = ids.map(async (id) => {
        try {
            const res = await fetchWithTimeout(`${BASE_URL}/${id}`, {}, 2000);

            if (!res.ok) {
                if (res.status === 404) {
                    logger.warn(`Producto ${id} no encontrado (404)`);
                    return null;
                }
                if (res.status === 500) {
                    logger.error(`Error del servidor para producto ${id} (500)`);
                    return null;
                }
                throw new Error(`Error al obtener producto ${id} (status ${res.status})`);
            }

            return await res.json();

        } catch (err) {
            logger.error(`Error al obtener producto ${id}: ${err.message}`);
            return null;
        }
    });

    const products = await Promise.all(productDetailsPromises);
    return products.filter(product => product !== null);
}