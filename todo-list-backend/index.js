import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import todosRouter from './routes/todos.js';
import { config } from 'dotenv';

const app = express();

app.use(bodyParser.json());
app.use(cors());
config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB ');
}).catch(err => {
  console.log('Error connecting to MongoDB', err);
});

app.use('/todos', todosRouter);

const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
  res.send("This is a todo list backend link")
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
