import preOrderModel from "../models/preOrderModel.js";

export const preOrderService = async (orderData) => {
  try {
    const preorder = new preOrderModel(orderData);
    await preorder.save();
    return preorder;
  } catch (error) {
    return [false, error.message];
  }
};

export const getpreOrderService = async () => {
  try {
    const preOrders = await preOrderModel.find();
    return preOrders;
  } catch (error) {
    return [false, error.message];
  }
};
