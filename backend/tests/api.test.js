const request = require('supertest');
const app = require('../app');

test('GET /api/tasks returns all tasks', async () => {
  const response = await request(app).get('/api/tasks');
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test('POST /api/tasks creates new task', async () => {
  const newTask = {
    title: 'Test task',
    completed: false
  };
  
  const response = await request(app)
    .post('/api/tasks')
    .send(newTask);
    
  expect(response.status).toBe(201);
  expect(response.body.title).toBe('Test task');
});

test('POST /api/tasks accepts any title', async () => {
  const taskWithEmptyTitle = { title: '', completed: false };
  
  const response = await request(app)
    .post('/api/tasks')
    .send(taskWithEmptyTitle);
    
  expect(response.status).toBe(201);
});