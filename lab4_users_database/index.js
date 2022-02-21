const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./User')


const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://namya09:namya09@comp3123.ckb9j.mongodb.net/db_f2021_comp3123?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.post('/users', async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save((err) => {
      if(err){
        res.send(err)
      }else{
        res.send(user);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => { console.log('Server is running...') });