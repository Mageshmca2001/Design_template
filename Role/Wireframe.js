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




/* Search-menu */

const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');

    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('active');
    });


    /* api running*/

  

  /* Search */

  document.getElementById('search').addEventListener('input', function (e) {
    const filter = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#dataTable tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});

  




//export into Excel init 

document.getElementById('exportbtn').addEventListener('click', function() {
    var wb = XLSX.utils.table_to_book(document.getElementById('dataTable'), {
        sheet: "Sheet1"
    });

    const filename = 'Reportsfile.xlsx';
    
   
    XLSX.writeFile(wb, filename);
});



// pagination code this program .

document.addEventListener('DOMContentLoaded', function() {
  const rowsPerPage = 10; // Number of rows to display per page
  let currentPage = 1; // Current page number
  const table = document.getElementById('dataTable');
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  function displayRows() {
      // Hide all rows
      for (let i = 0; i < totalRows; i++) {
          rows[i].style.display = 'none';
      }

      // Calculate start and end index for the current page
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      // Display the rows for the current page
      for (let i = start; i < end && i < totalRows; i++) {
          rows[i].style.display = '';
      }

      // Update pagination info
      document.getElementById('pagination-info').innerText = `Showing ${start + 1} to ${Math.min(end, totalRows)} entries`;

      // Enable/disable buttons based on the current page
      document.getElementById('prev-btn').disabled = currentPage === 1;
      document.getElementById('next-btn').disabled = currentPage === totalPages;
  }

  // Event listeners for pagination buttons
  document.getElementById('prev-btn').addEventListener('click', function() {
      if (currentPage > 1) {
          currentPage--;
          displayRows();
      }
  });

  document.getElementById('next-btn').addEventListener('click', function() {
      if (currentPage < totalPages) {
          currentPage++;
          displayRows();
      }
  });

  // Initial display of rows
  displayRows();
});


/* Api fetching */

window.onload = function () {
    const dataPoints = [];
    let chart;

    // Fetch data from API
    function fetchData(startX, startY, length, callback) {
        $.getJSON(
            `https://canvasjs.com/services/data/datapoints.php?xstart=${startX}&ystart=${startY}&length=${length}&type=json`,
            function (data) {
                callback(data);
            }
        );
    }

    // Initialize Chart
    function initializeChart() {
        fetchData(1, 10, 10, function (data) {
            data.forEach((value) => {
                dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            });

            chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Live Data Updates",
                    fontColor: "#4B5563",
                    fontFamily: "sans-serif",
                },
                axisY: {
                    includeZero: false,
                },
                data: [
                    {
                        type: "line",
                        markerType: "circle",
                        markerColor: "#1D4ED8",
                        lineColor: "#2563EB",
                        dataPoints: dataPoints,
                    },
                ],
            });

            chart.render();
            updateChart(); // Start live updates
        });
    }

    // Update Chart Periodically
    function updateChart() {
        const lastX = dataPoints.length + 1;
        const lastY = dataPoints[dataPoints.length - 1].y;

        fetchData(lastX, lastY, 1, function (data) {
            data.forEach((value) => {
                dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
            });
            chart.render();
            setTimeout(updateChart, 1000);
        });
    }

    // Refresh Data on Button Click
    document
        .getElementById("refreshButton")
        .addEventListener("click", function () {
            const lastX = dataPoints.length + 1;
            const lastY = dataPoints[dataPoints.length - 1].y;

            fetchData(lastX, lastY, 5, function (data) {
                data.forEach((value) => {
                    dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
                });
                chart.render();
            });
        });

    // Initialize the chart and fetch initial data
    initializeChart();
};

/* add User ,Delete ,View */


let editingRow = null;

   function openModal() {
     document.getElementById('userModal').classList.remove('hidden');
     document.getElementById('modalTitle').innerText = 'Add User';
     document.getElementById('userForm').reset();
     editingRow = null;
   }

   function closeModal() {
     document.getElementById('userModal').classList.add('hidden');
   }

   function saveUser() {
     const name = document.getElementById('name').value;
     const dateCreated = document.getElementById('dateCreated').value;
     const role = document.getElementById('role').value;
     const status = document.getElementById('status').value;

     if (editingRow) {
       editingRow.cells[1].innerText = name;
       editingRow.cells[2].innerText = dateCreated;
       editingRow.cells[3].innerText = role;
       editingRow.cells[4].innerText = status;
     } else {
       const table = document.getElementById('userTable');
       const row = table.insertRow();
       row.classList.add('hover:bg-gray-100');
       row.innerHTML = `
         <td class="py-2 px-4 border-b">${table.rows.length}</td>
         <td class="py-2 px-4 border-b">${name}</td>
         <td class="py-2 px-4 border-b">${dateCreated}</td>
         <td class="py-2 px-4 border-b">${role}</td>
         <td class="py-2 px-4 border-b">${status}</td>
         <td class="py-2 px-4 border-b flex items-center">
           <button class="text-blue-600 mr-2" onclick="editUser(this)">
             <i class="fas fa-cog"></i>
           </button>
           <button class="text-red-600" onclick="deleteUser(this)">
             <i class="fas fa-trash"></i>
           </button>
         </td>
       `;
     }

     closeModal();
   }

   function editUser(button) {
     const row = button.parentElement.parentElement;
     editingRow = row;
     document.getElementById('modalTitle').innerText = 'Edit User';
     document.getElementById('name').value = row.cells[1].innerText;
     document.getElementById('dateCreated').value = row.cells[2].innerText;
     document.getElementById('role').value = row.cells[3].innerText;
     document.getElementById('status').value = row.cells[4].innerText;
     openModal();
   }

   function deleteUser(button) {
     if (confirm('Are you sure you want to delete this user?')) {
       const row = button.parentElement.parentElement;
       row.remove();
     }
   }

   function exportToExcel() {
     alert('Export to Excel functionality is not implemented.');
   }

   /* togglt */
   
   $(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});
