import { db } from '@/db'
import { migrate } from 'drizzle-orm/neon-http/migrator'


const main = async () => {
 try {
    await migrate(db, {
      migrationsFolder: 'db/migrations',
    })
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Error migrating', error)
    process.exit(1)
  }
}

main()
