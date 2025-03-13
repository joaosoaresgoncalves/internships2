const { PrismaClient } = require('@prisma/client')

async function main() {
  console.log('Skipping migrations - database already exists')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Done')
  }) 