

$(document).ready(() => {
  $(".card_buttons button").on("click", function() {
    let id = $(this).data("id");    
    $.ajax({
      url: "https://nightlife-app-feddle.glitch.me/",
      method: "POST",
      data: {id: id},            
      success: (d) => $(this).text("Going " + d)
    });
  });
});

