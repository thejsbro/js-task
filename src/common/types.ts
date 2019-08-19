export interface ICar {
    color: string;
    fuelType: string;
    manufacturerName: string;
    mileage: {number: number, unit: string};
    modelName: string;
    pictureUrl: string;
    stockNumber: number;
}

export interface ICarSearchParams {
    page: number;
    sort: string;
    manufacturer: string;
    color: string;
}