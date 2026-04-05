// import { UserProfile, Goal, ActivityLevel } from "../types";


// export function calculateTargets(profile: Partial<UserProfile>): { calories: number; protein: number } {
//   const { weight = 70, height = 170, goal = 'maintain', activityLevel = 'moderate' } = profile;

//   // Very simplified Mifflin-St Jeor for demo purposes (assuming male for simplicity, or middle ground)
//   // BMR = 10 * weight + 6.25 * height - 5 * age + 5
//   // Let's assume age 25
//   const bmr = 10 * weight + 6.25 * height - 5 * 25 + 5;

//   const activityMultipliers: Record<ActivityLevel, number> = {
//     sedentary: 1.2,
//     light: 1.375,
//     moderate: 1.55,
//     active: 1.725,
//     'very-active': 1.9,
//   };

//   const tdee = bmr * activityMultipliers[activityLevel];

//   let calories = tdee;
//   let proteinPerKg = 1.8; // Default



//   if (goal === 'lose-fat') {
//     calories = tdee - 500;
//     proteinPerKg = 2.2; // Higher protein for muscle sparing
//   } else if (goal === 'build-muscle') {
//     calories = tdee + 300;
//     proteinPerKg = 2.0;
//   }

//   return {
//     calories: Math.round(calories),
//     protein: Math.round(weight * proteinPerKg),
//   };
// }

// export const handleShowInterstitial = () => {
//   let total = Number(localStorage.getItem("ad_intiti") || 0) + 1;

//   localStorage.setItem("ad_intiti", total.toString());

//   return total % 2 === 0;
// };

export function isAndroidView() {
  const userAgent = navigator.userAgent;
  const isAndroid = /android/.test(userAgent.toLowerCase());
  const isWebview = isAndroid && /; ?wv\)/.test(userAgent);
  return isWebview;
}

export const handleShowInterstitial = () => {
  let total = Number(localStorage.getItem("ad_intiti") || 0) + 1;

  localStorage.setItem("ad_intiti", total.toString());

  return total % 3 === 0;
};

