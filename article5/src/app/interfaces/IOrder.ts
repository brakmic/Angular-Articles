export interface IOrderData {
    Id: number;
    Customerid: string;
    Employeeid: number;
    OrderDate: string;
    RequiredDate: string;
    ShipVia: number;
    Freight: number;
    ShipName: string;
    ShipAddress: string;
    ShipCity: string;
    ShipPostalCode: string;
    ShipCountry: string;
}

export interface IOrderDetail {
    OrderId: number;
    ProductId: number;
    UnitPrice: number;
    Quantity: number;
    Discount: number;
}

export interface IOrder {
    Order: IOrderData;
    OrderDetails: IOrderDetail[];
}
