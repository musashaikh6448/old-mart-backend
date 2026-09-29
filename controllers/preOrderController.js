import { getpreOrderService, preOrderService } from "../services/preOrdersService.js";



export const preOrder = async (req, res) => {
    try {
        const order = await preOrderService(req.body);
        res.status(200).json({ success: true, message: "order succssfull", order: order })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }

}

export const getPreOrder = async (req, res) => {
    try {
        const order = await getpreOrderService();
        console.log(order)
        res.status(200).json({ success: true, order: order })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }

}