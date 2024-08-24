import ProductFilterForm from "../features/products/ProductFilterForm";
import ProductList from "../features/products/ProductList";

const ProductDisplayPage = () => {
  return (
    <div className="d-flex min-h" style={{ minHeight: "calc(100vh - 100px)" }}>
      <aside
        className="bg-white flex-shrink-0 custom-shadow"
        style={{ width: "280px" }}
      >
        <ProductFilterForm />
      </aside>
      <main className="flex-grow-1 p-0 w-100 h-100">
        <ProductList />
      </main>
    </div>
  );
};

export default ProductDisplayPage;
