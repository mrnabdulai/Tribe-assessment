const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;


const serviceAccount = require('./service-account.json');
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    });


    const db = admin.firestore();
    const tasksCollection = db.collection('tasks');



app.use(cors());
app.use(bodyParser.json());



app.post('/tasks', async (req, res) => {
    try {
      const task = req.body;
      const docRef = await tasksCollection.add(task);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  app.get('/tasks', async (req, res) => {
    try {
      const snapshot = await tasksCollection.get();
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  app.put('/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = req.body;
      await tasksCollection.doc(taskId).update(task);
      res.status(200).send('Task updated successfully');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  app.delete('/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      await tasksCollection.doc(taskId).delete();
      res.status(200).send('Task deleted successfully');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  