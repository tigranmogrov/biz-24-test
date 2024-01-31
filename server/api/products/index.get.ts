import { H3Error, H3Event } from 'h3';
import { PostLimitEnum } from '~~/enum/post.enum';
import { Product } from '~~/server/api/products/product.model';
import type { IProductsData } from '~~/types/product';

export default defineEventHandler(async (event: H3Event): Promise<H3Error | IProductsData> => {
  const query = getQuery(event);
  const LIMIT = Number(query.limit) || PostLimitEnum.DEFAULT;
  const { price, ...allQuery } = query;
  const parsePrice = String(price).split('-');
  const minPrice = Number(parsePrice[0]) || 0;
  const maxPrice = Number(parsePrice[1]) || +Infinity;
  try {
    const products = await Product.find({ ...allQuery, price: { $gte: minPrice, $lte: maxPrice } });
    const totalItems = await Product.countDocuments();
    const totalPage = Math.ceil(totalItems / LIMIT);
    return {
      products,
      totalItems,
      totalPage,
    };
  } catch (error: any) {
    return createError({
      message: error.message,
    });
  }
});
