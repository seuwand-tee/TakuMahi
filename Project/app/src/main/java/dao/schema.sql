create table User(
idnumber varchar(100),
username varchar(100) not null unique,
role varchar(100),
department varchar(100),
firstName varchar(100) not null,
lastName varchar(100) not null,
emailaddress varchar(100) not null,
constraint User_PK primary key (idnumber),
);

create table Shift(
shiftid int(10),
idnumber int(10),
name varchar (100) not null,
start timestamp not null,
end timestamp not null,
description varchar(500) not null,
notes varchar(500),
type varchar(100),
constraint Shift_PK primary key (shiftid),
constraint Shift_User_FK foreign key (idnumber) references User(idnumber)
);

create table Unavailability(
shiftid int(10),
idnumber int(10),
start timestamp not null,
end timestamp not null,
description varchar(100),
constraint Unavailability_PK primary key (shiftid, idnumber),
constraint Unavailability_User_FK foreign key (idnumber) references User(idnumber)
);

