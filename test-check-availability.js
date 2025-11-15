/**
 * Test script for /api/booking/search (Check Availability API)
 *
 * Usage:
 *   node backend/test-check-availability.js 2025-12-01 2025-12-02 1 2 1
 *   (checkIn, checkOut, rooms, adults, children)
 */

import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5001';

const [,, checkInArg, checkOutArg, roomsArg, adultsArg, childrenArg] = process.argv;

const checkIn = checkInArg || '2025-12-01';
const checkOut = checkOutArg || '2025-12-02';
const rooms = Number(roomsArg || 1);
const adults = Number(adultsArg || 2);
const children = Number(childrenArg || 0);

async function run() {
  try {
    console.log('\n========================================');
    console.log('TESTING /api/booking/search (Check Availability)');
    console.log('========================================\n');

    const url = `${API_BASE_URL}/api/booking/search`;
    const payload = { checkIn, checkOut, rooms, adults, children };

    console.log('[API URL]:', url);
    console.log('\n[Request Payload]:');
    console.log(JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      timeout: 30000,
    });

    console.log('\n[Response Status]:', response.status);
    console.log('[Response Data]:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('\n=== REQUEST FAILED ===');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

run();
