import pool from './config/db.js';

async function runTests() {
  const baseURL = 'http://localhost:5001/api';

  console.log('=== 1. Clean up test users ===');
  await pool.query("DELETE FROM users WHERE email IN ('user1@example.com', 'user2@example.com')");

  console.log('=== 2. Register User 1 ===');
  const reg1Res = await fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'User One', email: 'user1@example.com', password: 'password123' }),
  });
  const u1Data = await reg1Res.json();
  const token1 = u1Data.token;
  console.log('User 1 Registered:', u1Data.user);

  console.log('=== 3. User 1 Creates a Resume ===');
  const createRes = await fetch(`${baseURL}/resumes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token1}`,
    },
    body: JSON.stringify({ title: 'Software Engineer Resume' }),
  });
  const createData = await createRes.json();
  console.log('Create Resume Output:', createData);
  const resumeId = createData.resumeId;

  console.log('=== 4. User 1 Adds personal_info Section ===');
  const secRes = await fetch(`${baseURL}/resumes/${resumeId}/sections/personal_info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token1}`,
    },
    body: JSON.stringify({
      content: { fullName: 'User One', phone: '123-456-7890', location: 'San Francisco, CA' },
      sort_order: 1,
    }),
  });
  const secData = await secRes.json();
  console.log('Add Section Output:', secData);

  console.log('=== 5. User 1 Fetches Resume Back ===');
  const fetchRes = await fetch(`${baseURL}/resumes/${resumeId}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token1}` },
  });
  const fetchData = await fetchRes.json();
  console.log('Fetch Resume Output:', JSON.stringify(fetchData, null, 2));

  console.log('=== 6. Register User 2 ===');
  const reg2Res = await fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'User Two', email: 'user2@example.com', password: 'password123' }),
  });
  const u2Data = await reg2Res.json();
  const token2 = u2Data.token;
  console.log('User 2 Registered:', u2Data.user);

  console.log("=== 7. User 2 Attempts GET User 1's Resume (Expect 404) ===");
  const u2GetRes = await fetch(`${baseURL}/resumes/${resumeId}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token2}` },
  });
  const u2GetData = await u2GetRes.json();
  console.log(`User 2 GET Status: ${u2GetRes.status}`, u2GetData);

  console.log("=== 8. User 2 Attempts PUT User 1's Resume Section (Expect 404) ===");
  const u2PutRes = await fetch(`${baseURL}/resumes/${resumeId}/sections/personal_info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token2}`,
    },
    body: JSON.stringify({ content: { fullName: 'Hacker' } }),
  });
  const u2PutData = await u2PutRes.json();
  console.log(`User 2 PUT Status: ${u2PutRes.status}`, u2PutData);

  console.log('=== 9. Invalid Section Type Validation Test (Expect 400) ===');
  const invSecRes = await fetch(`${baseURL}/resumes/${resumeId}/sections/invalid_type_name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token1}`,
    },
    body: JSON.stringify({ content: {} }),
  });
  const invSecData = await invSecRes.json();
  console.log(`Invalid Section Type Status: ${invSecRes.status}`, invSecData);

  process.exit(0);
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
