function showPage() {
    setTimeout(function () {
   
      document.getElementById("loader").style.opacity = "0";

      setTimeout(function () {
        document.getElementById("loader").style.display = "none"; 

       
        let content = document.getElementById("content");
        content.style.display = "block";
        setTimeout(() => {
          content.style.opacity = "1"; 
        }, 50); 
        
      }, 500);
    }, 1000); 
  }