import { H3Error } from 'h3';
import { Product } from '~~/server/api/products/product.model';
import { IPriceFilter } from '~~/types/product';

export default defineEventHandler(async (): Promise<H3Error<Error> | any> => {
  try {
    const category = await Product.distinct('category');
    const color = await Product.distinct('color');
    const weight = await Product.distinct('weight');
    const priceTemp = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);
    const price: IPriceFilter = {
      min: String(Math.floor(priceTemp[0].minPrice)),
      max: String(Math.round(priceTemp[0].maxPrice)),
    };
    return {
      filters: {
        category,
        color,
        weight,
        price,
      },
    };
  } catch (error: any) {
    return createError({
      message: error.message,
    });
  }
});
