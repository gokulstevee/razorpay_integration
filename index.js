const express = require('express');
const Razorpay = require('razorpay');
require('dotenv').config();
const app = express();
const cors = require('cors');

//To allow for cross-orgin request
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static('./public'));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hi");
// });

app.post('/order', async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
    // this needs to go in .env
  });

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };
  //   instance.orders.create(options, function (err, order) {
  //     console.log(order);
  //   });

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount,
    order: myOrder,
  });
});

app.listen(4000, () => console.log(`Server is running at port 4000`));
