
import { IProduct } from 'shopify-api-node';


export const toShopifyUpdateProduct = (towerProduct: any): Partial<IProduct> | null => {
  let shopifyUpdateProduct: Partial<IProduct> | null = {
    id: 0,
    body_html: '',
    handle: '',
    options: [],
    product_type: '',
    published_at: '',
    published_scope: '',
    tags: '',
    title: '',
    variants: [],
    vendor: ''
  };
  return shopifyUpdateProduct;
}
