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
