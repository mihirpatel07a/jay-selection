import CartItem from "../model.js/cart.model.js";
import Item from "../model.js/item.model.js"; // Adjust path as necessary


export const createItem = async (req, res, next) => {
    try {
        // Input validation (example)
        if (!req.body.availability) {
            return res.status(400).json({ success: false, message: "Availability is required" });
        }

        const item = new Item({
            title: req.body.title,
            description: req.body.description,
            brand: req.body.brand,
            category: req.body.category,
            gender: req.body.gender,
            size: req.body.sizes, // Ensure correct field name
            color: req.body.color,
            price: req.body.price,
            discount: req.body.discount,
            stock_quantity: req.body.quantity, // Ensure correct field name
            availability: req.body.availability,
            imageUrls: req.body.imageUrls
        });

        await item.save();

        console.log("Item created:", item);

        res.status(201).json({
            success: true,
            message: "Item successfully created",
            data: item
        });
    } catch (error) {
        console.error("Error creating item:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

 // Adjust the path to your Item model

export const getAllItems = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const category = req.query.category || "";
    const size = req.query.size || "";
    const color = req.query.color || "";
    const gender = req.query.gender || "";
    const order = req.query.order || "desc";

    let query = {};

    // Conditionally add filters based on query parameters
    if (searchTerm) {
      query.title = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
    }
    if (category) {
      query.category = category;
    }
    if (size) {
      query.size = size;
    }
    if (color) {
      query.color = color;
    }
    if (gender) {
      query.gender = gender;
    }

    // Fetch items from database based on constructed query
    const data = await Item.find(query)
      .sort({ [sort]: order })
      .exec(); // Execute the query

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching items.",
    });
  }
};




export const deleteItem = async (req, res, next) => {

    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            res.status(404).json({
                message: "item not found",
                success: false
            })

            return

        }
        await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "successfully deleted"
        })
    }

    catch (error) {
        res.status(401).json({
            success: false,
            message: "something wrong"
        });
    }

}

 // Adjust the import based on your actual item model location

export const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Failed to update item"
            });
        }

        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: updatedItem
        });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};






export const getItem = async(req , res, next)=> {

    try{

    
    const item = await Item.findById(req.params.id);

    if(!item)
        {
            res.status(404).json({
                message : "item not found" , 
                success : false
            })

            retrun 
        }

        res.status(200).json(item);
    }

    catch(error)
    {
        res.status(401).json({
            success: false,
            message: "something wrong"
        });
    }


}



export const createCartData = async (req, res) => {
    try {
        // Input validation - You might want to implement validation here before proceeding

        const { id, name, size, color, price, quantity, imageSrc ,userid , totalprice} = req.body;

        // Create a new CartItem instance
        const newItem = new CartItem({
            id,
            name,
            size, // Assuming size is correctly provided in the request body
            color,
            price,
            userid , 
            quantity,
            imageSrc,
            totalprice
        });

        // Save the new item to the database
        const savedItem = await newItem.save();

        // Return success response with the created item
        res.status(201).json({
            success: true,
            message: "Item successfully created",
            data: savedItem
        });
    } catch (error) {
        console.error("Error creating item:", error);

        // Return error response
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const getCartData = async(req ,res)=>{

    try{
        const data = await CartItem.find({ userid: req.params.id });

        if(!data)
            {
                res.status(404).json({
                    message : "data not found" , 
                    success : false
                })
    
                retrun 
            }
    

        res.status(200).json(data);
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const removeCartItem = async(req , res )=> {

    try {
        const item = await CartItem.findById(req.params.id);

        if (!item) {
            res.status(404).json({
                message: "CartItem not found",
                success: false
            })

            return

        }
        await CartItem.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "successfully deleted"
        })
    }

    catch (error) {
        res.status(401).json({
            success: false,
            message: "something wrong"
        });
    }

}

export const  updateCart = async(req , res)=> {

    const { cartProducts } = req.body;

    try {
      for (const product of cartProducts) {
        await CartItem.updateOne(
          { _id: product._id },
          { $set: { quantity: product.quantity, totalprice: product.totalprice } }
        );
      }
  
      res.status(200).json({ success: true, message: 'Cart updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to update cart' });
    }
}
 // Assuming CartItem is your Mongoose model for cart items

export const deleteCart = async (req, res) => {
    try {
        // Find all cart items by userid
        const items = await CartItem.find({ userid: req.params.id });

        if (!items || items.length === 0) {
            return res.status(404).json({
                message: "CartItems not found for the given userid",
                success: false
            });
        }

        // Delete all cart items
        await CartItem.deleteMany({ userid: req.params.id });

        return res.status(200).json({
            success: true,
            message: "Successfully deleted all cart items"
        });
    } catch (error) {
        console.error("Error deleting cart items:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


// Ensure that the Order model is correctly imported

