import OrderModel from "./order.model";


//* create order into database
const createOrderIntoDB = async (order: any) => {
  const result = await OrderModel.create(order);
  return result;
};

export const orderServices = {
    createOrderIntoDB,
}