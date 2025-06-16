import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Card from '../components/Card';

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // Move search state here

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (!data) return;

      setFoodItem(data.food_items);
      setFoodCat(data.foodCategory);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Use searchQuery here to filter food items by category and search
  const filteredItemsByCategory = (categoryName) => {
    return foodItem.filter(item =>
      item.CategoryName === categoryName &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="gh-home-bg">
      <main style={{ minHeight: '80vh', padding: '2rem 0 0 0' }}>
        {/* Pass search state and setter down to Carousel */}
        <Carousel searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="gh-category-list">
          {foodCat.length > 0 ? (
            foodCat.map((category, index) => {
              const itemsForCategory = filteredItemsByCategory(category.CategoryName);

              return (
                <section key={index} className="gh-category-section">
                  <h3 className="gh-category-title">{category.CategoryName}</h3>
                  <div className="row gh-card-row">
                    {itemsForCategory.length > 0 ? (
                      itemsForCategory.map((item, idx) => (
                        <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                          <Card foodItem={item} />
                        </div>
                      ))
                    ) : (
                      <p className="gh-category-empty">No items found in this category.</p>
                    )}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="gh-category-empty">No Categories Found</div>
          )}
        </div>

        <div className="gh-home-cta">
          Explore the finest collection of food items, crafted with authentic ingredients and delightful flavors.
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;