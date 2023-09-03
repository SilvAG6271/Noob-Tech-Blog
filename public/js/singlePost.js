const postLinks = document.querySelectorAll('.post-link');
postLinks.forEach(link => {
    link.addEventListener('click', function() {
        const postId = this.getAttribute('data-note');
        window.location.href = '' + encodeURIComponent(postId);
    });
});