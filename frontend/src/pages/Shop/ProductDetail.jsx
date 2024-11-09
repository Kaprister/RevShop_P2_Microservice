/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import Head from "../../components/common/Head";
import Button from "../../components/common/Button";
// import { addItem } from "../../utils/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductDetail() {
  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  // const userName = useSelector((state) => state.auth.user.username);
  const product = {
    name: data.name,
    image: data.image,
    price: data.price,
    disPrice : data.disPrice,
    desc: data.desc,
    quantity: data.quantity || 1,
    ratings: data.rating,
    size,
  };

  const handleSize = (sizeValue) => {
    setSize(sizeValue);
  };

  const addToCart = async () => {
    // if (!size) {
    //   toast.error("Please select a size");
    //   return;
    // }
    // try {
    //   const product = {
    //     name: data.name,
    //     image: data.image,
    //     price: data.price,
    //     desc: data.desc,
    //     quantity: data.qauntity || 1,
    //     ratings: data.rating,
    //     size,
    //   };

    //   const { data: userCart, error: fetchError } = await supabase
    //     .from("Cart")
    //     .select("*")
    //     .eq("username", userName)
    //     .single();

    //   if (fetchError && fetchError.code !== "PGRST116") {
    //     console.error("Fetch error:", fetchError);
    //     throw fetchError;
    //   }

    //   let updatedProducts;
    //   if (userCart) {
    //     const existingProductIndex = userCart.products.findIndex(
    //       (item) => item.name === product.name && item.size === product.size
    //     );

    //     if (existingProductIndex !== -1) {
    //       updatedProducts = [...userCart.products];
    //       updatedProducts[existingProductIndex].quantity += product.quantity;
    //     } else {
    //       updatedProducts = [...userCart.products, product];
    //     }

    //     const { error: updateError } = await supabase
    //       .from("Cart")
    //       .update({ products: updatedProducts })
    //       .eq("username", userName);

    //     if (updateError) {
    //       console.error("Update error:", updateError);
    //       throw updateError;
    //     }

    //     dispatch(addItem({ item: product }));
    //     toast.success("Product added to cart");
    //   } else {
    //     const { error: insertError } = await supabase.from("Cart").insert([
    //       {
    //         username: userName,
    //         products: [product],
    //       },
    //     ]);

    //     if (insertError) {
    //       console.error("Insert error:", insertError);
    //       throw insertError;
    //     }

    //     dispatch(addItem({ item: product }));
    //     toast.success("Product added to cart");
    //   }
    // } catch (error) {
    //   console.error("Error adding product to cart:", error);
    //   toast.error("Error adding product to cart");
    // }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center">
        <Head h1="Product" h2="Detail" />
      </div>

      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2">
              <div className="sticky top-0 z-50 overflow-hidden">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                  <img
                    src={data.image}
                    alt=""
                    className="object-cover w-full lg:h-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-8">
                  <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                    Buy Today
                  </span>
                  <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {data.name}
                  </h2>
                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {data.desc}
                  </p>
                  <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400">
                    <span>₹{data.disPrice}</span>
                    <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400 ml-2">
                      ₹{data.price}
                    </span>
                  </p>
                  <p className="text-green-600 dark:text-green-300">
                    {data.quantity} in stock
                  </p>
                </div>
                <div className="flex items-center mb-8">
                  <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                    Size:
                  </h2>
                  <div className="flex flex-wrap -mx-2 -mb-2">
                    {availableSizes.map((value) => (
                      <button
                        key={value}
                        className={`py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400 ${
                          value === size ? "bg-mygreen" : ""
                        }`}
                        onClick={() => handleSize(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Rating:{" "}
                    <span className="bg-mygreen p-1 px-3 text-mywhite rounded-md">
                      {product.ratings} ⭐
                    </span>
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-10">
                  <Button
                    text="Add to Cart"
                    color="mygreen"
                    hover="myred"
                    onClick={addToCart}
                  />
                  <Button
                    text="Buy Now"
                    color="myyellow"
                    hover="myred"
                    onClick={() =>
                      navigate("/home/shop/checkout", {
                        state: { directPurchase: product },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;