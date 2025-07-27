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

//Practice LVL 2 (N3)

class Hotel{
    private address: string;
    private rooms: Room[];
    private stars: number

    constructor(address: string, rooms:Room[], stars: number){
        this.address=address
        this.rooms=rooms
        this.stars=stars
    }

    get getRoomsList() { return this.rooms;}
}

enum RoomType{
    single = "Single",
    double = "Double",
    suite = "Suite"
};

class Room {
    private number: Number;
    private type: RoomType;
    private price: Number;
    private floor: Number
    private isFreely: boolean;

    constructor(number:Number,floor: Number, type: RoomType, price: Number, isFreely: boolean){  
        this.floor = floor;
        this.number = (Number)(floor.toString()+ number.toString());  
        this.type = type; 
        this.price = price; 
        this.isFreely = isFreely; 
    }   

    get getNumber() { return this.number;}
    get getType() { return this.type;}
    get getPrice() { return this.price;}
    get getFloor() { return this.floor;}
    get getIsFreely() { return this.isFreely;}
}

class HotelService{
   public createHotel(floors:number, roomsPerFloor: number): Hotel{
        const hotel = new Hotel("address",this.roomsCreator(floors,roomsPerFloor),5) ;
        return hotel;
    }

    public serchRoom(hotel:Hotel, roomType: RoomType, floor?: number): Room{
        const roomsList : Room[] = hotel.getRoomsList;
        let findedRooms : Room[];
        if(floor == null){
            findedRooms =  roomsList.filter(room => room.getType == roomType && room.getIsFreely==true)
        }
        else{
            findedRooms =  roomsList.filter(room => room.getType == roomType && room.getFloor == floor &&room.getIsFreely==true)
        } 
        
        return  findedRooms[0];
    }


    private roomsCreator(floors:number, roomsPerFloor: number):Room[]{
        const rooms: Room[] = [];

        for(let iFloor = 0; floors < iFloor; iFloor++){
            for(let jRoom = 0; roomsPerFloor < jRoom; jRoom++){
                
                let roomNumber: Number = this.createNumberRoom(iFloor+1,jRoom+1) ;
                const room = new Room(
                    roomNumber,
                    iFloor,
                    this.randomRoomType(),
                    100, // сделать правильный ценик
                    this.randomIsFreely());
                rooms.push(room);
            }
        }
        return rooms;
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

        return RoomType[roomTypes[randomIndex]];
    }

    private createNumberRoom(floor:number,number: number): Number{
        return (Number)(floor.toString()+ number.toString());
    }
}

