create table User(
idnumber int(10) not null unique,
username varchar(10) not null unique,
role varchar(100) not null,
department varchar(100) not null,
firstName varchar(100) not null,
lastName varchar(100) not null,
emailaddress varchar(100) not null,
constraint User_PK primary key (idnumber)
);

create table Shift(
shiftid int(10) not null auto_increment(1000),
name varchar (100) not null,
start DATETIME not null,
end DATETIME not null,
description varchar(500) not null,
notes varchar(500),
type varchar(100),
constraint Shift_PK primary key (shiftid)
);

create table Unavailability(
shiftid int(10) not null,
idnumber int(10) not null,
start DATETIME not null,
end DATETIME not null,
repeat 
constraint Unavailability_PK primary key (shiftid, idnumber),
constraint Unavailability_User_FK foreign key (idnumber) references User(idnumber),
constraint Unavailability_Shift_FK foreign key (shiftid) references Shift(shiftid)
);


