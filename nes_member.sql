create table nes_member (
    email varchar(100) not null,
    pass varchar(20) not null,
    name varchar(50) not null,
    hp varchar(20) not null,
    member_addr1 varchar(200) not null,
    member_addr2 varchar(200) not null,
    member_zipcode varchar(10) not null,
    member_city varchar(50) not null,
    primary key(email)
)engine=innoDB charset=utf8;