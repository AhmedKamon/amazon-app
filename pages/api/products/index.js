import nc from 'next-connect';
import Product from '../../../models/product';
import db from '../../../Utiles/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  // const { method } = req;
  // switch (method) {
  //   case 'GET':
  //     try {
  //       const products = await Product.find({});
  //       res.status(200).json({ sucess: true, data: products });
  //     } catch (error) {
  //       res.status(400).json({ sucess: false });
  //     }
  //     break;
  //   case 'POST':
  //     try {
  //       const product = await Product.create(req.body);
  //       res.status(201).json({ sucess: true, data: product });
  //     } catch (error) {
  //       res.status(400).json({ sucess: false });
  //     }
  //     break;
  //   default:
  //     res.status(400).json({ sucess: false });
  //     break;
  // }

  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;
