/**
 * Test script to verify pre-beta mode functionality
 * Run with: node scripts/test-pre-beta.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '..', '.env');

function readEnvFile() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error('❌ .env file not found');
    return {};
  }
  
  const envContent = fs.readFileSync(ENV_FILE, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return envVars;
}

function updateEnvVar(key, value) {
  const envVars = readEnvFile();
  envVars[key] = value;
  
  const envContent = Object.entries(envVars)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  
  fs.writeFileSync(ENV_FILE, envContent);
  console.log(`✅ Updated ${key}=${value}`);
}

function testPreBetaMode() {
  console.log('🧪 Testing Pre-Beta Mode Implementation\n');
  
  const envVars = readEnvFile();
  
  // Check required environment variables
  console.log('📋 Environment Variables Check:');
  console.log(`NEXT_PUBLIC_PRE_BETA_MODE: ${envVars.NEXT_PUBLIC_PRE_BETA_MODE || 'NOT SET'}`);
  console.log(`ADMIN_EMAILS: ${envVars.ADMIN_EMAILS ? '✅ SET' : '❌ NOT SET'}`);
  console.log(`RESEND_API_KEY: ${envVars.RESEND_API_KEY ? '✅ SET' : '⚠️  NOT SET (emails won\'t work)'}`);
  console.log(`EMAIL_FROM: ${envVars.EMAIL_FROM || 'NOT SET'}\n`);
  
  // Check if key files exist
  console.log('📁 File Structure Check:');
  const requiredFiles = [
    'components/BetaAccessForm.tsx',
    'components/sections/BetaAccessSection.tsx',
    'app/api/beta-access/route.ts',
    'libs/preBetaUtils.ts',
    'docs/PRE_BETA_MODE.md'
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
    }
  });
  
  console.log('\n🔄 Mode Toggle Test:');
  console.log('Current mode:', envVars.NEXT_PUBLIC_PRE_BETA_MODE === 'true' ? 'PRE-BETA' : 'NORMAL');
  
  console.log('\n📝 To test both modes:');
  console.log('1. Set NEXT_PUBLIC_PRE_BETA_MODE=true and restart server');
  console.log('2. Visit landing page (should show beta access form)');
  console.log('3. Try accessing /dashboard (should redirect if not admin)');
  console.log('4. Set NEXT_PUBLIC_PRE_BETA_MODE=false and restart server');
  console.log('5. Visit landing page (should show pricing section)');
  console.log('6. Try accessing /dashboard (should work normally)');
  
  console.log('\n🔧 Quick Toggle Commands:');
  console.log('Enable pre-beta:  node scripts/test-pre-beta.js --enable');
  console.log('Disable pre-beta: node scripts/test-pre-beta.js --disable');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--enable')) {
    updateEnvVar('NEXT_PUBLIC_PRE_BETA_MODE', 'true');
    console.log('🚀 Pre-beta mode ENABLED. Restart your server to see changes.');
    return;
  }
  
  if (args.includes('--disable')) {
    updateEnvVar('NEXT_PUBLIC_PRE_BETA_MODE', 'false');
    console.log('🔓 Pre-beta mode DISABLED. Restart your server to see changes.');
    return;
  }
  
  testPreBetaMode();
}

main();
