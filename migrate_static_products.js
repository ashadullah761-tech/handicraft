require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const allProducts = [
  { name: `Premium Wooden Diwan`, price: 299.00, image_url: `/images/top-1.jpg?v=2`, category: "Wooden Diwan", description: "Experience royal comfort with our handcrafted premium wooden diwan. Carved from high-quality solid wood.", material: "Solid Teak Wood", size: "Standard Size" },
  { name: `Carved Wooden Diwan`, price: 349.00, image_url: `/images/top-2.jpg?v=2`, category: "Wooden Diwan", description: "Elegant carved wooden diwan showcasing traditional craftsmanship and unparalleled durability.", material: "Solid Teak Wood", size: "Standard Size" },
  { name: `Royal Pattern Diwan`, price: 399.00, image_url: `/images/top-3.jpg?v=2`, category: "Wooden Diwan", description: "A luxurious diwan featuring intricate royal patterns. Perfect for a majestic living room.", material: "Rosewood", size: "Standard Size" },
  { name: `Classic Traditional Diwan`, price: 289.00, image_url: `/images/top-4.jpg?v=2`, category: "Wooden Diwan", description: "A timeless traditional diwan that blends heritage design with modern comfort.", material: "Sheesham Wood", size: "Standard Size" },
  { name: `Royal Wooden Swing`, price: 499.00, image_url: `/images/swing-1.jpg?v=2`, category: "Wooden Swing", description: "Traditional Indian Jhula meticulously carved by master artisans. Perfect for your living room or veranda.", material: "Rosewood", size: "Standard Size" },
  { name: `Carved Indoor Swing`, price: 549.00, image_url: `/images/swing-2.jpg?v=2`, category: "Wooden Swing", description: "A majestic indoor swing with detailed floral carvings to elevate your home decor.", material: "Teak Wood", size: "Standard Size" },
  { name: `Premium Teak Swing`, price: 699.00, image_url: `/images/swing-3.jpg?v=2`, category: "Wooden Swing", description: "A heavy-duty premium teak wood swing with brass chains. Built to last generations.", material: "Teak Wood", size: "Standard Size" },
  { name: `Antique Pattern Jhula`, price: 599.00, image_url: `/images/swing-4.jpg?v=2`, category: "Wooden Swing", description: "An antique style wooden jhula featuring rich dark polish and classic patterns.", material: "Sheesham Wood", size: "Standard Size" },
  { name: `Carved Rectangle Table`, price: 189.00, image_url: `/images/coffee-1.jpg?v=2`, category: "Coffee Table", description: "A beautifully carved rectangular coffee table with intricate traditional designs.", material: "Mango Wood", size: "Standard Size" },
  { name: `Square Carved Table`, price: 149.00, image_url: `/images/coffee-2.jpg?v=2`, category: "Coffee Table", description: "A compact square table featuring detailed floral carvings. Perfect as a center table.", material: "Sheesham Wood", size: "Standard Size" },
  { name: `Classic Long Table`, price: 129.00, image_url: `/images/coffee-3.jpg?v=2`, category: "Coffee Table", description: "A versatile long wooden table suitable for your living room or study.", material: "Teak Wood", size: "Standard Size" },
  { name: `Round Pedestal Table`, price: 159.00, image_url: `/images/coffee-4.jpg?v=2`, category: "Coffee Table", description: "A classic round table with an elegant pedestal base, perfect for cozy corners.", material: "Rosewood", size: "Standard Size" },
  { name: `Carved Glass Top Table Base`, price: 179.00, image_url: `/images/coffee-5.jpg?v=2`, category: "Coffee Table", description: "An intricately carved table base designed to support a glass top, featuring traditional craftsmanship.", material: "Mango Wood", size: "Standard Size" },
  { name: `Comfort Cushioned Chair`, price: 189.00, image_url: `/images/chair-1.jpg?v=2`, category: "Wooden Chair", description: "Elegant cushioned wooden chair offering premium comfort and a timeless design.", material: "Solid Wood", size: "Standard Size" },
  { name: `Classic Slatted Chair`, price: 179.00, image_url: `/images/chair-2.jpg?v=2`, category: "Wooden Chair", description: "A traditional wooden chair with a classic slatted back design for versatile use.", material: "Sheesham Wood", size: "Standard Size" },
  { name: `Wooden Wheel Rocking Chair`, price: 219.00, image_url: `/images/chair-3.jpg?v=2`, category: "Wooden Chair", description: "A unique rocking chair featuring a cartwheel design on the sides. Perfectly handcrafted.", material: "Teak Wood", size: "Standard Size" },
  { name: `Carved Wheel Rocking Chair`, price: 239.00, image_url: `/images/chair-4.jpg?v=2`, category: "Wooden Chair", description: "Premium wheel rocking chair with detailed carvings on the backrest. A true masterpiece.", material: "Rosewood", size: "Standard Size" }
];

async function run() {
  for (const product of allProducts) {
    const { data, error } = await supabase.from('products').insert([product]);
    if (error) {
      console.error('Error inserting', product.name, error);
    } else {
      console.log('Inserted', product.name);
    }
  }
}

run();
