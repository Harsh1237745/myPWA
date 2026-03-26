// This has all the product data to display in the shop now section
const PRODUCT_DATA = [
    { ProductID: 1, ProductName: 'Techify Pro', Price: 999.00, CategoryName: 'Smartphone', Description: 'High-end phone with a great camera and pro features.', StockLevel: 50, ImagePath: 'Images/product1.jpg' },
    { ProductID: 2, ProductName: 'Techify X-Series', Price: 499.99, CategoryName: 'Smartphone', Description: 'Long battery life and a beautiful, bright display.', StockLevel: 80, ImagePath: 'Images/product2.jpeg' },
    { ProductID: 3, ProductName: 'Techify Z-Mini', Price: 299.00, CategoryName: 'Smartphone', Description: 'Small phone, easy to use with one hand, and works well.', StockLevel: 110, ImagePath: 'Images/product3.jpeg' },
    { ProductID: 4, ProductName: 'Techify Watch', Price: 349.99, CategoryName: 'Smartwatch', Description: 'Tracks fitness well, has long battery life, and looks sleek.', StockLevel: 71, ImagePath: 'Images/product4.jpeg' },
    { ProductID: 5, ProductName: 'Techify Pulse', Price: 129.00, CategoryName: 'Wireless Earbuds', Description: 'Clear sound, blocks outside noise (ANC), and fits comfortably.', StockLevel: 110, ImagePath: 'Images/product5.jpeg' },
    { ProductID: 6, ProductName: 'Techify Max 14', Price: 1299.99, CategoryName: 'Smartphone', Description: 'Lots of storage (1TB), cinema video mode, and super smooth screen.', StockLevel: 20, ImagePath: 'Images/product6.jpeg' },
    { ProductID: 7, ProductName: 'Techify Sporty', Price: 199.00, CategoryName: 'Smartwatch', Description: 'Waterproof and tough, with special modes for running and swimming.', StockLevel: 120, ImagePath: 'Images/product7.jpeg' },
    { ProductID: 8, ProductName: 'Techify Air-1 Buds', Price: 89.99, CategoryName: 'Wireless Earbuds', Description: 'Very light earbuds with 20 hours of total charge time.', StockLevel: 150, ImagePath: 'Images/product8.jpeg' },
    { ProductID: 9, ProductName: 'Techify Flip1', Price: 799.00, CategoryName: 'Smartphone', Description: 'Screen folds to make the phone compact, but with a big display.', StockLevel: 20, ImagePath: 'Images/product9.jpg' },
    { ProductID: 10, ProductName: 'Techify Goplus Watch', Price: 99.99, CategoryName: 'Smartwatch', Description: 'Shows important alerts and tracks basic daily activity.', StockLevel: 210, ImagePath: 'Images/product10.jpeg' },
    { ProductID: 11, ProductName: 'Techify Pro Max Buds', Price: 179.99, CategoryName: 'Wireless Earbuds', Description: 'Great bass and 3D sound for an amazing music experience.', StockLevel: 10, ImagePath: 'Images/product11.jpeg' },
    { ProductID: 12, ProductName: 'Techify Mini 20', Price: 899.99, CategoryName: 'Smartphone', Description: 'Comes with a stylus for easy drawing and note-taking.', StockLevel: 15, ImagePath: 'Images/product12.jpeg' },
    { ProductID: 13, ProductName: 'Techify Ultra Pro Watch', Price: 499.99, CategoryName: 'Smartwatch', Description: 'Tough watch for outdoors with GPS and emergency satellite link.', StockLevel: 40, ImagePath: 'Images/product13.jpeg' },
    { ProductID: 14, ProductName: 'Techify Max Buds', Price: 149.99, CategoryName: 'Wireless Earbuds', Description: 'Excellent noise canceling to help you focus completely.', StockLevel: 120, ImagePath: 'Images/product14.png' },
    { ProductID: 15, ProductName: 'Techify Splite', Price: 399.99, CategoryName: 'Smartphone', Description: 'Lighter phone that charges fast and has a strong glass back.', StockLevel: 21, ImagePath: 'Images/product15.jpeg' },
    { ProductID: 16, ProductName: 'Techify Pro Watch', Price: 249.99, CategoryName: 'Smartwatch', Description: 'Looks like a classic watch, but with smart features hidden inside.', StockLevel: 30, ImagePath: 'Images/product16.jpeg' },
    { ProductID: 17, ProductName: 'Techify Max Buds', Price: 59.99, CategoryName: 'Wireless Earbuds', Description: 'Simple, good value earbuds for music and calls.', StockLevel: 100, ImagePath: 'Images/product17.jpeg' },
    { ProductID: 18, ProductName: 'Techify Max Mini', Price: 1499.99, CategoryName: 'Smartphone', Description: 'Our most powerful phone with 1TB storage and best-in-class display.', StockLevel: 20, ImagePath: 'Images/product18.jpeg' },
    { ProductID: 19, ProductName: 'Techify Kids Watch', Price: 79.99, CategoryName: 'Smartwatch', Description: 'Safe watch for children with calling and location tracking.', StockLevel: 120, ImagePath: 'Images/product19.jpeg' },
    { ProductID: 20, ProductName: 'Techify Duo Buds', Price: 109.00, CategoryName: 'Wireless Earbuds', Description: 'Two speaker drivers for deep, rich sound, perfect for music.', StockLevel: 210, ImagePath: 'Images/product20.jpeg' },
];


// It runs the application once the page is loaded in shop
document.addEventListener('DOMContentLoaded', () => {
    // It selects the product and control all the buttons in shop 
    const productsContainer = document.getElementById('product-list'); 
    
    // It handles and function the search input and the button
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // It maintains the queries for sort and filter section when the user presses the buttons
    const sortButtons = document.querySelectorAll('.sort');
    const filterButtons = document.querySelectorAll('.filter');

    // This section sets the products as default for sort and sets the filter as all for the starting in the shop
    let allProducts = PRODUCT_DATA; 
    let currentSort = 'default';
    let currentFilter = 'all';

    // This helps to run the function properly in regards to the category
    const normalizeCategory = (name) => name.toLowerCase().replace(/\s/g, '-');
    
    // It handles the search section which triggers the filter and sort section in the front-end
    const handleSearch = () => {
        applyFiltersAndSorts();
    };
    
    // This section handles the function of the search bar in the front-end for clicking it
    searchButton.addEventListener('click', handleSearch);
    // This handles the function to allow type the words to what product user is looking for 
    searchInput.addEventListener('keyup', (event) => {
        // This allows the user to enter the product he is researching for
        if (event.key === 'Enter') {
            handleSearch();
        }
    });


    // This code renders the products according to the conditions for filter and sort and displays it
    function renderProducts(productsToRender) {
        // It displays a message in the output if there is no products found according to the query
        if (!productsToRender || productsToRender.length === 0) {
            productsContainer.innerHTML = '<p>No products are available.</p>';
            return;
        }
        
        //It displays the product, category, name, price, description and button for the stock.
        const productHTML = productsToRender.map(product => {
            //It returns the code to display it in the front-end
            return `
                <div class="product-card" 
                    data-category="${normalizeCategory(product.CategoryName)}" 
                    data-price="${product.Price}" 
                    data-stock="${product.StockLevel}" 
                    data-name="${product.ProductName}">
                    <div class="product-card-image-wrapper">
                        <img src="${product.ImagePath}" alt="${product.ProductName}" class="product-image">
                    </div>
                    <h3 class="product-name">${product.ProductName}</h3>
                    <p class="product-category">${product.CategoryName}</p>
                    <p class="product-price">$${product.Price.toFixed(2)}</p>
                    <p class="product-description">${product.Description.substring(0, 70)}</p>
                    <button class="stock-btn" data-product-id="${product.ProductID}">Stock Left</button>
                </div>
            `;
        }).join('');

        //It generates the html into the container 
        productsContainer.innerHTML = productHTML;
        
        // Once the user clicks the button, it renders the amount of stock left
        document.querySelectorAll('.stock-btn').forEach(button => {
            button.addEventListener('click', showStockAlert);
        });
    }


    // This function of the button displays the stock once the stock button is clicked
    function showStockAlert(event) {
        const button = event.currentTarget;
        const card = button.closest('.product-card');
        const productName = card.dataset.name;
        const stockLevel = card.dataset.stock;
        
        // It displays on the screen with the product name and the amount of stock left
        let alertDiv = document.createElement('div');
        alertDiv.className = 'stock-alert';
        alertDiv.textContent = `${productName}: ${stockLevel} products are available!`;
        document.body.appendChild(alertDiv);
        
        // Show the alert for the stock on the screen
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10); 

        // Hide and remove the alert after a short time(timer)
        setTimeout(() => {
            alertDiv.classList.remove('show'); // Triggers CSS fade-out
            setTimeout(() => {
                alertDiv.remove(); //removes the element for the page
            }, 300); // Wait for the transition to finish, which is like 0.3 seconds
        }, 2000); // alert visible for 2 seconds
    }


    // It filters and sort the porducts based on the critieria once the user press the button on thr sidebar
    function applyFiltersAndSorts() {
        let displayProducts = [...allProducts]; //Starts with displaying all the products first

        // NEW: Apply search filter if a term is entered
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            displayProducts = displayProducts.filter(product => 
                // Checks if the search term is found in the product name OR the description
                product.ProductName.toLowerCase().includes(searchTerm) ||
                product.Description.toLowerCase().includes(searchTerm)
            );
        }

        // Filter section category
        // Checkds if the filter is set to anything else then all devices
        if (currentFilter !== 'all') {
            // Uses the .filter() technique to create a new array 
            // It contains only products whose normalised category name matches with the current filter applied
            displayProducts = displayProducts.filter(product => 
                normalizeCategory(product.CategoryName) === currentFilter
            );
        }

        // Sorting section category
        // Sorts the products according to the critieria given
        // Checkds if the sort is high to low
        if (currentSort === 'high-to-low') {
            displayProducts.sort((a, b) => b.Price - a.Price);
            //Sort the products with high to low according to the products displayed

        // Checks if the sort is low to high
        } else if (currentSort === 'low-to-high') {
            // Sort the products according to the criteria
            displayProducts.sort((a, b) => a.Price - b.Price);
        } 
        // If the products is set in default, then it displays all the products
        renderProducts(displayProducts);
    }


    // This section handles the button active mode and the user input
    // Handles the sort button for the user
    sortButtons.forEach(button => {
        // Checkds if the person clicked the sort button 
        button.addEventListener('click', () => {
            // Once the button is clicked it removes the color from the active and adds a color to the current clicked section
            sortButtons.forEach(btn => btn.classList.remove('active'));
            //Adds the color to the active section the user added on 
            button.classList.add('active');
            
            // Updates the sorted category for example high to low
            currentSort = button.dataset.sort;
            // Runs the main logic to apply and display the new sort and refresh the display
            applyFiltersAndSorts();
        });
    });

    // Handles the filter button for the user
    filterButtons.forEach(button => {
            // Checks if the person clicked the filter button 
        button.addEventListener('click', () => {
            // Once the button is clicked it removes the color from the active and adds a color to the current clicked section
            filterButtons.forEach(btn => btn.classList.remove('active'));
            //Adds the color to the active section the user added on 
            button.classList.add('active');

            // Updates the filtered category for example smartwatch
            currentFilter = button.dataset.filter;
            // Runs the main logic to apply and display the new filter and refresh the display
            applyFiltersAndSorts();
        });
    });

    // Runs the filter and sorting when the page load to show default view
    applyFiltersAndSorts();
});