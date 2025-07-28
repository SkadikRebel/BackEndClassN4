import { Console } from 'console';
import bands from './bandsDiff.json';

type MusicBand = {
  name: string;
  genre: string;
  members: BandMember[];
  originCountry: string;
  foundedYear: number;
  isStillActive: boolean;
  albums: Album[];
};

type BandMember = {
  name: string;
  instrument: string;
  birthYear: number;
  joinedYear: number;
  leftYear?: number; 
};

type Album = {
  title: string;
  releaseYear: number;
  tracks: Track[];
};

type Track = {
  title: string;
  durationInSeconds: number;
};

//================================================================================================================================
//Practice LVL 2 (N3)

enum RoomType{
    single = "Single",
    double = "Double",
    suite = "Suite"
};

enum Stars{
    one = 1,
    two,
    three,
    four,
    five
};

class Hotel{
    private address: string;
    private rooms: Room[];
    private floors: number;
    private stars: Stars;

    constructor(address: string,floors:number, rooms:Room[], stars: Stars){
        this.address = address;
        this.floors = floors;
        this.rooms = rooms;
        this.stars = stars;
    }

    get getRoomsList() { return this.rooms;}
    get getAddress() { return this.address;}
    get getFloors() { return this.floors;}
    get getStars() { return this.stars;}
}

class Room {
    private number: Number;
    private type: RoomType;
    private price: Number;
    private floor: Number
    private isFreely: boolean;

    constructor(number:Number,floor: Number, type: RoomType, price: Number, isFreely: boolean){  
        this.floor = floor;
        this.number = number;  
        this.type = type; 
        this.price = price; 
        this.isFreely = isFreely; 
    }   

    get getNumber(){ return this.number;}
    get getType()  { return this.type;}
    get getPrice() { return this.price;}
    get getFloor() { return this.floor;}
    get getIsFreely() { return this.isFreely;}
}

class HotelService{

    private priceList: Record<RoomType, number>= {
        [RoomType.single]:150,
        [RoomType.double]:300,
        [RoomType.suite]:500,
    };

    constructor(){
       // конструктор нужен был для инициализации priseLits но я не могу его тут инициализировать,
       // так как при єтом будет выбивать ошибку undifinded. Прочитал что для ее решения его нужно инициалихировать сразу при создании.
       // Вопрос: Правильно ли это (инициализация не в конструкторе). И можно ли как-то инициализировать его в конструкторе.
    }


    public createHotel(address:string,floors:number, roomsPerFloor: number, stars:Stars): Hotel{
        const rooms: Room[] = this.roomsCreator(floors,roomsPerFloor);
        return new Hotel(address,floors ,rooms,stars) ;
    }

    private roomsCreator(floors:number, roomsPerFloor: number):Room[]{
        const rooms: Room[] = [];

        for(let iFloor = 0; iFloor < floors; iFloor++){
            for(let jRoom = 0; jRoom < roomsPerFloor; jRoom++){      
                let roomNumber: Number = this.createNumberRoom(iFloor+1,jRoom+1);
                const roomType = this.randomRoomType();
                const room = new Room(roomNumber, iFloor+1, roomType, this.priceList[roomType], this.randomIsFreely());

                rooms.push(room);
            }
        }

        return rooms;
    }

    public serchRoom(hotel:Hotel, roomType: RoomType, floor?: number): Room{
        let findedRoom : Room;

        if(floor == null){
            findedRoom =  hotel.getRoomsList.find(room => room.getType == roomType && room.getIsFreely == true)
        }
        else{
            findedRoom =  hotel.getRoomsList.find(room => room.getType === roomType && room.getFloor === floor && room.getIsFreely === true)
        } 

        return  findedRoom;
    }

    public serchAllRooms(hotel:Hotel, roomType: RoomType, floor?: number): Room[]{
        let findedRooms : Room[];

        if(floor == null){
            findedRooms =  hotel.getRoomsList.filter(room => room.getType == roomType && room.getIsFreely == true)
        }
        else{
            findedRooms =  hotel.getRoomsList.filter(room => room.getType === roomType && room.getFloor === floor && room.getIsFreely === true)
        } 

        return  findedRooms;
    }   


    private randomIsFreely(): boolean{
        if(this.randomNumber(1,1000) % 2 == 0){
            return true;
        }
        else{
            return false;
        }
    }

    private randomNumber(min: number, max:number): number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    private randomRoomType():RoomType{
        const roomTypes: string[] = Object.keys(RoomType);
        const randomIndex: number = this.randomNumber(1, roomTypes.length);
        const roomtype:RoomType =  roomTypes[randomIndex] as RoomType;

        return RoomType[roomtype];
    }

    private createNumberRoom(floor:number,number: number): Number{
        if((number/10) < 1 ){
            return (Number)(floor.toString()+ "0" + number.toString());
        }
        return (Number)(floor.toString() + number.toString());
    }
}

//Main
const hotelservice = new HotelService();
const hotel:Hotel = hotelservice.createHotel("C.New York str. Red Lights 1", 3, 10, Stars.five); 

enterRoomDescription(hotelservice.serchRoom(hotel,RoomType.suite,2));

function enterRoomDescription(room:Room){   
    if(room == null) throw new Error("Not avaiable rooms");
    console.log(`Type: ${room.getType.toString()}`);
    console.log(`Number: ${room.getNumber}`);
    console.log(`Floor: ${room.getFloor}`);
    console.log(`Price: ${room.getPrice}`);

}

