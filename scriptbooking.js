// Add a 'loaded' class to the body once the page is fully loaded
window.addEventListener('load', function () {
  document.body.classList.add('loaded');
});

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const booking = {
      name: document.getElementById('name').value,
      contact: document.getElementById('contact').value,
      email: document.getElementById('email').value,
      checkInDate: document.getElementById('checkInDate').value,
      checkOutDate: document.getElementById('checkOutDate').value,
      guests: document.getElementById('guestId').value,
      roomType: document.getElementById('roomId').value,
      roomCount: document.getElementById('roomCount').value,
      specialRequests: document.getElementById('requests').value
  };

  try {
      // Send the booking data to the backend
      const response = await fetch('http://localhost:3000/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking)
      });

      // Handle the response
      if (response.ok) {
          alert('Booking confirmed!');
          // Optionally, reset the form after successful submission
          document.getElementById('bookingForm').reset();
      } else {
          alert('Booking failed. Please try again.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Booking failed. Please check your connection.');
  }
});