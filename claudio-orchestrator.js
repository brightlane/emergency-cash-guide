#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const OUTPUT_DIR = path.join(process.cwd(), 'output');
const BLUEPRINT_PATH = path.join(OUTPUT_DIR,
