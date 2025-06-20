document.addEventListener('DOMContentLoaded', function() {
    // Dynamically set the current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor link behavior

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Add a simple scroll-to-top button functionality later if desired
    // Example:
    // const backToTopButton = document.getElementById('back-to-top');
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 300) {
    //         backToTopButton.style.display = 'block';
    //     } else {
    //         backToTopButton.style.display = 'none';
    //     }
    // });
    // backToTopButton.addEventListener('click', () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // });
});