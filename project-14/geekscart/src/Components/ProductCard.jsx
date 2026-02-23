import { Link } from "react-router-dom";
import { Star, User } from "lucide-react";
const ProductCard = ({product}) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
    >
      {/* product Image */}
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">
          {product.category['name']}
        </span>

        <h3 className="font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
        {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded font-medium text-sm hover:bg-blue-700">
            Explore
          </button>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard