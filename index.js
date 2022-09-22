import product from './API/product';
import search from './API/search';
import header from './header';
import property from './API/property'

async function handleRequest(request) {
    const headers = header(request.headers)
    const path = new URL(request.url).pathname;

    if (request.method == 'GET') {
        if (path.startsWith('/search/')) {
            return new Response(await search(path.replace('/search/', ''), request.headers.get("host")), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/product/min/')) {
            return new Response(await product(path.replace('/product/min/', ''), 'minimum'), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/product/compact/')) {
            return new Response(await product(path.replace('/product/compact/', ''), 'compact'), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/product/')) {
            return new Response(await product(path.replace('/product/', ''), 'general'), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/property/')) {
            return new Response(await property(path.replace('/property/', ''), 'general'), {
                status: 200,
                headers
            })
        } else {
            return new Response(JSON.stringify(
                {
                    "name": "flipkart-scraper",
                    "description": "API to scrapes search result and product details from Flipkart",
                    "version": "3.0.0",
                    "documentation": "https://github.com/ErParmod/flipkart-s/",
                    "usage": {
                        "search_api": "https://flipkart.chhichora.workers.dev/search/<product_name>",
                        "product_api": "https://flipkart.chhichora.workers.dev/product/<product_link_argument>",
                        "product_min_api": "https://flipkart.chhichora.workers.dev/product/min/<product_link_argument>",
                        "product_compact_api": "https://flipkart.chhichora.workers.dev/product/compact/<product_link_argument>",
                        "product_search_specs": "https://flipkart.chhichora.workers.dev/property/<specs_to_search>/<product_link_argument>"
                    },
                    "examples": {
                        "search_api": "https://flipkart.chhichora.workers.dev/search/smartwatch",
                        "product_api": "https://flipkart.chhichora.workers.dev/product/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ",
                        "product_min_api": "https://flipkart.chhichora.workers.dev/product/min/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ",
                        "product_compact_api": "https://flipkart.chhichora.workers.dev/product/compact/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ",
                        "product_search_specs": "https://flipkart.chhichora.workers.dev/property/battery&display/dl/huami-amazfit-bip-u-smartwatch/p/itmc6ae7a0e9f440?pid=SMWFY7PPGQTEH2BZ"
                    }
                }
                , null, 2), {
                status: 200,
                headers
            })
        }
    } else {
        return Response.redirect("https://github.com/dvishal485/flipkart-scraper-api", 301)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
