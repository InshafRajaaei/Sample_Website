const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('./HotelManagement.db');

// Create tables if they don't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Bookings (
            BookingId INTEGER PRIMARY KEY AUTOINCREMENT,
            RoomId INTEGER,
            GuestId INTEGER,
            CheckInDate TEXT,
            CheckOutDate TEXT,
            TotalCost REAL,
            FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId),
            FOREIGN KEY (GuestId) REFERENCES Guests(GuestId)
        )
    `);
});

// API Endpoints

// Create a booking
app.post('/bookings', (req, res) => {
    const { RoomId, GuestId, CheckInDate, CheckOutDate, TotalCost } = req.body;
    const sql = `INSERT INTO Bookings (RoomId, GuestId, CheckInDate, CheckOutDate, TotalCost)
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [RoomId, GuestId, CheckInDate, CheckOutDate, TotalCost];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Get all bookings
app.get('/bookings', (req, res) => {
    db.all('SELECT * FROM Bookings', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});