import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    console.log(product)
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-all duration-300">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="mt-auto text-sm text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
