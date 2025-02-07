import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log('Fetching car data from API...');

    // API endpoint containing car data
    const response = await axios.get('https://sanity-nextjs-application.vercel.app/api/hackathon/template7');
    const cars = response.data;

    console.log(`Fetched ${cars.length} cars`);

    for (const car of cars) {
      console.log(`Processing car: ${car.name}`);

      let imageRef = null;
      if (car.image_url) {
        imageRef = await uploadImageToSanity(car.image_url);
      }

      if (car.tags && car.tags.includes('recommended')) {
        const recommendedCar = {
          _type: 'RecommendedCar',
          name: car.name,
          description: car.description || '',
          type: car.type,
          fuelCapacity: car.fuel_capacity,
          transmission: car.transmission,
          seatingCapacity: car.seating_capacity,
          pricePerDay: car.price_per_day,
          tags: car.tags || [],
          image: imageRef ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef,
            },
          } : undefined,
        };

        console.log('Uploading recommended car to Sanity:', recommendedCar.name);
        await client.create(recommendedCar);
      } 
      
      if (car.tags && car.tags.includes('popular')) {
        const popularCar = {
          _type: 'Popularcar',
          name: car.name,
          description: car.description || '',
          type: car.type,
          fuelCapacity: car.fuel_capacity,
          transmission: car.transmission,
          seatingCapacity: car.seating_capacity,
          pricePerDay: car.price_per_day,
          tags: car.tags || [],
          image: imageRef ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef,
            },
          } : undefined,
        };

        console.log('Uploading popular car to Sanity:', popularCar.name);
        await client.create(popularCar);
      }
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
