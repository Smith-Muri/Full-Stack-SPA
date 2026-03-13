const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
  // split on semicolons so each statement runs separately (Prisma doesn't allow
  // multiple statements in a single query via $executeRaw)
  const statements = sql
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    await prisma.$executeRawUnsafe(stmt);
  }

  console.log('Seed script executed successfully');
}

main()
  .catch((e) => {
    console.error('Error running seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
