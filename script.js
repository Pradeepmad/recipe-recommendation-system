const app = document.getElementById('app');
const mainContent = document.getElementById('main-content');

// State
let currentUser = null;
let recipes = [];
let filteredRecipes = [];

// Templates
const templates = {
  header: `
    <header>
      <div class="header-container container">
        <div class="logo">
          <div class="logo-icon">N</div>
          <div class="logo-text">NutriChef</div>
        </div>
        
        <nav class="nav-links">
          <a href="#" class="nav-link" data-page="home">Home</a>
          <a href="#" class="nav-link" data-page="recipes">Recipes</a>
          <a href="#" class="nav-link" data-page="profile">Profile</a>
        </nav>
        
        <div class="auth-section">
          ${currentUser ? `
            <div class="user-avatar" id="user-avatar">${currentUser.name.charAt(0)}</div>
            <div class="dropdown-menu" id="dropdown-menu">
              <div class="dropdown-item" data-page="profile">
                <i data-lucide="user"></i> Profile
              </div>
              <div class="dropdown-item" id="logout-btn">
                <i data-lucide="log-out"></i> Logout
              </div>
            </div>
          ` : `
            <button class="btn btn-outline" id="login-btn">Login</button>
            <button class="btn btn-primary" id="signup-btn">Sign Up</button>
          `}
        </div>
      </div>
    </header>
  `,
  
  home: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div>
            <h1 class="hero-title">Intelligent <span>Recipe Recommendations</span></h1>
            <p class="hero-description">
              NutriChef uses AI to recommend personalized recipes based on your dietary needs, 
              preferences, and nutritional goals. Eat smarter, not harder.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-page="recipes">Browse Recipes</button>
              <button class="btn btn-outline" id="learn-more-btn">Learn More</button>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Healthy food">
          </div>
        </div>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <div class="features-header">
          <h2 class="features-title">Why Choose NutriChef?</h2>
          <p class="features-description">
            Our platform combines nutrition science with AI to deliver the best recipe 
            recommendations tailored just for you.
          </p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="heart-pulse"></i>
            </div>
            <h3 class="feature-title">Health Focused</h3>
            <p class="feature-description">
              Recipes optimized for your health goals, whether it's weight loss, muscle gain, or managing conditions.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="brain"></i>
            </div>
            <h3 class="feature-title">AI-Powered</h3>
            <p class="feature-description">
              Our algorithm learns your preferences and suggests recipes you'll love based on your history.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="shopping-bag"></i>
            </div>
            <h3 class="feature-title">Grocery Lists</h3>
            <p class="feature-description">
              Automatically generate shopping lists for your selected recipes to save time.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="shield-check"></i>
            </div>
            <h3 class="feature-title">Dietary Restrictions</h3>
            <p class="feature-description">
              Filter recipes by dietary needs like gluten-free, vegan, keto, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="intelligent-features">
      <div class="container">
        <div class="intelligent-features-header">
          <h2 class="intelligent-features-title">Intelligent Features</h2>
          <p class="intelligent-features-description">
            NutriChef goes beyond basic recipe recommendations with these smart features.
          </p>
        </div>
        
        <div class="feature-columns">
          <div class="feature-column">
            <div class="feature-item">
              <h3>Nutritional Balancing</h3>
              <p>
                Our system ensures you get a balanced mix of macronutrients throughout the week, 
                preventing nutritional deficiencies.
              </p>
              <ul>
                <li>Automatic protein distribution</li>
                <li>Healthy fat optimization</li>
                <li>Complex carb timing</li>
              </ul>
            </div>
            
            <div class="feature-item">
              <h3>Seasonal Recommendations</h3>
              <p>
                Get recipes based on what's in season in your area for maximum freshness, 
                flavor, and nutritional value.
              </p>
              <ul>
                <li>Local produce suggestions</li>
                <li>Seasonal flavor combinations</li>
                <li>Cost-effective ingredients</li>
              </ul>
            </div>
          </div>
          
          <div class="feature-column">
            <div class="feature-item">
              <h3>Meal Prep Optimization</h3>
              <p>
                Receive meal plans that share ingredients across multiple recipes to 
                minimize waste and prep time.
              </p>
              <ul>
                <li>Batch cooking suggestions</li>
                <li>Ingredient reuse strategies</li>
                <li>Storage tips</li>
              </ul>
            </div>
            
            <div class="feature-item">
              <h3>Flavor Profiling</h3>
              <p>
                Our system learns your taste preferences and suggests recipes with 
                flavors you're likely to enjoy.
              </p>
              <ul>
                <li>Spice level adjustment</li>
                <li>Cuisine preferences</li>
                <li>Texture combinations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="how-it-works">
      <div class="container">
        <div class="how-it-works-header">
          <h2 class="how-it-works-title">How It Works</h2>
        </div>
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3 class="step-title">Set Preferences</h3>
            <p class="step-description">Tell us about your dietary needs and goals</p>
            <ul class="step-features">
              <li>Dietary restrictions</li>
              <li>Health goals</li>
              <li>Allergies</li>
            </ul>
            <div class="step-connector"></div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h3 class="step-title">Discover Recipes</h3>
            <p class="step-description">Browse personalized recommendations</p>
            <ul class="step-features">
              <li>AI-curated selections</li>
              <li>Nutrition info</li>
              <li>User ratings</li>
            </ul>
            <div class="step-connector"></div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h3 class="step-title">Plan Meals</h3>
            <p class="step-description">Create your weekly meal plan</p>
            <ul class="step-features">
              <li>Drag-and-drop interface</li>
              <li>Nutritional balance</li>
              <li>Variety control</li>
            </ul>
            <div class="step-connector"></div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <h3 class="step-title">Generate List</h3>
            <p class="step-description">Get your optimized grocery list</p>
            <ul class="step-features">
              <li>Organized by category</li>
              <li>Quantity calculations</li>
              <li>Store mapping</li>
            </ul>
            <div class="step-connector"></div>
          </div>
          
          <div class="step">
            <div class="step-number">5</div>
            <h3 class="step-title">Cook & Enjoy</h3>
            <p class="step-description">Prepare delicious, healthy meals</p>
            <ul class="step-features">
              <li>Step-by-step instructions</li>
              <li>Timing guidance</li>
              <li>Tips & tricks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
    <footer>
      <div class="container">
        <div class="footer-container">
          <div>
            <div class="footer-logo">
              <div class="footer-logo-icon">N</div>
              <div class="footer-logo-text">NutriChef</div>
            </div>
            <p class="footer-description">
              Intelligent recipe recommendations powered by AI and nutrition science.
            </p>
          </div>
          
          <div class="footer-links">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#" data-page="home">Home</a></li>
              <li><a href="#" data-page="recipes">Recipes</a></li>
              <li><a href="#" data-page="profile">Profile</a></li>
            </ul>
          </div>
          
          <div class="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} NutriChef. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  
  recipes: `
    <section class="recipe-search">
      <div class="container">
        <div class="recipe-header">
          <div>
            <h1 class="recipe-title">Recipe Recommendations</h1>
            <p class="recipe-subtitle">Personalized based on your profile and preferences</p>
          </div>
          <button class="btn btn-primary" id="filter-btn">
            <i data-lucide="filter"></i> Filters
          </button>
        </div>
        
        <div class="search-container">
          <div class="search-input-container">
            <i data-lucide="search"></i>
            <input type="text" class="form-input search-input" id="search-input" placeholder="Search recipes...">
          </div>
          <div class="select-container">
            <select class="select" id="category-select">
              <option value="">All Categories</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>
        
        <div class="recipes-grid" id="recipes-grid">
          ${recipes.length > 0 ? recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
              <div class="recipe-card-header">
                <div class="recipe-card-title">
                  <h3 class="recipe-card-name">${recipe.name}</h3>
                  <span class="recipe-card-badge">${recipe.category}</span>
                </div>
                <div class="recipe-card-meta">
                  <div class="recipe-card-meta-item">
                    <i data-lucide="clock"></i> ${recipe.time} min
                  </div>
                  <div class="recipe-card-meta-item">
                    <i data-lucide="flame"></i> ${recipe.calories} cal
                  </div>
                </div>
              </div>
              
              <div class="recipe-card-content">
                <div class="recipe-nutrition">
                  <div class="nutrition-item nutrition-protein">
                    Protein: <span>${recipe.protein}g</span>
                  </div>
                  <div class="nutrition-item nutrition-calories">
                    Carbs: <span>${recipe.carbs}g</span>
                  </div>
                </div>
                
                <div class="recipe-ingredients">
                  <h4>Key Ingredients</h4>
                  <div class="ingredients-list">
                    ${recipe.ingredients.slice(0, 5).map(ingredient => `
                      <span class="ingredient-badge">${ingredient}</span>
                    `).join('')}
                    ${recipe.ingredients.length > 5 ? `<span class="ingredient-badge">+${recipe.ingredients.length - 5} more</span>` : ''}
                  </div>
                </div>
                
                <button class="btn btn-outline recipe-view-btn">
                  <i data-lucide="book-open"></i> View Recipe
                </button>
              </div>
            </div>
          `).join('') : `
            <div class="no-recipes">
              <h3>No recipes found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          `}
        </div>
      </div>
    </section>
  `,
  
  profile: `
    <section class="recipe-search">
      <div class="container">
        <div class="recipe-header">
          <div>
            <h1 class="recipe-title">My Profile</h1>
            <p class="recipe-subtitle">Manage your account and preferences</p>
          </div>
          <button class="btn btn-primary" id="edit-profile-btn">
            <i data-lucide="edit"></i> Edit Profile
          </button>
        </div>
        
        <div class="profile-grid">
          <div>
            <div class="protein-card">
              <h3>Daily Protein Target</h3>
              <div class="protein-amount">${currentUser ? currentUser.proteinTarget : '--'}g</div>
              <p class="protein-description">Based on your activity level and goals</p>
              <p class="protein-formula">0.8-1.2g per pound of body weight</p>
            </div>
            
            <div class="feature-item" style="margin-top: 1.5rem;">
              <h3>Dietary Preferences</h3>
              <ul>
                ${currentUser && currentUser.dietaryPreferences ? currentUser.dietaryPreferences.map(pref => `
                  <li>${pref}</li>
                `).join('') : '<li>No preferences set</li>'}
              </ul>
            </div>
          </div>
          
          <div>
            <div class="feature-item">
              <h3>Health Goals</h3>
              <ul>
                ${currentUser && currentUser.healthGoals ? currentUser.healthGoals.map(goal => `
                  <li>${goal}</li>
                `).join('') : '<li>No goals set</li>'}
              </ul>
            </div>
            
            <div class="feature-item" style="margin-top: 1.5rem;">
              <h3>Allergies & Restrictions</h3>
              <ul>
                ${currentUser && currentUser.allergies ? currentUser.allergies.length > 0 ? currentUser.allergies.map(allergy => `
                  <li>${allergy}</li>
                `).join('') : '<li>None specified</li>' : '<li>Not set</li>'}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  
  loginModal: `
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Welcome Back</h2>
        <p class="modal-description">Log in to your NutriChef account</p>
      </div>
      
      <div class="tabs">
        <div class="tabs-list">
          <div class="tabs-trigger active" data-tab="login">Login</div>
          <div class="tabs-trigger" data-tab="signup">Sign Up</div>
        </div>
        
        <div class="tabs-content active" data-tab="login">
          <form id="login-form">
            <div class="form-group">
              <label for="login-email" class="form-label">Email</label>
              <input type="email" id="login-email" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label for="login-password" class="form-label">Password</label>
              <input type="password" id="login-password" class="form-input" required>
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" id="close-login-btn">Cancel</button>
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
        
        <div class="tabs-content" data-tab="signup">
          <form id="signup-form">
            <div class="form-group">
              <label for="signup-name" class="form-label">Name</label>
              <input type="text" id="signup-name" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label for="signup-email" class="form-label">Email</label>
              <input type="email" id="signup-email" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label for="signup-password" class="form-label">Password</label>
              <input type="password" id="signup-password" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label for="signup-confirm-password" class="form-label">Confirm Password</label>
              <input type="password" id="signup-confirm-password" class="form-input" required>
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" id="close-signup-btn">Cancel</button>
              <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  
  editProfileModal: `
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Edit Profile</h2>
        <p class="modal-description">Update your personal information and preferences</p>
      </div>
      
      <form id="profile-form">
        <div class="form-group">
          <label for="profile-name" class="form-label">Name</label>
          <input type="text" id="profile-name" class="form-input" value="${currentUser ? currentUser.name : ''}" required>
        </div>
        
        <div class="form-group">
          <label for="profile-email" class="form-label">Email</label>
          <input type="email" id="profile-email" class="form-input" value="${currentUser ? currentUser.email : ''}" required>
        </div>
        
        <div class="form-group">
          <label for="profile-protein" class="form-label">Daily Protein Target (g)</label>
          <input type="number" id="profile-protein" class="form-input" value="${currentUser ? currentUser.proteinTarget : '120'}" min="50" max="300" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Dietary Preferences</label>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="dietary-pref" value="vegetarian" ${currentUser && currentUser.dietaryPreferences.includes('vegetarian') ? 'checked' : ''}>
              Vegetarian
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="dietary-pref" value="vegan" ${currentUser && currentUser.dietaryPreferences.includes('vegan') ? 'checked' : ''}>
              Vegan
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="dietary-pref" value="gluten-free" ${currentUser && currentUser.dietaryPreferences.includes('gluten-free') ? 'checked' : ''}>
              Gluten-Free
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="dietary-pref" value="dairy-free" ${currentUser && currentUser.dietaryPreferences.includes('dairy-free') ? 'checked' : ''}>
              Dairy-Free
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="dietary-pref" value="keto" ${currentUser && currentUser.dietaryPreferences.includes('keto') ? 'checked' : ''}>
              Keto
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Health Goals</label>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="health-goal" value="weight-loss" ${currentUser && currentUser.healthGoals.includes('weight-loss') ? 'checked' : ''}>
              Weight Loss
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="health-goal" value="muscle-gain" ${currentUser && currentUser.healthGoals.includes('muscle-gain') ? 'checked' : ''}>
              Muscle Gain
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="health-goal" value="heart-health" ${currentUser && currentUser.healthGoals.includes('heart-health') ? 'checked' : ''}>
              Heart Health
            </label>
            <label style="display: flex; align-items: center; gap: 0.25rem;">
              <input type="checkbox" name="health-goal" value="energy" ${currentUser && currentUser.healthGoals.includes('energy') ? 'checked' : ''}>
              More Energy
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="profile-allergies" class="form-label">Allergies (comma separated)</label>
          <input type="text" id="profile-allergies" class="form-input" value="${currentUser ? currentUser.allergies.join(', ') : ''}">
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn btn-outline" id="cancel-profile-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  `,
  
  recipeModal: `
    <div class="modal-content profile-modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="recipe-modal-title">Recipe Name</h2>
        <p class="modal-description" id="recipe-modal-description">Category • Time min • Calories cal</p>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <img id="recipe-modal-image" src="" alt="Recipe" style="width: 100%; height: 16rem; object-fit: cover; border-radius: var(--radius);">
      </div>
      
      <div class="profile-grid">
        <div>
          <div class="feature-item">
            <h3>Ingredients</h3>
            <ul id="recipe-modal-ingredients"></ul>
          </div>
        </div>
        
        <div>
          <div class="feature-item">
            <h3>Nutrition Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
              <div class="nutrition-item nutrition-protein">
                Protein: <span id="recipe-modal-protein">0</span>g
              </div>
              <div class="nutrition-item nutrition-calories">
                Carbs: <span id="recipe-modal-carbs">0</span>g
              </div>
              <div class="nutrition-item" style="background-color: hsla(45, 95%, 85%, 0.2);">
                Fat: <span id="recipe-modal-fat">0</span>g
              </div>
              <div class="nutrition-item" style="background-color: var(--muted);">
                Fiber: <span id="recipe-modal-fiber">0</span>g
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="feature-item" style="margin-top: 1.5rem;">
        <h3>Instructions</h3>
        <ol id="recipe-modal-instructions" style="padding-left: 1.5rem;"></ol>
      </div>
      
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" id="close-recipe-btn">Close</button>
        <button type="button" class="btn btn-primary" id="save-recipe-btn">
          <i data-lucide="bookmark"></i> Save Recipe
        </button>
      </div>
    </div>
  `
};

// Mock Data
function generateMockRecipes() {
  const mockRecipes = [
    {
      id: 1,
      name: "Quinoa Power Bowl",
      category: "lunch",
      time: 25,
      calories: 420,
      protein: 22,
      carbs: 45,
      fat: 12,
      fiber: 8,
      ingredients: ["quinoa", "chickpeas", "avocado", "kale", "cherry tomatoes", "lemon", "olive oil", "feta cheese"],
      instructions: [
        "Cook quinoa according to package instructions",
        "Massage kale with olive oil and lemon juice",
        "Combine all ingredients in a bowl",
        "Top with crumbled feta cheese"
      ],
      image: "https://images.unsplash.com/photo-1546069901-4565ae152c13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Protein Pancakes",
      category: "breakfast",
      time: 15,
      calories: 350,
      protein: 28,
      carbs: 32,
      fat: 8,
      fiber: 5,
      ingredients: ["oat flour", "protein powder", "banana", "eggs", "almond milk", "baking powder"],
      instructions: [
        "Mix all ingredients in a blender",
        "Heat a non-stick pan over medium heat",
        "Pour batter to form pancakes",
        "Flip when bubbles form on top",
        "Serve with fresh fruit"
      ],
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Salmon & Veggies",
      category: "dinner",
      time: 30,
      calories: 480,
      protein: 36,
      carbs: 22,
      fat: 28,
      fiber: 6,
      ingredients: ["salmon fillet", "asparagus", "sweet potato", "olive oil", "lemon", "garlic", "dill"],
      instructions: [
        "Preheat oven to 400°F",
        "Toss sweet potatoes with oil and roast for 15 minutes",
        "Add asparagus and salmon to the pan",
        "Season with garlic, lemon, and dill",
        "Roast for another 12-15 minutes"
      ],
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Greek Yogurt Parfait",
      category: "snack",
      time: 5,
      calories: 220,
      protein: 18,
      carbs: 24,
      fat: 5,
      fiber: 3,
      ingredients: ["greek yogurt", "mixed berries", "granola", "honey", "chia seeds"],
      instructions: [
        "Layer yogurt, berries, and granola in a glass",
        "Drizzle with honey",
        "Sprinkle chia seeds on top"
      ],
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Veggie Stir Fry",
      category: "dinner",
      time: 20,
      calories: 320,
      protein: 16,
      carbs: 38,
      fat: 14,
      fiber: 7,
      ingredients: ["tofu", "broccoli", "bell peppers", "carrots", "soy sauce", "sesame oil", "ginger", "garlic"],
      instructions: [
        "Press and cube tofu",
        "Stir-fry vegetables in sesame oil",
        "Add tofu and sauce ingredients",
        "Cook until sauce thickens"
      ],
      image: "https://images.unsplash.com/photo-1625938144745-fdcf219a1e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Chocolate Protein Smoothie",
      category: "snack",
      time: 5,
      calories: 280,
      protein: 25,
      carbs: 28,
      fat: 8,
      fiber: 6,
      ingredients: ["almond milk", "protein powder", "banana", "spinach", "cocoa powder", "peanut butter"],
      instructions: [
        "Combine all ingredients in a blender",
        "Blend until smooth",
        "Add ice if desired"
      ],
      image: "https://images.unsplash.com/photo-1536244881128-91b3b0cea9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  return mockRecipes;
}

// Initialize App
function initApp() {
  // Load mock data
  recipes = generateMockRecipes();
  filteredRecipes = [...recipes];
  
  // Check for logged in user in localStorage
  const storedUser = localStorage.getItem('nutriChefUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
  
  // Render initial page
  renderHeader();
  renderPage('home');
  
  // Initialize icons
  lucide.createIcons();
  
  // Set up event listeners
  setupEventListeners();
}

// Render Functions
function renderHeader() {
  const headerHTML = templates.header;
  app.insertAdjacentHTML('afterbegin', headerHTML);
}

function renderPage(page) {
  let pageHTML = '';
  
  switch(page) {
    case 'home':
      pageHTML = templates.home;
      break;
    case 'recipes':
      pageHTML = templates.recipes;
      break;
    case 'profile':
      if (!currentUser) {
        showLoginModal();
        return;
      }
      pageHTML = templates.profile;
      break;
    default:
      pageHTML = templates.home;
  }
  
  mainContent.innerHTML = pageHTML;
  
  // Reinitialize icons after rendering
  lucide.createIcons();
}

function showLoginModal() {
  const modalHTML = `
    <div class="modal show" id="login-modal">
      ${templates.loginModal}
    </div>
  `;
  
  app.insertAdjacentHTML('beforeend', modalHTML);
  
  // Set up modal event listeners
  document.getElementById('close-login-btn').addEventListener('click', closeModal);
  document.getElementById('close-signup-btn').addEventListener('click', closeModal);
  
  const tabTriggers = document.querySelectorAll('.tabs-trigger');
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const tab = trigger.dataset.tab;
      switchTab(tab);
    });
  });
  
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleSignup);
}

function showEditProfileModal() {
  const modalHTML = `
    <div class="modal show" id="edit-profile-modal">
      ${templates.editProfileModal}
    </div>
  `;
  
  app.insertAdjacentHTML('beforeend', modalHTML);
  
  // Set up modal event listeners
  document.getElementById('cancel-profile-btn').addEventListener('click', closeModal);
  document.getElementById('profile-form').addEventListener('submit', handleProfileUpdate);
}

function showRecipeModal(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  
  // Clone the template and update with actual recipe data
  let modalHTML = templates.recipeModal;
  modalHTML = modalHTML.replace('Recipe Name', recipe.name);
  modalHTML = modalHTML.replace('Category • Time min • Calories cal', 
    `${recipe.category} • ${recipe.time} min • ${recipe.calories} cal`);
  
  const fullModalHTML = `
    <div class="modal show" id="recipe-modal">
      ${modalHTML}
    </div>
  `;
  
  app.insertAdjacentHTML('beforeend', fullModalHTML);
  
  // Set the image
  document.getElementById('recipe-modal-image').src = recipe.image;
  
  // Set nutrition info
  document.getElementById('recipe-modal-protein').textContent = recipe.protein;
  document.getElementById('recipe-modal-carbs').textContent = recipe.carbs;
  document.getElementById('recipe-modal-fat').textContent = recipe.fat;
  document.getElementById('recipe-modal-fiber').textContent = recipe.fiber;
  
  // Set ingredients
  const ingredientsList = document.getElementById('recipe-modal-ingredients');
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });
  
  // Set instructions
  const instructionsList = document.getElementById('recipe-modal-instructions');
    recipe.instructions.forEach((step, index) => {
    const li = document.createElement('li');
    li.textContent = step;
    instructionsList.appendChild(li);
  });

  // Set up modal event listeners
  document.getElementById('close-recipe-btn').addEventListener('click', closeModal);
  document.getElementById('save-recipe-btn').addEventListener('click', () => saveRecipe(recipeId));
}

// Utility Functions
function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.remove());
}

function switchTab(tab) {
  // Update active tab trigger
  document.querySelectorAll('.tabs-trigger').forEach(trigger => {
    if (trigger.dataset.tab === tab) {
      trigger.classList.add('active');
    } else {
      trigger.classList.remove('active');
    }
  });

  // Update active tab content
  document.querySelectorAll('.tabs-content').forEach(content => {
    if (content.dataset.tab === tab) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

function filterRecipes() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-select').value;

  filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || 
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
    const matchesCategory = category === '' || recipe.category === category;
    
    return matchesSearch && matchesCategory;
  });

  renderRecipesGrid();
}

function renderRecipesGrid() {
  const recipesGrid = document.getElementById('recipes-grid');
  if (!recipesGrid) return;

  recipesGrid.innerHTML = filteredRecipes.length > 0 ? filteredRecipes.map(recipe => `
    <div class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-card-header">
        <div class="recipe-card-title">
          <h3 class="recipe-card-name">${recipe.name}</h3>
          <span class="recipe-card-badge">${recipe.category}</span>
        </div>
        <div class="recipe-card-meta">
          <div class="recipe-card-meta-item">
            <i data-lucide="clock"></i> ${recipe.time} min
          </div>
          <div class="recipe-card-meta-item">
            <i data-lucide="flame"></i> ${recipe.calories} cal
          </div>
        </div>
      </div>
      
      <div class="recipe-card-content">
        <div class="recipe-nutrition">
          <div class="nutrition-item nutrition-protein">
            Protein: <span>${recipe.protein}g</span>
          </div>
          <div class="nutrition-item nutrition-calories">
            Carbs: <span>${recipe.carbs}g</span>
          </div>
        </div>
        
        <div class="recipe-ingredients">
          <h4>Key Ingredients</h4>
          <div class="ingredients-list">
            ${recipe.ingredients.slice(0, 5).map(ingredient => `
              <span class="ingredient-badge">${ingredient}</span>
            `).join('')}
            ${recipe.ingredients.length > 5 ? `<span class="ingredient-badge">+${recipe.ingredients.length - 5} more</span>` : ''}
          </div>
        </div>
        
        <button class="btn btn-outline recipe-view-btn">
          <i data-lucide="book-open"></i> View Recipe
        </button>
      </div>
    </div>
  `).join('') : `
    <div class="no-recipes">
      <h3>No recipes found</h3>
      <p>Try adjusting your search filters</p>
    </div>
  `;

  // Reinitialize icons
  lucide.createIcons();

  // Add event listeners to recipe cards
  document.querySelectorAll('.recipe-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const recipeCard = e.target.closest('.recipe-card');
      const recipeId = parseInt(recipeCard.dataset.id);
      showRecipeModal(recipeId);
    });
  });
}

// Event Handlers
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Simple validation
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  // In a real app, this would be an API call
  currentUser = {
    id: 1,
    name: 'John Doe',
    email: email,
    proteinTarget: 150,
    dietaryPreferences: ['vegetarian', 'gluten-free'],
    healthGoals: ['muscle-gain', 'energy'],
    allergies: ['peanuts']
  };

  // Save to localStorage
  localStorage.setItem('nutriChefUser', JSON.stringify(currentUser));

  // Close modal and refresh UI
  closeModal();
  renderHeader();
  renderPage('home');
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  // Simple validation
  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // In a real app, this would be an API call
  currentUser = {
    id: 1,
    name: name,
    email: email,
    proteinTarget: 120,
    dietaryPreferences: [],
    healthGoals: [],
    allergies: []
  };

  // Save to localStorage
  localStorage.setItem('nutriChefUser', JSON.stringify(currentUser));

  // Close modal and refresh UI
  closeModal();
  renderHeader();
  renderPage('home');
}

function handleProfileUpdate(e) {
  e.preventDefault();
  const name = document.getElementById('profile-name').value;
  const email = document.getElementById('profile-email').value;
  const proteinTarget = parseInt(document.getElementById('profile-protein').value);
  
  // Get dietary preferences
  const dietaryPrefs = [];
  document.querySelectorAll('input[name="dietary-pref"]:checked').forEach(checkbox => {
    dietaryPrefs.push(checkbox.value);
  });
  
  // Get health goals
  const healthGoals = [];
  document.querySelectorAll('input[name="health-goal"]:checked').forEach(checkbox => {
    healthGoals.push(checkbox.value);
  });
  
  // Get allergies
  const allergiesInput = document.getElementById('profile-allergies').value;
  const allergies = allergiesInput.split(',').map(item => item.trim()).filter(item => item);

  // Update user
  currentUser = {
    ...currentUser,
    name,
    email,
    proteinTarget,
    dietaryPreferences: dietaryPrefs,
    healthGoals,
    allergies
  };

  // Save to localStorage
  localStorage.setItem('nutriChefUser', JSON.stringify(currentUser));

  // Close modal and refresh UI
  closeModal();
  renderHeader();
  renderPage('profile');
}

function saveRecipe(recipeId) {
  if (!currentUser) {
    showLoginModal();
    return;
  }

  // In a real app, this would save to the user's profile via API
  alert(`Recipe ${recipeId} saved to your favorites!`);
  closeModal();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('nutriChefUser');
  renderHeader();
  renderPage('home');
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation links
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      const page = e.target.dataset.page;
      renderPage(page);
    }
  });

  // Auth buttons
  document.addEventListener('click', (e) => {
    if (e.target.id === 'login-btn' || e.target.id === 'signup-btn') {
      showLoginModal();
    }
    
    if (e.target.id === 'logout-btn') {
      logout();
    }
  });

  // User avatar dropdown
  document.addEventListener('click', (e) => {
    const avatar = document.getElementById('user-avatar');
    const dropdown = document.getElementById('dropdown-menu');
    
    if (avatar && dropdown) {
      if (e.target === avatar) {
        dropdown.classList.toggle('show');
      } else {
        dropdown.classList.remove('show');
      }
    }
  });

  // Recipe page filters
  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input' || e.target.id === 'category-select') {
      filterRecipes();
    }
  });

  // Edit profile button
  document.addEventListener('click', (e) => {
    if (e.target.id === 'edit-profile-btn') {
      showEditProfileModal();
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);