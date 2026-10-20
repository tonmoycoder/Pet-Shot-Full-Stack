const https = require('https');
const http = require('http');

async function test() {
  const url = process.env.DATABASE_URI;
  console.log('Testing connection...', url);
  // Actually, we can just connect to the local API
  const res = await fetch('http://localhost:3000/api/blogs');
  const json = await res.json();
  console.log('Blogs:', json.totalDocs);
  
  const res2 = await fetch('http://localhost:3000/api/testimonials');
  const json2 = await res2.json();
  console.log('Testimonials:', json2.totalDocs);
}

test();
