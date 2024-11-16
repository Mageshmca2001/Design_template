let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
   let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
   arrowParent.classList.toggle("showMenu");
    });
  }
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".bx-menu");
  console.log(sidebarBtn);
  sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });


  function logout() {
    // Confirm if the user wants to log out
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        // Clear user session data, such as removing tokens or cookies
        localStorage.removeItem('authToken');  // If you store auth token in localStorage
        sessionStorage.clear();                // Clear session storage if used

        // Alert the user about successful logout
        alert("You have been successfully logged out.");

        // Optionally, redirect to login or home page after logout
        window.location.href = "../index.html";  
    }
}


/* api running */

const ctx = document.getElementById('Api-Posting').getContext('2d');
const cpuUsageChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({length: 120}, (_, i) => i + 1),
        datasets: [{
            label: 'Post Forwarding',
            data: Array.from({length: 120}, () => Math.floor(Math.random() * 100)),
            backgroundColor: 'rgba(0, 188, 212, 0.5)',
            borderColor: '#00bcd4',
            fill: true,
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

let interval;

function updateChart() {
    cpuUsageChart.data.datasets[0].data.shift();
    cpuUsageChart.data.datasets[0].data.push(Math.floor(Math.random() * 100));
    cpuUsageChart.update();
}

document.getElementById('toggle').addEventListener('change', function() {
    if (this.checked) {
        interval = setInterval(updateChart, 1000); // Update every second
    } else {
        clearInterval(interval);
    }
});

/* Search-menu */

const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');

    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('active');
    });