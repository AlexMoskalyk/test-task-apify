# test-task-apify
### Task specification

1. Your goal is to extract all products from an imaginary e-commerce JSON API with limited results per search. The API URL origin is [`https://api.ecommerce.com/products`](https://api.ecommerce.com/products) . This URL doesn’t exist (it is only imaginary) so don’t try to run the code 🙂

2. The API is called via a simple GET request without a need for special headers and it will return JSON data.

3. Every API call will return max 1000 products. Your goal is to overcome this limitation by creating requests for specific price ranges of products. You don’t know upfront how many products there are total but this number is returned from the API.

4. Each product on the API costs somewhere between $0 and $100,000. 

5. You can make the request more specific by adding a `minPrice` and `maxPrice` query parameters. This way we can overcome the 1000 limit of results per API call. **The API doesn’t support any other parameters.**

6. Create an algorithm that will ensure that all products are scraped and accumulate all products into a single array called `products`.

7. This is an example response of the JSON API. `total` means how many products there are on the API for this price range (it will be a different number for whole website or different price range). `count` means how many were returned on this API call (max is 1000). `products` is an array with the length of `count`. We don't care about what is inside the product objects.

```json
{
    "total": 99999,
    "count": 1000,
    "products": [{}, {}, ...]
}
```

8. Is there some expectations your code relies on? If yes, write it in the comments. Could the code be written in a way that does not depend on these expectations?