import DefaultLayout from "../layouts/DefaultLayout";
import useServices from "@/services/useServices";
import CardProduct from "./CardProduct";

export default async function Products() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getProducts } = useServices();

  const products = await getProducts();

  return (
    <DefaultLayout>
      <div className="flex flex-col p-20 border gap-16">
        <div className="flex flex-row justify-between">
          <div className="text-3xl font-[400]">All Products</div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {products.data.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              listProducts={products.data}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
