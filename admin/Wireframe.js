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


    /* api running */

    function showTable() {
      var table = document.getElementById("dataTable");
      if (table.style.display === "none") {
          table.style.display = "table";
      } else {
          table.style.display = "none";
      }
  }

  document.getElementById('Exportbtn').addEventListener('click', function () {
    var wb = XLSX.utils.table_to_book(document.getElementById('Table'), { sheet: "Sheet1" });
    XLSX.writeFile(wb, 'table-data.xlsx');
  });


  /* Next page */


  const totalEntries = 57; // Total number of entries
  const entriesPerPage = 10; // Entries per page
  let currentPage = 1; // Starting page

  const paginationInfo = document.getElementById('pagination-info');
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  
  // Update pagination info
  function updatePagination() {
    const start = (currentPage - 1) * entriesPerPage + 1;
    const end = Math.min(currentPage * entriesPerPage, totalEntries);
    paginationInfo.textContent = `Showing ${start} to ${end} of ${totalEntries} entries`;
    
    // Disable or enable buttons based on the page number
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(totalEntries / entriesPerPage);
    
    // Update the page button styles
    for (let i = 1; i <= 6; i++) {
      const pageButton = document.getElementById(`page-${i}`);
      if (i === currentPage) {
        pageButton.classList.add('bg-blue-500', 'text-white');
        pageButton.classList.remove('bg-white');
      } else {
        pageButton.classList.remove('bg-blue-500', 'text-white');
        pageButton.classList.add('bg-white');
      }
    }
  }

  // Go to the previous page
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  // Go to the next page
  nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(totalEntries / entriesPerPage)) {
      currentPage++;
      updatePagination();
    }
  });

  // Go to specific page
  for (let i = 1; i <= 6; i++) {
    const pageButton = document.getElementById(`page-${i}`);
    pageButton.addEventListener('click', () => {
      currentPage = i;
      updatePagination();
    });
  }

  // Initialize pagination on page load
  updatePagination();




//export into Excel init 

document.getElementById('exportbtn').addEventListener('click', function() {
    var wb = XLSX.utils.table_to_book(document.getElementById('Table'), {
        sheet: "Sheet1"
    });

    const filename = 'Reportsfile.xlsx';
    
   
    XLSX.writeFile(wb, filename);
});
