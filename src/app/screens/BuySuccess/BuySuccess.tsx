import { Link } from "react-router-dom";

export function BuySuccess() {
  return (
    <>
      <h1>compra finalizada</h1>
      <Link to="/products">Go to shop</Link>
    </>
  );
}
