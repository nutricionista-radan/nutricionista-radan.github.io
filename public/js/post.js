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

async function loadPost() {
  const postId = document.querySelector('meta[name="post-id"]').getAttribute("content");

  try {
    const response = await fetch('/json/all-posts.json');
    if (!response.ok) throw new Error('Failed to load posts JSON.');

    const posts = await response.json();
    const post = posts.find(p => p.id === postId);

    if (!post) {
      document.getElementById("post-title").textContent = "Post nije pronađen";
      return;
    }

    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-description").textContent = post.description;
    document.getElementById("post-banner").src = post.banner;
    document.getElementById("post-content").innerHTML = post.content;

    if (post.photoBy) {
      const bannerImage = document.getElementById("post-banner");
      const credit = document.createElement("p");
      credit.className = "photo-credit";
      credit.innerHTML = post.photoBy;
      bannerImage.parentNode.insertBefore(credit, bannerImage.nextSibling);
    }

    const tagsList = document.getElementById("post-tags");
    post.tags?.forEach(tag => {
      if (tag && tag.trim()) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = tag;
        li.appendChild(span);
        tagsList.appendChild(li);
      }
    });

  } catch (err) {
    console.error("Error loading post:", err);
    document.getElementById("post-title").textContent = "Greška pri učitavanju posta.";
  }
}

window.addEventListener("DOMContentLoaded", loadPost);
