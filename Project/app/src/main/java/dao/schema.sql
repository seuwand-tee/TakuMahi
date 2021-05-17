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
create table Event(
eventid int(10) not null unique,
idnumber int(10) not null,
start SMALLDATETIMEFROMPARTS not null,
end SMALLDATETIMEFROMPARTS not null,
constraint Event_PK primary key (eventid),
constraint Event_User_FK foreign key (idnumber) references User(idnumber)
);
create table Shift(
eventid int(10) not null,
start SMALLDATETIMEFROMPARTS not null,
end SMALLDATETIMEFROMPARTS not null,
name varchar(100) not null,
description varchar(500) not null,
notes varchar(500),
type varchar(100),
constraint Shift_PK primary key (sale_id),
constraint Shift_Customer_FK foreign key (customer_id) references Customer(customer_id)
);
create table SaleItem(
quantityPurchased decimal(6,2) not null,
salePrice decimal(6,2) not null,
sale_id int(10) not null,
productID varchar(50) not null,
constraint SaleItem_PK primary key (sale_id, productID),
constraint SaleItem_Sale_FK foreign key (sale_id) references Sale(sale_id),
constraint SaleItem_Product_FK foreign key (ProductID) references Product(ProductID)
);
