drop table if exists usersGreeted;
create table usersGreeted(
	id serial not null primary key,
	username text not null,
    counter int default 0
);