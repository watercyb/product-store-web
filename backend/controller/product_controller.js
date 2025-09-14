import Product from "../models/product_model.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const save = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields." });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const del = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res.status(201).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found." });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res.status(201).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found." });
  }
};
