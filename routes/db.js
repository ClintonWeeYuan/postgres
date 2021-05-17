const express = require('express');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'clint',
  host: 'localhost',
  database: 'api',
  password: 'love',
  port: 5432,
})

module.exports = pool;