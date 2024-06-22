import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { WindIcon } from 'lucide-react';

export default function Cart() {
  const [open, setOpen] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`/api/item/getcartdata/${currentUser.data._id}`, {
        method: 'GET'
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setCartProducts(data);
    };

    getItems();
  }, [currentUser.data._id]);

  const incrementQuantity = (productId) => {
    const updatedProducts = cartProducts.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity + 1;
        const newPrice = product.totalprice + product.price;

        return { ...product, quantity: newQuantity, totalprice: newPrice };
      }
      return product;
    });
    setCartProducts(updatedProducts);
  };

  const decrementQuantity = (productId) => {
    const updatedProducts = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        const newQuantity = product.quantity - 1;
        const newPrice = product.totalprice - product.price;

        return { ...product, quantity: newQuantity, totalprice: newPrice };
      }
      return product;
    });
    setCartProducts(updatedProducts);
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`/api/item/deletecartitem/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      alert('Successfully deleted');
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/item/updatecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartProducts })
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      alert('Successfully checked out');
      navigate('/checkout'); // Navigate to the checkout page
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((sum, product) => sum + product.totalprice, 0);
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${open ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden={!open}>
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Shopping cart</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => { setOpen(false); navigate('/products'); }}
            >
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-y-auto">
            <ul role="list" className="divide-y divide-gray-200">
              {cartProducts.map((product) => (
                <li key={product.id} className="flex py-4 px-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900 gap-10">
                        <h3>
                          <a href={product.href} className="hover:underline">
                            {product.name}
                          </a>
                        </h3>
                        <p>{product.totalprice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="flex">
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-500"
                          onClick={() => decrementQuantity(product.id)}
                        >
                          -
                        </button>
                        <p className="mx-2">{product.quantity}</p>
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-500"
                          onClick={() => incrementQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleRemove(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{calculateSubtotal()}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-4 flex justify-center">
              <button
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            <div className="mt-2 flex justify-center text-sm text-gray-500">
              <p>or</p>
              <button
                type="button"
                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => { setOpen(false); navigate('/products'); }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
