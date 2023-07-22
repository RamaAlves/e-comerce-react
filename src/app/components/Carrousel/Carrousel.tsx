import { Suspense, useState } from "react";
import styles from "./Carrousel.module.scss";
import { Loader } from "../UI/Loader/Loader";

interface Props {
  images: string[];
}

export function Carrousel(props: Props) {
  const [imageFocus, setImageFocus] = useState<string>(
    props.images[0] || "/images/imagesProductsDefault/FallbackProduct.jpg"
  );

  return (
    <div className={styles.carrousel}>
      <section className={styles.containerImageSelect}>
        <Suspense fallback={<Loader />}>
          <img
            className={styles.imageSelect}
            src={imageFocus}
            alt="imagen de producto"
          />
        </Suspense>
      </section>
      <section className={styles.containerImages}>
        {props.images.map((image, i) => {
          return (
            <Suspense fallback={<Loader />}>
              <img
                className={styles.imageOption}
                key={image + i}
                onClick={() => {
                  setImageFocus(image);
                }}
                src={image}
                alt={`imagen ${i}`}
              />
            </Suspense>
          );
        })}
      </section>
    </div>
  );
}
