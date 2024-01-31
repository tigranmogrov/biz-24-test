import { H3Error, H3Event } from 'h3';
import { ProductErrorEnum } from '~~/enum/errors.enum';
import { Product } from '~~/server/api/products/product.model';
import { IProduct } from '~~/types/product';

export default defineEventHandler(async (event: H3Event): Promise<H3Error | IProduct> => {
  const routeSlug = event.context.params?.slug;
  try {
    const product = await Product.find({ slug: routeSlug }).exec();

    if (!product.length) {
      return createError({
        statusMessage: ProductErrorEnum.PRODUCT_NOT_FOUND,
        status: 404,
      });
    }
    return product[0];
  } catch (error: any) {
    return createError({
      message: error.message,
    });
  }
});
