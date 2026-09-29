import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import { getOneProductService } from "./productServices.js";

const saveOrder = async (data) => {
  try {
    // Check if products array exists and is iterable
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Products array is missing or not iterable');
    }

    const productsDetails = [];

    for (const orderDetails of data.products) {
      const productId = orderDetails.product;

      try {
        const productInfo = await getOneProductService(productId);

        if (!productInfo) {
          console.error(`Product details not found for the given ID: ${productId}`);
          continue;
        }

        const availableStockQty = productInfo.availableStockQty - orderDetails.quantity;

        // Update the product's availableStockQty
        await ProductModel.updateOne(
          { "_id": productId },
          {
            $set: {
              "availableStockQty": availableStockQty,
            },
          }
        );

        const productDetail = {
          productName: productInfo.productName,
          imageURL: productInfo.imageURL,
          packetweight: productInfo.packetweight,
          unitOfMeasure:productInfo.unitOfMeasure,
          description: productInfo.description,
          mrp: productInfo.mrp,
          offerPrice:productInfo.offerPrice,
          createdBy: productInfo.createdBy, 
          quantity:orderDetails.quantity 
        };

        // Push the product details to the array
        productsDetails.push(productDetail);

        // Debugging: Log the product details
        console.log('Product Details:', productDetail);
      } catch (updateError) {
        console.error(`Error updating product: ${updateError.message}`);
        throw new Error('Failed to update product');
      }
    }

    // Check if all required fields in productDetails are present
    if (productsDetails.some(product => !product.createdBy || !product.mrp || !product.description || !product.packetweight || !product.productName ||!product.unitOfMeasure  )) {
      throw new Error('Missing required fields in productDetails');
    }

    data.productDetails = productsDetails;

    const newOrder = new OrderModel(data);  
    const savedOrder = await newOrder.save();

    return { success: true, order: savedOrder };
  } catch (error) {
    console.error('Error while adding the order:', error);
    return { success: false, message: error.message || 'Error processing order' };
  }
};
export default saveOrder;


let getAllOrders = async () => {
  try {
    let allOrders = await OrderModel.find();

    return allOrders;
  } catch (err) {
    console.error('Error in fetching orders:', err);
    throw new Error('Error in fetching orders');
  }
};

let getOrderById = async (id) => {
  try {

    let order = await OrderModel.findById(id);
    return order;
  } catch (err) {
    console.error('Error in fetching order:', err);
    throw new Error('Error in fetching order');

  }
};

let deleteOrderById = async (id) => {
  try {
    //console.log(req.params.id);
    let orderDeleted = await OrderModel.findByIdAndDelete(id);
    return orderDeleted;
  } catch (err) {
    console.error('Error in deleting the  orders:', err);
    throw new Error('Error in deleting orders');
  }
};

let updateOrderById = async (id, updateData) => {
  try {
    // console.log(req.params.id);
    let orderUpdated = await OrderModel.findByIdAndUpdate(id, updateData, { new: true });
    return orderUpdated;
  } catch (err) {
    console.error('Error in updating the  order:', err);
    throw new Error('Error in fetching order');
  }
};


export { saveOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById };
