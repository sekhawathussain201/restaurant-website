export const RESTAURANT_INFO = {
  name: "Zaiqa Royal Bistro & Grill",
  tagline: "Authentic Culinary Artistry & Charcoal Flavours",
  address: "Hno E:114/stt#04, bhataibad, Gulstan-e-johar blk#09, Karachi",
  phone: "03013864320",
  email: "sekhawatarain79@gmail.com",
  openingHours: "Mon - Sun: 12:00 PM - 02:00 AM",
  deliveryTime: "25 - 35 mins",
  minOrder: 500,
  deliveryFee: 150,
  freeDeliveryThreshold: 2500,
}

export const DISHES = [
  {
    id: 1,
    name: "Mutton Shinwari Karahi",
    category: "Karahi & Handi",
    price: 1850,
    rating: 4.9,
    reviews: 248,
    prepTime: "25 mins",
    isBestseller: true,
    isSpicy: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Tender, juicy mutton braised in fresh tomatoes, organic green chilies, and pure animal tallow cooked on a roaring charcoal wok.",
    tags: ["Chef Special", "Charcoal Grill"],
  },
  {
    id: 2,
    name: "Dum Pukht Royal Biryani",
    category: "Rice Specialties",
    price: 850,
    rating: 5.0,
    reviews: 382,
    prepTime: "20 mins",
    isBestseller: true,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Fragrant long-grain aged basmati rice layered with succulent saffron chicken, caramelized onions, and slow-cooked sealed in dough.",
    tags: ["Top Rated", "Signature"],
  },
  {
    id: 3,
    name: "Chicken Makhani Handi",
    category: "Karahi & Handi",
    price: 1350,
    rating: 4.9,
    reviews: 290,
    prepTime: "22 mins",
    isBestseller: true,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    description: "Boneless chicken cubes simmered in velvety butter cream tomato gravy, spiced with freshly roasted fenugreek leaves.",
    tags: ["Velvet Cream", "Bestseller"],
  },
  {
    id: 4,
    name: "Smoky Charcoal Reshmi Kebab",
    category: "BBQ & Grills",
    price: 950,
    rating: 4.8,
    reviews: 195,
    prepTime: "18 mins",
    isBestseller: false,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    description: "Melt-in-mouth chicken skewers marinated overnight in cashew cream, white pepper, royal cumin, and served with mint raita.",
    tags: ["Melt-in-Mouth", "BBQ Feast"],
  },
  {
    id: 5,
    name: "Seekh Kebab Malai Roll",
    category: "BBQ & Grills",
    price: 480,
    rating: 4.8,
    reviews: 175,
    prepTime: "12 mins",
    isBestseller: true,
    isSpicy: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    description: "Flame-grilled spicy beef seekh kebab rolled in crispy layered puri paratha with zesty onion salad and garlic aioli.",
    tags: ["Street Special", "Crispy Roll"],
  },
  {
    id: 6,
    name: "Truffle Beef Smashed Burger",
    category: "Fast Food",
    price: 920,
    rating: 4.9,
    reviews: 210,
    prepTime: "15 mins",
    isBestseller: true,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Double smashed prime Angus beef patties, molten cheddar cheese, caramelized balsamic shallots, and house truffle aioli in a brioche bun.",
    tags: ["Double Patty", "Must Try"],
  },
  {
    id: 7,
    name: "Peri Peri Charcoal Wings",
    category: "Fast Food",
    price: 680,
    rating: 4.7,
    reviews: 130,
    prepTime: "15 mins",
    isBestseller: false,
    isSpicy: true,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    description: "Charcoal-smoked jumbo chicken wings tossed in fiery African bird's eye chili glaze, served with creamy ranch dip.",
    tags: ["Spicy Wings", "Crispy"],
  },
  {
    id: 8,
    name: "Creamy Alfredo Fettuccine",
    category: "Continental",
    price: 880,
    rating: 4.7,
    reviews: 142,
    prepTime: "20 mins",
    isBestseller: false,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    description: "Silky fettuccine ribbons tossed in heavy parmesan garlic cream sauce, topped with fire-grilled herb chicken breast and fresh parsley.",
    tags: ["Cheesy", "Italian Classic"],
  },
  {
    id: 9,
    name: "Stuffed Chicken Supreme",
    category: "Continental",
    price: 1150,
    rating: 4.8,
    reviews: 164,
    prepTime: "22 mins",
    isBestseller: false,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    description: "Golden crumb-coated chicken breast stuffed with cheddar, mushrooms and spinach, served on a bed of mashed potatoes.",
    tags: ["Chef Special", "Gourmet Cut"],
  },
  {
    id: 10,
    name: "Crispy Golden Prawns Tempura",
    category: "Starters & Sea",
    price: 1250,
    rating: 4.9,
    reviews: 177,
    prepTime: "15 mins",
    isBestseller: false,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    description: "Jumbo Arabian Sea tiger prawns wrapped in feather-light Japanese panko crumb, served with sweet chili dip and wasabi mayo.",
    tags: ["Crispy", "Sea Harvest"],
  },
  {
    id: 11,
    name: "Saffron Shahi Kheer & Gulab Jamun",
    category: "Desserts",
    price: 450,
    rating: 4.9,
    reviews: 160,
    prepTime: "10 mins",
    isBestseller: false,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    description: "Warm cardamom-infused gulab jamun soaked in saffron sugar syrup, accompanied by chilled clay pot pistachio rabri kheer.",
    tags: ["Sweet Tooth", "Royal Dessert"],
  },
  {
    id: 12,
    name: "Molten Lava Chocolate Cake",
    category: "Desserts",
    price: 550,
    rating: 5.0,
    reviews: 215,
    prepTime: "12 mins",
    isBestseller: true,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Warm Belgian dark chocolate cake with a gooey flowing molten center, served with a scoop of Madagascar vanilla gelato.",
    tags: ["Choco Lava", "Bestseller"],
  },
  {
    id: 13,
    name: "Electric Blue Ocean Lemonade",
    category: "Beverages",
    price: 320,
    rating: 4.8,
    reviews: 115,
    prepTime: "5 mins",
    isBestseller: false,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Fizzy chilled blue curacao mocktail infused with freshly squeezed lime, crushed garden mint, and Himalayan rock salt.",
    tags: ["Chilled", "Refreshing"],
  },
  {
    id: 14,
    name: "Royal Karak Matka Chai",
    category: "Beverages",
    price: 180,
    rating: 4.9,
    reviews: 320,
    prepTime: "5 mins",
    isBestseller: true,
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "Slow-brewed rich Pakistani whole-milk tea infused with green cardamom pods, saffron strands, and served in an authentic earthen clay cup.",
    tags: ["Matka Special", "Traditional"],
  },
]

export const CATEGORIES = [
  "All Dishes",
  "Karahi & Handi",
  "Rice Specialties",
  "BBQ & Grills",
  "Fast Food",
  "Continental",
  "Starters & Sea",
  "Desserts",
  "Beverages",
]

export const PRESET_IMAGES = [
  { label: 'Royal Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Shinwari Karahi', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { label: 'Handi Curry', url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' },
  { label: 'BBQ Kebab', url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80' },
  { label: 'Seekh Roll', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gourmet Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Crispy Wings', url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Alfredo Pasta', url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lava Cake', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Royal Chai', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
]

export function getCustomDishes() {
  try {
    const saved = localStorage.getItem('smit_custom_dishes')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (err) {
    console.warn('Error fetching custom dishes:', err)
  }
  return []
}

export function getAllDishes() {
  const custom = getCustomDishes()
  return [...DISHES, ...custom]
}

export function saveCustomDish(newDish) {
  try {
    const existing = getCustomDishes()
    const dishWithId = {
      ...newDish,
      id: newDish.id || (Date.now()),
      isCustom: true,
      rating: newDish.rating || 5.0,
      reviews: newDish.reviews || 1,
      createdAt: new Date().toISOString(),
    }
    const updated = [dishWithId, ...existing]
    localStorage.setItem('smit_custom_dishes', JSON.stringify(updated))
    window.dispatchEvent(new Event('dishes_updated'))
    return dishWithId
  } catch (err) {
    console.warn('Error saving custom dish:', err)
    return null
  }
}

export function deleteCustomDish(dishId) {
  try {
    const existing = getCustomDishes()
    const updated = existing.filter(d => d.id !== Number(dishId))
    localStorage.setItem('smit_custom_dishes', JSON.stringify(updated))
    window.dispatchEvent(new Event('dishes_updated'))
    return true
  } catch (err) {
    console.warn('Error deleting custom dish:', err)
    return false
  }
}

