import Order from "../model.js/order.model.js";

export const createOrder = async (req, res) => {
    const { firstName, lastName, email, phoneNo, addressLine, city, state, zipCode, cartItems, totalSum } = req.body;

    // Basic validation (can be expanded as needed)
    if (!firstName || !lastName || !email || !phoneNo || !addressLine || !city || !state || !zipCode || !cartItems || !totalSum) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }



    try {
        const newOrder = new Order({
            firstName,
            lastName,
            email,
            phoneNo,
            addressLine,
            city,
            state,
            zipCode,
            cartItems,
            totalSum
        });

        await newOrder.save();

        res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error); // Log the error for debugging purposes
        res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
    }
}

export const getOrders = async(req , res)=> {

    try{

        const order = await Order.find({email : req.params.email});

        if(!order)
            {
                res.state(404).json({
                    success: false, message: 'Order not found'
                })

                return;
            }
            res.status(201).json(order);

    }
    catch (error) {
     
        res.status(500).json({ success: false, message: error.message });
    }
}