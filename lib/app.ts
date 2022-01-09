import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
//const { Client } = require("pg");


// Import all routes of our server
import AppRoute from './modules/modules.routes'

if (process.env.NODE_ENV === 'production') {
    // Configuration related to production server only
    console.log('Production server is running')
    dotenv.config({ path: path.join(__dirname, '../.env.production') })
  } else {
    dotenv.config()
}

class App {
    public app: express.Application;
    public routes: AppRoute = new AppRoute();
    // public client = new Client({
    //   user: process.env.PG_USER,
    //   password: process.env.PG_PASS,
    //   host: process.env.PG_HOST,
    //   port: process.env.PG_PORT,
    //   database: process.env.PG_DATABASE
    // })

    constructor () {
      this.app = express()
      this.config()
      this.routes.initializeRoutes(this.app)
      //this.postgreSetup();
    }
  
    private config (): void {
      this.app.use(bodyParser.json({ limit: '10mb' }))
      this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
      this.app.use(express.static(path.join(__dirname,'./public')));
    }
  
    // private postgreSetup (): void {
    //   this.client.connect()
    //     .then(() => {
    //       console.log('Database connected successfully')
    //     })
    //     .catch((error: any) => {
    //       console.log('Error', error)
    //     })
    //     .finally(() => this.client.end())
    // }
  }
  export default new App().app