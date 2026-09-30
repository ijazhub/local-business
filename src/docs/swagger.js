const { CATEGORIES } = require('../constants');

const id = { type: 'string', example: '66f9c1a2b3c4d5e6f7a8b9c0' };
const json = (schema) => ({ 'application/json': { schema } });
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const idParam = { name: 'id', in: 'path', required: true, schema: { type: 'string' } };
const errors = {
  400: { description: 'Bad request', content: json(ref('Error')) },
  404: { description: 'Not found', content: json(ref('Error')) },
  409: { description: 'Conflict', content: json(ref('Error')) },
};

module.exports = {
  openapi: '3.0.0',
  info: { title: 'Local Business API', version: '1.0.0', description: 'Onboard local businesses, list services, and book them.' },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Business' }, { name: 'Customer' }, { name: 'Service' }, { name: 'Booking' }],
  paths: {
    '/categories': {
      get: { tags: ['Business'], summary: 'List all business categories',
        responses: { 200: { description: 'OK', content: json({ type: 'array', items: { type: 'string' }, example: CATEGORIES }) } } },
    },
    '/businesses': {
      post: { tags: ['Business'], summary: 'Onboard a business with services and budget',
        requestBody: { required: true, content: json(ref('BusinessInput')) },
        responses: { 201: { description: 'Created', content: json(ref('Business')) }, 400: errors[400] } },
      get: { tags: ['Business'], summary: 'Fetch all businesses',
        responses: { 200: { description: 'OK', content: json({ type: 'array', items: ref('Business') }) } } },
    },
    '/businesses/{id}': {
      get: { tags: ['Business'], summary: 'Fetch a business by ID', 
        parameters: [idParam],
        responses: { 200: { description: 'OK', content: json(ref('Business')) }, 404: errors[404] } },
    },
    '/businesses/category/{category}': {
      get: { tags: ['Business'], summary: 'Fetch businesses of one category',
        parameters: [{ name: 'category', in: 'path', required: true, schema: { type: 'string', enum: CATEGORIES } }],
        responses: { 200: { description: 'OK', content: json({ type: 'array', items: ref('Business') }) }, 400: errors[400] } },
    },
    '/services': {
      get: { tags: ['Service'], summary: 'Fetch all available services with price',
        parameters: [{ name: 'category', in: 'query', required: false, schema: { type: 'string', enum: CATEGORIES } }],
        responses: { 200: { description: 'OK', content: json({ type: 'array', items: ref('ServiceListItem') }) } } },
    },
    '/customers': {
      post: { tags: ['Customer'], summary: 'Create a customer account (no auth for now)',
        requestBody: { required: true, content: json(ref('CustomerInput')) },
        responses: { 201: { description: 'Created', content: json(ref('Customer')) }, 400: errors[400], 409: errors[409] } },
    },
    '/bookings': {
      post: { tags: ['Booking'], summary: 'Book a service',
        requestBody: { required: true, content: json(ref('BookingInput')) },
        responses: { 201: { description: 'Booked', content: json(ref('Booking')) }, 400: errors[400], 404: errors[404] } },
    },
    '/bookings/{id}': {
      get: { tags: ['Booking'], summary: 'Get booking status', parameters: [idParam],
        responses: { 200: { description: 'OK', content: json(ref('Booking')) }, 404: errors[404] } },
    },
    '/bookings/{id}/cancel': {
      patch: { tags: ['Booking'], summary: 'Cancel a booking', parameters: [idParam],
        responses: { 200: { description: 'Cancelled', content: json(ref('Booking')) }, 404: errors[404], 409: errors[409] } },
    },
    '/customers/{id}/bookings': {
      get: { tags: ['Booking'], summary: 'Get all bookings of a customer', parameters: [idParam],
        responses: { 200: { description: 'OK', content: json({ type: 'array', items: ref('Booking') }) }, 404: errors[404] } },
    },
    '/businesses/{id}/bookings': {
      get: { tags: ['Booking'], summary: 'Get all bookings of a business', parameters: [idParam],
        responses: { 200: { description: 'OK', content: json({ type: 'array', items: ref('Booking') }) }, 404: errors[404] } },
    },
  },
  components: {
    schemas: {
      Error: { type: 'object', properties: { error: { type: 'string' } } },
      ServiceInput: {
        type: 'object', required: ['name', 'price'],
        properties: { name: { type: 'string', example: 'Bridal Makeup' }, description: { type: 'string' }, price: { type: 'number', example: 8000 }, durationMins: { type: 'integer', example: 120 } },
      },
      BusinessInput: {
        type: 'object', required: ['name', 'category', 'services'],
        properties: {
          name: { type: 'string', example: 'Glow by Riya' },
          category: { type: 'string', enum: CATEGORIES },
          description: { type: 'string' }, city: { type: 'string', example: 'Kolkata' }, phone: { type: 'string' },
          budget: { type: 'object', properties: { min: { type: 'number', example: 2000 }, max: { type: 'number', example: 15000 } } },
          services: { type: 'array', items: ref('ServiceInput') },
        },
      },
      Business: {
        allOf: [ref('BusinessInput'), { type: 'object', properties: { _id: id, createdAt: { type: 'string', format: 'date-time' } } }],
      },
      ServiceListItem: {
        type: 'object',
        properties: { serviceId: id, serviceName: { type: 'string' }, description: { type: 'string' }, price: { type: 'number' }, durationMins: { type: 'integer' }, businessId: id, businessName: { type: 'string' }, category: { type: 'string', enum: CATEGORIES } },
      },
      CustomerInput: {
        type: 'object', required: ['name', 'email'],
        properties: { name: { type: 'string', example: 'Ananya Das' }, email: { type: 'string', example: 'ananya@example.com' }, phone: { type: 'string' } },
      },
      Customer: { allOf: [ref('CustomerInput'), { type: 'object', properties: { _id: id } }] },
      BookingInput: {
        type: 'object', required: ['customerId', 'businessId', 'serviceId', 'scheduledAt'],
        properties: { customerId: id, businessId: id, serviceId: id, scheduledAt: { type: 'string', format: 'date-time', example: '2030-01-15T10:00:00.000Z' }, notes: { type: 'string' } },
      },
      Booking: {
        type: 'object',
        properties: { _id: id, customerId: id, businessId: id, serviceId: id, serviceName: { type: 'string' }, price: { type: 'number' }, scheduledAt: { type: 'string', format: 'date-time' }, notes: { type: 'string' }, status: { type: 'string', enum: ['BOOKED', 'CANCELLED'] }, cancelledAt: { type: 'string', format: 'date-time' } },
      },
    },
  },
};
