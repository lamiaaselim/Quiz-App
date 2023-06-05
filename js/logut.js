$('#LogInNav').click(function(){
    if ($(this).attr('data-i18n') == 'logout') {
        alert('logut')
        localStorage.clear();
        location.reload()
}})