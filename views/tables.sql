create table users(
	id serial not null primary key,
	username text not null,
    name varchar (10) not null unique key
    counter int default 0
);