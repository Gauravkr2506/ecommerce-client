import { useState, useEffect } from "react";

import Layout from "./Layout";
import Card from "./Card";
import { read, productId, listRelated } from "./apiCore";

export default function Product(props) {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    debugger;
    read(productId).then((data) => {
      if (!!data && data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related products
        listRelated(data._id).then((data) => {
          if (!!data && data.error) {
            setError(data.error);
          } else {
            debugger;
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product?.name}
      description={product?.description?.substring(0, 100)}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.map((product, index) => (
            <div key={index} className="mb-3">
              <Card product={product} showViewProductButton={true} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
