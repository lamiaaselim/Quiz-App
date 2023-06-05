       

// function themeToggle(theme) {
//     if (theme == 'dark') {
//         $(document.body).addClass("darkModeLighter");
//         $(".mynav").addClass("darkModeDarker");
//         $(".card").addClass("darkModeDarker");
//         $(".mybtn").addClass("btn-outline-light");
//         $(".mybtn").removeClass("btn-outline-dark");
//         $("#name").addClass("darkModeLighter");
//         $("#password").addClass("darkModeLighter");
//         $("#password-confirm").addClass("darkModeLighter");
//         $("#email").addClass("darkModeLighter");
//         $("#darkBtn").text('Dark Mode');
//         $("#darkBtn").removeClass("darkModeDarker");
//         $("#languageList").addClass("darkModeDarker");

//         $(".mysignupbtn").addClass("btn-outline-info");
//         $(".mysignupbtn").removeClass("btn-outline-danger");

//         $(".member").removeClass("darkModeDarker");
//         $(".member").addClass("darkModeDarker");
//         $(".mybtn").addClass("btn-outline-light");
//         $(".mybtn").removeClass("btn-outline-dark");
        
//     }

//     else {
//         $('.btn').each(function() {
//             $(this).find('*').removeClass('btn-outline-dark').addClass('btn-outline-light btn-light');
//           })
//         $(document.body).removeClass("darkModeLighter");
//         $(".mynav").removeClass("darkModeDarker");
//         $(".card").removeClass("darkModeDarker");
//         $(".mybtn").removeClass("btn-outline-light");
//         $(".mybtn").addClass("btn-outline-dark");
//         $("#name").removeClass("darkModeLighter");
//         $("#password").removeClass("darkModeLighter");
//         $("#password-confirm").removeClass("darkModeLighter");
//         $("#email").removeClass("darkModeLighter");
//         $("#darkBtn").text('Dark Mode');
//         $("#darkBtn").addClass("darkModeDarker");
//         $("#languageList").removeClass("darkModeDarker");

//         $(".mysignupbtn").removeClass("btn-outline-info");
//         $(".mysignupbtn").addClass("btn-outline-danger");

//         $(".member").addClass("darkModeDarker");
//         $(".member").removeClass("darkModeDarker");
//         $(".mybtn").removeClass("btn-outline-light");
//         $(".mybtn").addClass("btn-outline-dark");
        

//     }
// }

// $(document).ready(function () {
//     var theme = localStorage.getItem("theme") || "light";
//     themeToggle(theme);
//     $("#darkBtn").click(function () {

//         theme = localStorage.getItem('theme');
//         if (theme == 'light' || theme == '') {
//             theme = 'dark'
//             themeToggle(theme)
//             localStorage.setItem('theme', 'dark');

//         }
//         else {
//             theme = 'light'
//             themeToggle(theme)
//             localStorage.setItem('theme', 'light');
//         }
//     });
// })