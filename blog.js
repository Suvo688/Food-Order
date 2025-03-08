document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data
    const blogs = [
        {
            id: 1,
            title: 'Fresh and Organic: Farm to Table Guide',
            excerpt: 'Discover the journey of organic produce from local farms to your table...',
            image: 'image/blog-1.jpg',
            category: 'tips',
            date: 'May 1, 2024',
            author: 'Admin'
        },
        // Add more blog posts
    ];

    let currentPage = 1;
    const postsPerPage = 6;
    let currentCategory = 'all';

    // Initialize blog page
    function initBlogPage() {
        loadBlogPosts();
        setupCategoryFilters();
        setupSearch();
        setupPagination();
    }

    // Load blog posts
    function loadBlogPosts(category = 'all', searchTerm = '') {
        let filteredPosts = blogs;

        // Apply category filter
        if (category !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.category === category);
        }

        // Apply search filter
        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Calculate pagination
        const start = (currentPage - 1) * postsPerPage;
        const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);

        // Render posts
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = paginatedPosts.map(post => `
            <div class="blog-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="content">
                    <div class="icons">
                        <a href="#"> <i class="fas fa-user"></i> by ${post.author} </a>
                        <a href="#"> <i class="fas fa-calendar"></i> ${post.date} </a>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="blog-${post.id}.html" class="btn">read more</a>
                </div>
            </div>
        `).join('');

        updatePagination(filteredPosts.length);
    }

    // Setup category filters
    function setupCategoryFilters() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentCategory = button.dataset.category;
                currentPage = 1;
                loadBlogPosts(currentCategory);
            });
        });
    }

    // Setup search functionality
    function setupSearch() {
        const searchInput = document.getElementById('blog-search');
        let searchTimeout;

        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1;
                loadBlogPosts(currentCategory, searchInput.value);
            }, 300);
        });
    }

    // Setup pagination
    function setupPagination() {
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadBlogPosts(currentCategory);
            }
        });

        nextButton.addEventListener('click', () => {
            const totalPages = Math.ceil(blogs.length / postsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadBlogPosts(currentCategory);
            }
        });
    }

    // Update pagination display
    function updatePagination(totalPosts) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        const pageNumbers = document.querySelector('.page-numbers');
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        pageNumbers.innerHTML = `Page ${currentPage} of ${totalPages}`;
    }

    // Initialize the blog page
    initBlogPage();
}); 