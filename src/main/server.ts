import 'module-alias/register'
import DbConnection from '@infrastructure/db/mongodb/helpers/db-connection'
import env from '@main/config/env'
import setupApp from '@main/config/app'

DbConnection.connect(env.mongoUrl).then(() => {
  const app = setupApp()
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  console.log('Connected to MongoDB!!')
}).catch((err) => {
  console.error('Error connecting to MongoDB', err)
})
