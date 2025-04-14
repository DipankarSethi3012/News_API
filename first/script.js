const apikey = '';

const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
async function fetchRandomNews() {
    try{

        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data= await response.json();
    
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return[];
    }
}

function displayBlogs(articles)  {
    blogContainer.innerHTML="";
    articles.forEach(article => {   
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-card');

        const title = document.createElement('h2');
        title.textContent = article.title;
        blogPost.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        blogPost.appendChild(description);

        const image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = 'Blog Image';
        blogPost.appendChild(image);

        
      
        blogPost.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
        blogContainer.appendChild(blogPost);
    } )      
}
(async () => {
    try{

        const articles = await fetchRandomNews();
        console.log(articles);
        displayBlogs(articles);
    } catch(error) {
        console.error('Error:', error);
    }
})();

searchButton.addEventListener('click', async () => {
    const query = searchField.value.trim();
    if (query) {
        try {
            const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayBlogs(data.articles);
        } catch (error) {
            console.error('Error fetching news by query:', error);
        }
    } else {
        alert('Please enter a search term.');
    }
});
