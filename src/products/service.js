
export async function fetchSimilarProducts(productId) {
    const similarIds = await getSimilarProductIds(productId);
    return similarIds;
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
