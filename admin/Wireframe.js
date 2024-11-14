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
