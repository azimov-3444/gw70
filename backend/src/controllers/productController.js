import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, desc, price, img_url, category_id } = req.body;

    if (name.length == 0 || desc.length == 0) {
      return res.status(400).json({ message: "Qiymat to'ldirilmadi" });
    }
    let newProduct = await Product.create({ name, desc, price, img_url, category_id });
    res
      .status(201)
      .json({ message: "Product yaratildi", category: newProduct });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    let AllCategory = await Category.find();
    res
      .status(201)
      .json({ message: "Category yaratildi", category: AllCategory });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, desc } = req.body;
    let updateCategory = await Category.findByIdAndUpdate(
      { _id: id },
      { name, desc },
    );
    res
      .status(201)
      .json({ message: "Category yangilandi", category: updateCategory });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const DeleteCategory = async (req, res) => {
  try {
    let { id } = req.params;

    await Category.findByIdAndDelete(id);
    res.status(201).json({ message: "Category o'chirildi" });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};
