import PaymentGatewayCreditCard from './controller/payment_gateway.credit_card.controller'

export class PaymentGatewayRoutes {
  public initialize (app: any, baseUrl: string): void {
    const paymentGatewayCreditCard = new PaymentGatewayCreditCard();

    app
      .route(baseUrl + '/payment-gateway/credit-card')
      .post(paymentGatewayCreditCard.add)
  }
}
