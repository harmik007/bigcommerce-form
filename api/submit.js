// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const db = require('../config/db');

// const app = express();

// app.use(cors());
// app.use(express.json());

// /*
//   TEST API
// */
// app.get('/', (req, res) => {
//   res.send('API Working');
// });

// /*
//   SUBMIT FORM
// */
// app.post('/', async (req, res) => {

//   try {

//     const {
//       product_name,
//       customer_name,
//       email,
//       phone,
//       message
//     } = req.body;

//     /*
//       VALIDATION
//     */
//     if (!customer_name || !email) {

//       return res.status(400).json({
//         success: false,
//         message: 'Name and Email required'
//       });

//     }

//     /*
//       INSERT QUERY
//     */
//     const query = `
//       INSERT INTO product_inquiries
//       (
//         product_name,
//         customer_name,
//         email,
//         phone,
//         message
//       )
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *
//     `;

//     const values = [
//       product_name,
//       customer_name,
//       email,
//       phone,
//       message
//     ];

//     const result = await db.query(query, values);

//     return res.status(200).json({
//       success: true,
//       message: 'Form Submitted Successfully',
//       data: result.rows[0]
//     });

//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: 'Database Error',
//       error: error.message,
//       detail: error.detail || null,
//       stack: error.stack || null
//     });

//   }

// });

// module.exports = app;

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('../config/db');

const app = express();

app.use(cors());
app.use(express.json());

/*
====================================
TEST API
====================================
*/

app.get('/', (req, res) => {

  res.send('API Working');

});

/*
====================================
INSERT FORM DATA
====================================
*/

app.post('/', async (req, res) => {

  try {

    const {
      product_name,
      customer_name,
      email,
      phone,
      message
    } = req.body;

    /*
      VALIDATION
    */

    if (!customer_name || !email) {

      return res.status(400).json({
        success: false,
        message: 'Name and Email required'
      });

    }

    /*
      INSERT QUERY
    */

    const query = `
      INSERT INTO product_inquiries
      (
        product_name,
        customer_name,
        email,
        phone,
        message
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      product_name,
      customer_name,
      email,
      phone,
      message
    ];

    const result = await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: 'Form Submitted Successfully',
      data: result.rows[0]
    });

  } catch (error) {

    console.error('DATABASE ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'Database Error',
      error: error.message
    });

  }

});

/*
====================================
START SERVER
====================================
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});