export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    name: "Bilal Tariq",
    rating: 5,
    date: "Yesterday",
    dish: "Dum Pukht Royal Biryani",
    avatar: "BT",
    verified: true,
    comment: "Genuinely the most authentic Dum Pukht Biryani in Karachi! The rice was long-grain and aromatic with real saffron, and the chicken was fall-off-the-bone tender. Used my Reference ID to track the rider—it arrived in 25 mins piping hot!",
  },
  {
    id: "rev-2",
    name: "Dr. Aisha Siddiqui",
    rating: 5,
    date: "2 days ago",
    dish: "Mutton Shinwari Karahi",
    avatar: "AS",
    verified: true,
    comment: "The Shinwari Karahi is masterclass cooking. Simple salt, tomato, green chilies and fresh charcoal wok aroma without unnecessary masala drowning the flavor. 10/10 dining experience at home.",
  },
  {
    id: "rev-3",
    name: "Farhan Malik",
    rating: 5,
    date: "4 days ago",
    dish: "Smoky Charcoal Reshmi Kebab",
    avatar: "FM",
    verified: true,
    comment: "Reshmi Kebabs were silky soft, melt-in-the-mouth perfection. Accompanied by fresh mint raita and layered puri parathas. Very impressed with the packaging and express delivery.",
  },
  {
    id: "rev-4",
    name: "Mahnoor Khan",
    rating: 5,
    date: "1 week ago",
    dish: "Truffle Beef Smashed Burger",
    avatar: "MK",
    verified: true,
    comment: "Didn't expect a traditional bistro to pull off such a gourmet smashed burger! Crispy lacy beef edges, melted cheddar, and the truffle sauce was phenomenal. Will definitely re-order.",
  },
  {
    id: "rev-5",
    name: "Usman Raza",
    rating: 4.5,
    date: "1 week ago",
    dish: "Chicken Makhani Handi",
    avatar: "UR",
    verified: true,
    comment: "Ordered for a family dinner of 6 people. The Makhani Handi had a luscious velvety gravy with aromatic kasuri methi. Kids and elders both loved it. Order tracking was smooth.",
  },
  {
    id: "rev-6",
    name: "Sana Ahmed",
    rating: 5,
    date: "2 weeks ago",
    dish: "Royal Zafrani Kheer & Biryani",
    avatar: "SA",
    verified: true,
    comment: "Clay matka kheer was the perfect sweet finish to a royal biryani meal. Clean, hygienic packaging and very polite delivery rider.",
  },
]

export function getStoredReviews() {
  try {
    const saved = localStorage.getItem('smit_restaurant_reviews')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Error reading stored reviews:', err)
  }
  return INITIAL_REVIEWS
}

export function saveReviewToStorage(review) {
  try {
    const current = getStoredReviews()
    const updated = [review, ...current]
    localStorage.setItem('smit_restaurant_reviews', JSON.stringify(updated))
    return updated
  } catch (err) {
    console.warn('Error saving review to storage:', err)
    return [review, ...INITIAL_REVIEWS]
  }
}

