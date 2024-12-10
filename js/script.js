// Web Designer: Dusty Busby
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('active');
    document.querySelector('.menu-toggle').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});