const express = require('express');
const cors = require('cors');

const {Router} = require('express');
const router = Router();
router.get('/try',(req,res) => {
  res.send({message: 'Hello world!'})
});
router.post('/feedback',(req,res) => {
  const {name,mail,phone,date,message} = req.body;
  const nameValidator = /(^[A-Za-z]{3,30}) ([A-Za-z]{3,30}$)/;
  const mailValidator = /^[A-Za-z]\S+@[A-Za-z]\S+\.[A-Za-z]{2,3}$/;
  const phoneValidator = /^7\d{10}$/;
  const messageValidator = /^.{10,300}$/;
  const resultValidation = nameValidator.test(name) && mailValidator.test(mail) && phoneValidator.test(phone) && messageValidator.test(message) && !!date;
  res.send({
    status: resultValidation ? 200 : 400,
    message: resultValidation ? 'Success' : 'Invalid values'
  })
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use('/api',router);

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`)
})