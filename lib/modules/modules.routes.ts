// Here we import all routes of our peoject

import { PaymentGatewayRoutes } from './payment_gateway/payment_gateway.routes'

export default class Routes {
  public initializeRoutes = (app: any) => {
    /*
     * All the modules routes should be initialize here
     */

    const paymentGatewayRoutes = new PaymentGatewayRoutes();

    paymentGatewayRoutes.initialize(app, this.BASEURL)
  };

  // Set base url of our server
  private BASEURL: string = '/api/v1';
}
