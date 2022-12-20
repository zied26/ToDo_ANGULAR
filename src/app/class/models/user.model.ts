export class User {

    constructor(

        public userName : string,
        public password : string,
        public age : number,
        public firstName : string,
        public lastName : string,
        public email : string,
        public team : string,
        public skills : string[],


        ){

         this.userName = userName;
         this.password = password;
         this.age = age;
         this.firstName = firstName;
         this.lastName = lastName;
         this.email = email;
         this.team = team;
         this.skills = skills;

    }
}
