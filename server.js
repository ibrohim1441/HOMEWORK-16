// const express = require("express");
// const fs = require("fs");
// const qs = require("qs");
// const app = express();
// const PORT = 7070;

// // GET /books
// app.get("/books", (req, res) => {
//   const books = readBooksFromFile();
//   const { name, price, max, min } = req.query;

//   let filteredBooks = books;

//   if (name) {
//     filteredBooks = filteredBooks.filter((b) =>
//       b.name.toLowerCase().includes(name.toLowerCase())
//     );
//   }

//   if (price) {
//     filteredBooks = filteredBooks.filter((b) => b.price == price);
//   }

//   if (max && min) {
//     filteredBooks = filteredBooks.filter(
//       (b) => b.price >= min && b.price <= max
//     );
//   }

//   res.send(filteredBooks);
// });

// // GET /books/:id
// app.get("/books/:id", (req, res) => {
//   const books = readBooksFromFile();
//   const book = books.find((b) => b.id == req.params.id);

//   if (book) {
//     res.send(book);
//   } else {
//     res.status(404).send("Book not found.");
//   }
// });

// // POST /books
// app.post("/books", (req, res) => {
//   const books = readBooksFromFile();
//   const book = { id: books.length + 1, ...req.body };
//   books.push(book);
//   writeBooksToFile(books);
//   res.send(book);
// });

// // PUT /books/:id
// app.put("/books/:id", (req, res) => {
//   const books = readBooksFromFile();
//   const index = books.findIndex((b) => b.id == req.params.id);

//   if (index >= 0) {
//     const updatedBook = { ...books[index], ...req.body };
//     books[index] = updatedBook;
//     writeBooksToFile(books);
//     res.send(updatedBook);
//   } else {
//     res.status(404).send("Book not found.");
//   }
// });

// // DELETE /books/:id
// app.delete("/books/:id", (req, res) => {
//   const books = readBooksFromFile();
//   const index = books.findIndex((b) => b.id == req.params.id);

//   if (index >= 0) {
//     const deletedBook = books.splice(index, 1)[0];
//     writeBooksToFile(books);
//     res.send(deletedBook);
//   } else {
//     res.status(404).send("Book yoq");
//   }
// });

// // Helper functions
// function readBooksFromFile() {
//   const data = fs.readFileSync("books.json");
//   return JSON.parse(data);
// }

// function writeBooksToFile(books) {
//   fs.writeFileSync("books.json", JSON.stringify(books));
// }

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server listening ${PORT}`);
// });


// Required packages
// const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const multer = require('multer');

// // Constants
// const PORT = 5000;
// const JWT_SECRET = 'mysecretkey';

// // Data
// const users = [
//   { id: 1, user_name: 'John', email: 'john@example.com', password: 'password1', contact: '1234567890', imagelink: 'user1.jpg' },
//   { id: 2, user_name: 'Jane', email: 'jane@example.com', password: 'password2', contact: '9876543210', imagelink: 'user2.jpg' },
//   { id: 3, user_name: 'Bob', email: 'bob@example.com', password: 'password3', contact: '5555555555', imagelink: 'user3.jpg' },
// ];

// const pharmacies = [
//   { id: 1, name: 'Pharmacy 1', user_id: 1, address: '123 Main St', contact: '1111111111', telegram: 'pharmacy1', imagelink: 'pharmacy1.jpg' },
//   { id: 2, name: 'Pharmacy 2', user_id: 2, address: '456 Elm St', contact: '2222222222', telegram: 'pharmacy2', imagelink: 'pharmacy2.jpg' },
//   { id: 3, name: 'Pharmacy 3', user_id: 3, address: '789 Oak St', contact: '3333333333', telegram: 'pharmacy3', imagelink: 'pharmacy3.jpg' },
// ];

// const tablets = [
//   { id: 1, t_name: 'Tablet 1', pharmacy_id: 1, price: 10, description: 'This is tablet 1', imagelink: 'tablet1.jpg' },
//   { id: 2, t_name: 'Tablet 2', pharmacy_id: 1, price: 20, description: 'This is tablet 2', imagelink: 'tablet2.jpg' },
//   { id: 3, t_name: 'Tablet 3', pharmacy_id: 2, price: 15, description: 'This is tablet 3', imagelink: 'tablet3.jpg' },
//   { id: 4, t_name: 'Tablet 4', pharmacy_id: 2, price: 25, description: 'This is tablet 4', imagelink: 'tablet4.jpg' },
//   { id: 5, t_name: 'Tablet 5', pharmacy_id: 3, price: 30, description: 'This is tablet 5', imagelink: 'tablet5.jpg' },
// ];

// // Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // File upload storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // Express app
// const app = express();
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.post('/register', (req, res) => {
//   // Code for user registration
// });

// app.post('/login', (req, res) => {
//   // Code for user login and JWT token generation
// });

// app.get('/apteka', authenticateToken, (req, res) => {
//   const query = req.query.a;
//   if (query) {
//     const result = pharmacies.find(p => p.name === query);
//     if (result) {
//       const pills = tablets.filter(t => t.pharmacy_id === result.id);
//       res.json({ pharmacy: result, pills: pills });
//     } else {
//       res.status(404).json({ message: 'Pharmacy not found' });
//     }
//   } else {
//     res.json(pharmacies);
//   }
// });

// app.get('/apteka/:id', authenticateToken, (req, res) => {
//   const id = parseInt(req.params.id);
//   const result =pharmacies.find(p => p.id === id);
//   if (result) {
//     const pills = tablets.filter(t => t.pharmacy_id === result.id);
//     res.json({ pharmacy: result, pills: pills });
//   } else {
//     res.status(404).json({ message: 'Pharmacy not found' });
//   }
// });

// app.get('/tabletka', authenticateToken, (req, res) => {
//   res.json(tablets);
// });

// app.get('/tabletka/:id', authenticateToken, (req, res) => {
//   const id = parseInt(req.params.id);
//   const result = tablets.find(t => t.id === id);
//   if (result) {
//     res.json(result);
//   } else {
//     res.status(404).json({ message: 'Tablet not found' });
//   }
// });

// app.get('/tabletka', authenticateToken, (req, res) => {
//   const query = req.query.t;
//   if (query) {
//     const result = tablets.find(t => t.t_name === query);
//     if (result) {
//       res.json(result);
//     } else {
//       res.status(404).json({ message: 'Tablet not found' });
//     }
//   } else {
//     res.json(tablets);
//   }
// });

// app.get('/users', authenticateToken, (req, res) => {
//   const query = req.query.name;
//   if (query) {
//     const result = users.find(u => u.user_name === query);
//     if (result) {
//       res.json(result);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } else {
//     res.json(users);
//   }
// });

// app.get('/users/:id', authenticateToken, (req, res) => {
//   const id = parseInt(req.params.id);
//   const result = users.find(u => u.id === id);
//   if (result) {
//     res.json(result);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

// app.post('/apteka', authenticateToken, (req, res) => {
//   // Code for creating a new Pharmacy
// });

// app.post('/tabletka', authenticateToken, upload.single('image'), (req, res) => {
//   // Code for creating a new Tablet
//   // req.file contains the uploaded image file
// });

// app.put('/apteka/:id', authenticateToken, (req, res) => {
//   // Code for updating an existing Pharmacy
// });

// app.put('/tabletka/:id', authenticateToken, (req, res) => {
//   // Code for updating an existing Tablet
// });

// app.delete('/apteka/:id', authenticateToken, (req, res) => {
//   // Code for deleting an existing Pharmacy
// });

// app.delete('/tabletka/:id', authenticateToken, (req, res) => {
//   // Code for deleting an existing Tablet
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import fs from 'fs';
import moment from 'moment';

const app = express();
app.use(express.json());

const roomsFile = 'rooms.json';
const bookingsFile = 'rooms.json';

function readData(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  return JSON.parse(data);
}

function writeData(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data));
}

function getAvailableRooms(search, type) {
  const rooms = readData(roomsFile);
  let availableRooms = rooms.results;

  if (search) {
    availableRooms = availableRooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (type) {
    availableRooms = availableRooms.filter(room => room.type === type);
  }

  const bookings = readData(bookingsFile).results;
  const now = moment();
  availableRooms = availableRooms.filter(room => {
    const roomBookings = bookings.filter(booking => booking.roomId === room.id);
    const isAvailable = !roomBookings.some(booking => {
      const bookingStart = moment(booking.start);
      const bookingEnd = moment(booking.end);
      return (now.isBetween(bookingStart, bookingEnd) ||
              bookingStart.isBetween(now, bookingEnd) ||
              bookingEnd.isBetween(now, bookingEnd));
    });
    return isAvailable;
  });

  return {
    count: availableRooms.length,
    results: availableRooms
  };
}

function bookRoom(roomId, start, end) {
  const bookings = readData(bookingsFile);
  const now = moment();
  const newBooking = {
    id: bookings.nextId++,
    roomId,
    start,
    end
  };
  const roomBookings = bookings.results.filter(booking => booking.roomId === roomId);
  const isAvailable = !roomBookings.some(booking => {
    const bookingStart = moment(booking.start);
    const bookingEnd = moment(booking.end);
    return (now.isBetween(bookingStart, bookingEnd) ||
            start.isBetween(bookingStart, bookingEnd) ||
            end.isBetween(bookingStart, bookingEnd));
  });
  if (isAvailable) {
    bookings.results.push(newBooking);
    writeData(bookingsFile, bookings);
    return {
      success: true,
      message: 'Room booked successfully'
    };
  } else {
    return {
      success: false,
      message: 'Room is already booked for the specified time period'
    };
  }
}

app.get('/api/rooms', (req, res) => {
  const { search, type } = req.query;
  const availableRooms = getAvailableRooms(search, type);
  res.json(availableRooms);
});

app.post('/api/rooms', (req, res) => {
  const { roomId, start, end } = req.body;
  const result = bookRoom(roomId, moment(start), moment(end));
  res.json(result);
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});