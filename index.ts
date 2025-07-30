import bands from './bandsDiff.json';

type MusicBand = {
  name: string;
  genre: string;
  originCountry: string;
  foundedYear: number;
  isStillActive: boolean;
  trackCount: number;
  albumCount: number;
  members: BandMember[];
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
  id: number;
  title: string;
  releaseYear: number;
  tracks: Track[];
};

type Track = {
  id: number;
  title: string;
  durationInSeconds: number;
  releaseYear: number;
};



const musicBands: MusicBand[] = bands;
//================================================================================================================================

//Practice LVL 2 (N3) Hotel
//================================================================================================================================


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
try{
const hotelservice = new HotelService();
const hotel:Hotel = hotelservice.createHotel("C.New York str. Red Lights 1", 3, 10, Stars.five); 

enterRoomDescription(hotelservice.serchRoom(hotel,RoomType.suite,2));
}
catch (e){
    console.log(e.message);
}
function enterRoomDescription(room:Room){   
    if(room == null)throw new Error("Not avaiable rooms");
    console.log(`Type: ${room.getType.toString()}`);
    console.log(`Number: ${room.getNumber}`);
    console.log(`Floor: ${room.getFloor}`);
    console.log(`Price: ${room.getPrice}`);

}

//================================================================================================================================

//Practic LVL 1 (N1) Сar
//================================================================================================================================

class Car{
    private brand: string;
    private year: number;
    private mileage: number;
    private gasolinCapacity: number;
    private fuelConsumption: number;

    constructor (brand: string, year: number, fuelConsumption: number){
        this.brand = brand;
        this.year = year;
        this.fuelConsumption = fuelConsumption;
    }

    drive (km: number): number{
        return (km * this.fuelConsumption) / 100;
    }

    getMileage() : number{
        return this.mileage;
    }

    getGasolinCapacity() : number{
        return this.gasolinCapacity;
    }

    setGasolinCapacity(gasolinCapacity: number){
         this.gasolinCapacity = gasolinCapacity;;
    }
}


//================================================================================================================================

//Practic LVL 1 (N2) Comment
//================================================================================================================================
enum Status{
    buyer,
    seller
}


class Comment { 
    private static id: number;
    private userBuyer:User;
    private userSeller:User;
    private product: Product;
    private text: string;
    private advantages: string;
    private weaknesses: string;
    private stars: number;

   constructor(userBuyer:User, userSeller:User, product: Product, text:string, advantages: string, weaknesses: string, stars: number){
        Comment.id ++;
        this.userBuyer = userBuyer;
        this.userSeller = userSeller;
        this.product = product;
        this.text = text;
        this.advantages = advantages;
        this.weaknesses = weaknesses;
        this.stars = stars;
    }

    get getId():number{
        return Comment.id;
    }

    get getUserBuyer(): User{
        return this.userBuyer;
    }

    get getUserSeller(): User{
        return this.userSeller;
    }

    get getProduct(): Product{
        return this.product;
    }


    get getText(): string{
        return this.text;
    }
    set setText(text: string){
        this.text =text;
    }


    get getAdvantages(): string{
        return this.advantages;
    }
    set setAdvantages(text: string){
        this.advantages = text;
    }


    get getWeaknesses(): string{
        return this.weaknesses;
    }
    set setWeaknesses(text: string){
        this.weaknesses = text;
    }


    get getStars(): number{
        return this.stars;
    }
    set setStars(stars: number){
        stars = this.stars;
    }
}

class CommentService{
    private categories: Comment[] = []; //думаю это не нужно так как для этого есть json
    constructor(){
        //добавление Comment 
    }

    //CRUD functions

    showComment(comment: Comment){
        //ввывод данных
    }
}

class Answer{
    private static id: number;
    private commentId: number
    private userId: number;
    private text: string;

    constructor(text:string,commentId: number, userId:number){
        Answer.id ++;
        this.text = text;
        this.commentId = commentId;
        this.userId = userId;
    }

    get getId(): number{
        return Answer.id;
    }


    get getText(): string{
        return this.text;
    }
    set setText(text: string){
        this.text = text;
    }


    get getCommentId(): number{
        return this.commentId;
    }


    get getUserId(): number{
        return this.userId;
    }
}

class AnswerService{
    private categories: Answer[] = []; //думаю это не нужно так как для этого есть json
    constructor(){
        //добавление Answer 
    }

    //CRUD functions

    answer (text:string){
        //ответ на комент данных
    }
}

class User{
    private static id: number;
    private name: string;
    private password: string;
    private gmail: string;
    private status:Status

    constructor(name: string, password: string, gmail: string,status:Status){
        User.id ++; // (User.) because (this.) dosen`t worked 
        this.name = name;
        this.password = password;
        this.gmail = gmail;
        this.status = status;
    }

    get getId(): number{
        return User.id;
    }


    get getName(): string{
        return this.name;
    }
    set setName(text: string){
        this.name = text;
    }


    get getPassword(): string{
        return this.password;
    }
    set setPassword(text: string){
        this.password = text;
    }


    get getGmail(): string{
        return this.gmail;
    }
    set setGmail(text: string){
       this.gmail = text;
    }


    get getStatus(): Status{
        return this.status;
    }
    set setStatus(status: Status){
        this.status = status;
    }
}

class UserService{
    private categories: User[] = []; //думаю это не нужно так как для этого есть json
    constructor(){
        //добавление User 
    }

    //CRUD functions
}

class Product{
    private static id: number;
    private name: string;
    private discription: string;
    private category: Category

    constructor(name: string, discription: string, category: Category){
        Product.id ++; // (Product.) because (this.) dosen`t worked 
        this.name = name;
        this.discription = discription;
        this.category = category;
    }


    get getId(): number{
        return Product.id;
    }

    get getName(): string{
        return this.name;
    }
    set setName(text: string){
        this.name = text;
    }


    get getDiscription(): string{
        return this.discription;
    }
    set setDiscription(text: string){
        this.discription = text;
    }


    get getCategory(): Category{
        return this.category;
    }
    set setCategory(text: Category){
        this.category = text;
    }
}

class ProductService{
    private categories: ProductService[] = []; //думаю это не нужно так как для этого есть json
    constructor(){
        //добавление Product 
    }

    //CRUD functions
}

class Category{
    private static id: number;
    private name: string;

     constructor(name: string){
        Category.id ++; // (Product.) because (this.) dosen`t worked 
        this.name = name;
    }

    get getId(){
        return Category.id;
    }

    get getName(): string{
        return this.name;
    }
    set setName(text: string){
        this.name = text;
    }
}

class CategoryService{
    private categories: Category[] = []; //думаю это не нужно так как для этого есть json
    constructor(){
        //добавление Category 
    }

    //CRUD functions
}

//================================================================================================================================

//Array (N1) 
//================================================================================================================================  

const albumCount = musicBands.reduce((acamulator, band) => {return acamulator += band.albumCount},0 );

//================================================================================================================================

//Array (N2) 
//================================================================================================================================  

musicBands.forEach(band => {
    band.albums.forEach(album =>{
        album.tracks.forEach(track => {
            if(track.durationInSeconds>250){
                console.log(`${band.name} - ${track.title} X ${Math.trunc(track.durationInSeconds / 60)} У ${track.durationInSeconds%60}`);
            }
        })
    })
});

//================================================================================================================================

//Array (N3) 
//================================================================================================================================ 
enum OriginCountrys{
    USA = "USA",
    UK = "UK",
}

const listCountry:string[] = Object.keys(OriginCountrys);
let membersNameInCountry: Record<OriginCountrys, string[]>=
{
    UK: [],
    USA: []
}; 
// если у меня тип  OriginCountrys  то мне нужно сразу инициализировать Record  и за этого на прошлой лекии я использовал string
// потому-что не знал что его нужно сразу определить. И и за этого отпадает нужда в проверке через Includs 

listCountry.forEach((countryCode)=>{
    const countryBands = musicBands.filter(band => band.originCountry == countryCode)
    let membersName: string[] =[];
    countryBands.forEach((band)=>{
        band.members.forEach((member)=>{
            membersName.push(member.name);
        });
    });
    membersNameInCountry[countryCode] = membersName;
});

console.log(membersNameInCountry[OriginCountrys.UK]);

//================================================================================================================================

//Array (N4) 
//================================================================================================================================

//порахував :)

const membersCount = musicBands.reduce((acamulator, band) => {return acamulator += band.members.length},0 );
console.log(membersCount);

//================================================================================================================================

//Array (N5) 
//================================================================================================================================

const membersList : BandMember[] = musicBands.flatMap((band)=>{return band.members});
const membersPlayOnGuitar = membersList.filter(memb => memb.instrument == "Guitar");
membersPlayOnGuitar.sort(function(a, b) {
        return b.birthYear - a.birthYear;
});
console.log(membersPlayOnGuitar)

//================================================================================================================================

//Array (N6) 
//================================================================================================================================

const bandsName = musicBands.map((band)=>{return band.name});

const bandsAlbums = musicBands.flatMap((band)=>{return band.albums});
const albumsTitle =  bandsAlbums.map((albums)=>{return albums.title});

const albumsTrack = bandsAlbums.flatMap((albums)=>{return albums.tracks});
const tracksTitle = albumsTrack.map((track)=>{return track.title});
let counter = 0;

counter=serchLetters("a",bandsName);
counter=serchLetters("a",albumsTitle);
counter=serchLetters("a",tracksTitle);


console.log(counter);


function serchLetters(letter: string, array:Array<string>):number{
    let counter=0;
    array.forEach(item => {
        
        for(let i = 0; i<item.length;i++){
            if(item[i].toUpperCase() == letter.toUpperCase()){
                counter++;
            }
        }
    });
    return counter;
}