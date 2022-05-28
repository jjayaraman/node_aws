export default interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    homeAddress?: Address;
    workAddress?: Address;
}

interface Address {
    firstLine: string;
    secondLine: string;
    city: string;
    postCode: string;
    country: string;
}