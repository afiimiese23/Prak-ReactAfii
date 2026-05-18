import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import productsData from "../../data/Products.json";
import Card from "../../components/Card";

export default function Products() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Products" />

      <Card>
        <h1 className="text-2xl font-bold mb-4">Product...</h1>
        <div className="overflow-x-auto">...</div>
      </Card>
    </div>
  );
}