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

    function showTable() {
      var table = document.getElementById("dataTable",);
      if (table.style.display === "none") {
          table.style.display = "table";
      } else {
          table.style.display = "none";
      }
  } 


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