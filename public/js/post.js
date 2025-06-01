function deleteAlert(e){
    if(!confirm("Brate jesi siguran da želiš da izbrišeš ovo brate...?")){
        e.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const navTop = nav.offsetTop; // Get the original position of nav

    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // If we've scrolled past the original position of the navbar
        if (scrollPosition > navTop) {
            nav.classList.add('fixed');
        } 
        // If we've scrolled back up to or above the original position
        else {
            nav.classList.remove('fixed');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});