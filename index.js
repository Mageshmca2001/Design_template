// index.js

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the values from the input fields
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simple validation (you can enhance this as needed)
  if (username === '' || password === '') {
      document.getElementById('error-message').textContent = 'Please fill in both fields.';
      return;
  }

  // Here you would typically send a request to your server to validate the credentials
  // For demonstration, let's assume the login is successful if username is "user" and password is "pass"
  if (username === 'admin' && password === 'admin') {
      // Redirect to another page upon successful login
      window.location.href = './admin/index.html'; // Change 'dashboard.html' to your desired page
  } else {
      document.getElementById('error-message').textContent = 'Invalid username or password.';
  }
});