function ProductCard({ product }) {
  return (
    <div className="flex-none p-2 group cursor-pointer">
      <a href={product.url} target="_blank" rel="noopener noreferrer">
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-24 h-24 object-cover"
          />
          <div className="absolute w-full h-full top-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2 text-white text-lg">
            <p className="text-xs text-center">
              Visit
              <br />
              Tokopedia
            </p>
          </div>
        </div>
        <h3 className="mt-2 text-sm font-semibold truncate w-24">
          {product.title}
        </h3>
        <p className="text-sm text-gray-400">
          Rp. {product.price.toLocaleString("id-ID")}
        </p>
      </a>
    </div>
  );
}

export default ProductCard;
