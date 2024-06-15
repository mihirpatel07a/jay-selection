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
            sizes: req.body.sizes, // Ensure correct field name
            color: req.body.color,
            price: req.body.price,
            discount: req.body.discount,
            stock_quantity: req.body.quantity, // Ensure correct field name
            availability: req.body.availability,
            imageUrls : req.body.imageUrls 
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
