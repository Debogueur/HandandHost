import { Request, Response } from "express";
import { Parser } from "json2csv";
import { Order } from "../entity/order.entity";
import { AppDataSource } from "../core/database-config";

export const Orders = async (req: Request, res: Response) => {
  try {
    const take = 15;
    const page = Number(req.query.page) || 1;

    const [data, total] = await Order.findAndCount({
      take,
      skip: (page - 1) * take,
      relations: [
        "order_items",
        "order_items.product",
        "order_items.productVariant",
      ],
      order: {
        created_at: "DESC",
      },
    });

    res.send({
      data: data.map((order: Order) => ({
        order_ID: order.order_ID,
        // name: order.name,
        // email: order.email,
        subtotal: order.subtotal,
        discount: order.discount,
        shipping_charge: order.shipping_charge,
        total_amount: order.total_amount,
        payment_status: order.payment_status,
        order_status: order.order_status,
        created_at: order.created_at,

        order_items: order.order_items.map((item) => ({
          orderitem_ID: item.orderitem_ID,
          product_ID: item.product_ID,
          productvariant_ID: item.productvariant_ID,
          product_title: item.product?.title || "",
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
      })),

      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};


export const Export = async (req: Request, res: Response) => {
  try {
    const parser = new Parser({
      fields: [
        "Order ID",
        "Name",
        "Email",
        "Product",
        "Variant",
        "Price",
        "Quantity",
        "Total",
      ],
    });

    const orders = await Order.find({
      relations: [
        "order_items",
        "order_items.product",
        "order_items.productVariant",
        "user", // ✅ ADD THIS
      ],
    });

    const json: any[] = [];

    orders.forEach((order) => {
      order.order_items.forEach((item) => {
        json.push({
          "Order ID": order.order_ID,
        //   Name: order.user?.name || "",   // ✅ FIXED
        //   Email: order.user?.email || "",  // ✅ FIXED
          Product: item.product?.title || "",
          Variant:
            item.productVariant?.sku ||
            item.productvariant_ID ||
            "",
          Price: item.price,
          Quantity: item.quantity,
          Total: item.total,
        });
      });
    });

    const csv = parser.parse(json);

    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    res.send(csv);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const Chart = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.query(`
      SELECT 
        DATE(o.created_at) as date,
        SUM(oi.price * oi.quantity) as total
      FROM orders o
      JOIN order_items oi ON o.order_ID = oi.order_ID
      GROUP BY DATE(o.created_at)
      ORDER BY date ASC
    `);

    res.send(result);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};