const PORT = 8000;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://antonio:Incredible12@cluster0.yaj6ec1.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('');
});

app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send('User already exists. Please login');
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
    err.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const user = await users.findOne({ email });

    if (!user) {
      res.status(401).send('User not found!');
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (isPasswordCorrect) {
      const token = jwt.sign(user, email, { expiresIn: 60 * 24 });
      res.status(201).json({ token, userId: user.user_id });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

app.get('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } catch (err) {
    err.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error ocurred.');
  } finally {
    await client.close();
  }
});

app.get('/gendered-users', async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const query = { gender_identity: { $eq: gender } };
    const foundUsers = await users.find(query).toArray();
    res.json(foundUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

app.put('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob_day: formData.dob_year,
        dob_month: formData.dob_month,
        dob_year: formData.dob_day,
        show_gender: formData.showGender,
        gender_identity: formData.gender,
        gender_interest: formData.interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        url: formData.url,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);
    res.send(insertedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

app.put('/addmatch', async (req, res) => {
  const client = new MongoClient();
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };

    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

app.get('/users', async (req, res) => {
  const client = new MongoClient();
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db('app');
    const users = database.collection('users');

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();
    res.json(foundUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error ocurred');
  } finally {
    await client.close();
  }
});

/* MESSAGES */

app.get('/messages', async (req, res) => {
  const client = new MongoClient(uri);
  const { fromId, recipientId } = req.query;

  try {
    client.connect();
    const database = client.db('app');
    const messages = database.collection('messages');

    const query = {
      from_userId: fromId,
      to_userId: recipientId,
    };

    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occured');
  } finally {
    await client.close();
  }
});

app.post('/message', async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    client.connect();
    const database = client.db('app');
    const messages = database.collection('messages');
    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occured');
  } finally {
    await client.close();
  }
});

app.listen(PORT, console.log('Server running on PORT ' + PORT));
