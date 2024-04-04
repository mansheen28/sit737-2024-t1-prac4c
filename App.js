const express = require('express');
const app = express();
const winston = require('winston');

app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `New ${req.method} request: ${req.url}`,
       
    });
    next();
});

// Logger function
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level:
   'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
   });


// Addition endpoint
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = num1 + num2;
  res.send({ result });
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = num1 - num2;
  res.send({ result });
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = num1 * num2;
  res.send({ result });
});

// Division endpoint
app.get('/divide', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (num2 === 0) {
    res.status(400).send({ error: 'Division by zero is not allowed' });
  } else {
    const result = num1 / num2;
    res.send({ result });
  }
});

// Exponential endpoint
app.get('/exponential', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = Math.pow(num1, num2);
  res.send({ result });
});

// Modulo endpoint
app.get('/modulo', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = num1 % num2;
  res.send({ result });
});

// Square root endpoint
app.get('/sqrt', (req, res) => {
  const num = parseFloat(req.query.num);
  if (num < 0) {
      res.status(400).send({ error: 'Square root of a negative number is not allowed' });
  } else {
      const result = Math.sqrt(num);
      res.send({ result });
  }
});

// Listening on port 3000 by default
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


