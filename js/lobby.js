const roles = document.getElementById("roles");
const roleSec = document.getElementById("roleSec");
const closeBtn = document.getElementById("close");
roles.addEventListener("click", function () {
  roleSec.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
  roleSec.style.display = "none";
});
