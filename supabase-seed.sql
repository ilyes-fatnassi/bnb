-- Seed Data for Bite&Bed - Authentic Tunisian Experiences
-- Run this AFTER running supabase-schema.sql
-- Delete old data first: DELETE FROM meals; DELETE FROM experiences;

-- Insert authentic Tunisian meal experiences
INSERT INTO meals (title, host, location, rating, reviews, images, price, description, group_size, duration, tags, highlights) VALUES
(
  'Friday Couscous at Dr. Baneni''s Library Home',
  'Dr. Baneni',
  'Bab Jdid, Tunis Medina',
  5.0,
  89,
  ARRAY[
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/baneni_kouscous.jpg',
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/baneni-dining.jpg',
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/baneni-house.jpg'
  ],
  25,
  'Step into the home of Dr. Baneni, a physician and writer whose walls are lined with books and stories. Every Friday, his family opens their doors to share more than just a meal - they share the heart of Tunisian hospitality. Gather around the table for traditional hand-rolled couscous, served family-style with tender meat or as a vegetarian feast with seven seasonal vegetables. Between courses, browse his impressive library, hear stories of Tunisian culture and medicine, and experience what it truly means to break bread with a local family. This isn''t just lunch - it''s an afternoon of connection, conversation, and cultural exchange. Wednesdays are special: Dr. Baneni welcomes guests for free as an act of community sharing.',
  'Up to 10 guests',
  '1.5 hours (13:30-15:00)',
  ARRAY['Traditional', 'Friday Lunch', 'Vegetarian Option', 'Cultural Exchange', 'Free on Wednesdays'],
  ARRAY['Doctor & writer''s home', 'Impressive library to explore', 'Free every Wednesday', 'Vegetarian or meat options', 'Stories and conversation', 'Authentic family atmosphere']
),
(
  'Authentic Home Cooking at Dar Kenza',
  'Kenza & Family',
  'Tunis Medina',
  4.9,
  156,
  ARRAY[
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/dar-kenza-main.jpg.jpg',
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/dar-kenza-house.jpg.jpg',
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/dar-kenza-cooking_kafteji_kenza.jpg',
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/dar-kenza-cooking_loubya_kenza.jpg',
    'https://mgdjepfdcjenisatntyl.supabase.co/storage/v1/object/public/meal-photos/dar-kenza-cooking_tounsi_kenza.jpg'
  ],
  25,
  'Welcome to Dar Kenza, where the aroma of spices fills the air and every meal tells a story. Kenza and her family have been welcoming travelers into their medina home for years, treating each guest like extended family. Here, you won''t just taste Tunisian food - you''ll experience it the way locals do. Watch as Kenza prepares traditional dishes passed down through generations: rich kafteji (a hearty vegetable and egg dish), tender loubya (white beans in tomato sauce), or a colorful assortment on a traditional Tunisian plate. Sit together at the family table, share stories over mint tea, and discover what makes Tunisian hospitality so warm and genuine. This is the real Tunisia - no tourists, no performance, just honest home cooking and heartfelt connection.',
  'Up to 8 guests',
  '2-3 hours',
  ARRAY['Traditional', 'Home Cooking', 'Medina House', 'Multiple Dishes', 'Vegetarian Friendly'],
  ARRAY['Historic medina home', 'Multiple traditional dishes', 'Family-style dining', 'Mint tea ceremony', 'Authentic recipes', 'Warm family atmosphere']
),
(
  'Coming Soon - More Family Tables',
  'Local Hosts',
  'Various Locations',
  0,
  0,
  ARRAY[
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80'
  ],
  0,
  'More authentic Tunisian family meal experiences coming soon! We''re carefully selecting warm, welcoming hosts who can''t wait to share their tables, stories, and traditions with you.',
  'Various',
  'Various',
  ARRAY['Coming Soon'],
  ARRAY['More hosts joining', 'Authentic experiences', 'Real family homes']
);

-- Insert authentic Tunisian experiences
INSERT INTO experiences (title, host, location, rating, reviews, images, image, price, description, duration, group_size, tags, highlights) VALUES
(
  'Medina of Tunis Walking Tour with Local Guide',
  'Karim Ayari',
  'Tunis Medina (UNESCO)',
  4.9,
  284,
  ARRAY[
    'https://images.unsplash.com/photo-1548690596-f0e844e6d48d?w=800&q=80',
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
    'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800&q=80'
  ],
  NULL,
  28,
  'Explore the UNESCO-listed medina of Tunis with a local historian. Discover hidden souks, 1000-year-old mosques, traditional hammams, and the stunning Zitouna Mosque. Includes mint tea at a historic cafe and street food tastings.',
  '3 hours',
  'Up to 12 people',
  ARRAY['Walking Tour', 'History', 'UNESCO Site', 'Photography'],
  ARRAY['Expert local guide', 'Street food included', 'Small group', 'Historic sites']
),
(
  'Sahara Desert 2-Day Adventure: Douz to Ksar Ghilane',
  'Ahmed Ben Ali',
  'Douz (Gateway to Sahara)',
  5.0,
  127,
  ARRAY[
    'https://images.unsplash.com/photo-1509316785289-025f5b8b4a21?w=800&q=80',
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80'
  ],
  NULL,
  180,
  'Unforgettable Sahara experience! Camel trek to an authentic desert camp, sleep under the stars, enjoy traditional Berber dinner and breakfast, visit hot springs oasis, and experience sunrise over the dunes. All camping equipment provided.',
  '2 days / 1 night',
  'Up to 8 people',
  ARRAY['Adventure', 'Desert', 'Camping', 'Berber Culture', 'Overnight'],
  ARRAY['Camel trekking', 'Berber tent camping', 'Stargazing', 'Hot springs visit', 'All meals included']
),
(
  'Sidi Bou Said Art & Architecture Tour',
  'Yasmine Charfi',
  'Sidi Bou Said',
  4.8,
  176,
  NULL,
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80',
  32,
  'Discover the enchanting blue-and-white clifftop village of Sidi Bou Said. Visit artist studios, the Ennejma Ezzahra palace, enjoy traditional bambalouni (donuts) and mint tea at Cafe des Nattes, and explore the charming cobblestone streets.',
  '2.5 hours',
  'Up to 10 people',
  ARRAY['Art', 'Architecture', 'Photography', 'Coastal'],
  ARRAY['Artist studio visits', 'Palace tour', 'Traditional cafe', 'Stunning sea views']
),
(
  'Berber Village Homestay & Olive Harvest Experience',
  'Salah Tlili',
  'Matmata Region',
  5.0,
  92,
  NULL,
  'https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?w=800&q=80',
  85,
  'Immerse yourself in authentic Berber life! Stay in a traditional troglodyte cave home (Star Wars filming location!), participate in olive harvesting, learn to bake traditional bread in an underground oven, and share meals with a local family.',
  'Full day (8 hours)',
  'Up to 6 people',
  ARRAY['Cultural Immersion', 'Berber Life', 'Farm Experience', 'Star Wars'],
  ARRAY['Cave home visit', 'Olive harvest', 'Traditional bread baking', 'Family meal']
),
(
  'Carthage & Punic Ports Archaeological Tour',
  'Dr. Ines Hammami',
  'Carthage (UNESCO)',
  4.9,
  158,
  NULL,
  'https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=800&q=80',
  45,
  'Step back 3000 years with an archaeologist guide! Explore ancient Carthage ruins including the Antonine Baths, Roman amphitheater, Tophet sanctuary, and Punic ports. Understand the Phoenician empire and Rome''s greatest rival.',
  '4 hours',
  'Up to 15 people',
  ARRAY['History', 'Archaeology', 'UNESCO', 'Ancient Ruins'],
  ARRAY['Professional archaeologist guide', 'Skip-the-line entry', 'Water included', 'Educational']
),
(
  'Traditional Hammam Spa Experience',
  'Wafa Gharbi',
  'Tunis Medina',
  4.7,
  203,
  NULL,
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  55,
  'Authentic Tunisian hammam ritual in a 300-year-old bathhouse. Includes steam room, black soap scrub (gommage), ghassoul clay mask, relaxation with mint tea, and optional massage upgrade. A rejuvenating cultural tradition!',
  '2 hours',
  'Up to 6 people',
  ARRAY['Wellness', 'Spa', 'Traditional', 'Relaxation'],
  ARRAY['Historic hammam', 'Natural products', 'Private groups available', 'Tea included']
),
(
  'Tunisian Street Food Tour by Night',
  'Rami Jemli',
  'Downtown Tunis',
  4.9,
  241,
  NULL,
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  38,
  'Eat like a local on this evening food adventure! Sample 10+ dishes including chapati sandwiches, grilled merguez, fricassé, mlawi, and sweet zlebia. Visit hidden local spots that tourists never find. Vegetarian options available.',
  '3 hours',
  'Up to 8 people',
  ARRAY['Food Tour', 'Street Food', 'Evening', 'Local Spots'],
  ARRAY['10+ tastings', 'Hidden gems', 'Local guide', 'Vegetarian-friendly']
),
(
  'El Jem Colosseum & Roman Mosaics Day Trip',
  'Mehdi Bouzidi',
  'El Jem (UNESCO)',
  5.0,
  104,
  NULL,
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  75,
  'Visit Africa''s largest Roman amphitheater - better preserved than the Colosseum! Explore underground gladiator chambers, see stunning Roman mosaics at the museum, and enjoy lunch in a traditional restaurant. Round-trip transport from Tunis included.',
  'Full day (8 hours)',
  'Up to 6 people',
  ARRAY['History', 'UNESCO', 'Day Trip', 'Roman Empire', 'Transport Included'],
  ARRAY['Round-trip transport', 'Skip-the-line tickets', 'Museum entry', 'Lunch included']
);
